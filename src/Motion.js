import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, PanResponder, Platform, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { C, F } from './theme';
 
// Native pe native driver, web pe JS driver (warning se bachne ke liye)
export const ND = Platform.OS !== 'web';
const T = (v, to, duration, easing) => Animated.timing(v, { toValue: to, duration, easing, useNativeDriver: ND });
 
/* ---------- Letters: har akshar neeche se uchhalta hai, hover/tap pe kudta hai ---------- */
export function Letters({ text, style, delay = 0, step = 55, accentLast, interactive }) {
  const chars = [...text];
  const rise = useRef(chars.map(() => new Animated.Value(0))).current;
  const hop = useRef(chars.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    const a = Animated.sequence([
      Animated.delay(delay),
      Animated.stagger(step, rise.map((v) => Animated.spring(v, { toValue: 1, friction: 6, tension: 70, useNativeDriver: ND }))),
    ]);
    a.start();
    return () => a.stop();
  }, []);
  const jump = (i) =>
    Animated.sequence([T(hop[i], 1, 130), Animated.spring(hop[i], { toValue: 0, friction: 4, useNativeDriver: ND })]).start();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {chars.map((ch, i) => (
        <Pressable key={i} disabled={!interactive} onHoverIn={() => jump(i)} onPressIn={() => jump(i)}>
          <Animated.Text
            style={[
              style,
              accentLast && i === chars.length - 1 && { color: C.lime },
              {
                opacity: rise[i],
                transform: [
                  { translateY: Animated.add(rise[i].interpolate({ inputRange: [0, 1], outputRange: [70, 0] }), hop[i].interpolate({ inputRange: [0, 1], outputRange: [0, -24] })) },
                  { rotate: rise[i].interpolate({ inputRange: [0, 1], outputRange: ['14deg', '0deg'] }) },
                ],
              },
            ]}
          >
            {ch === ' ' ? ' ' : ch}
          </Animated.Text>
        </Pressable>
      ))}
    </View>
  );
}
 
/* ---------- WaveLoop: akshar lehar ki tarah upar-neeche chalte rehte hain ---------- */
export function WaveLoop({ text, style }) {
  const chars = [...text];
  const vals = useRef(chars.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    const loops = vals.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 140),
          T(v, 1, 600, Easing.inOut(Easing.sin)),
          T(v, 0, 600, Easing.inOut(Easing.sin)),
          Animated.delay((chars.length - i) * 140),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, []);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {chars.map((ch, i) => (
        <Animated.Text key={i} style={[style, { transform: [{ translateY: vals[i].interpolate({ inputRange: [0, 1], outputRange: [0, -18] }) }] }]}>
          {ch}
        </Animated.Text>
      ))}
    </View>
  );
}
 
/* ---------- NavLink: hover/tap pe akshar wave + niche line badhti hai, active section lime ---------- */
export function NavLink({ label, active, onPress }) {
  const chars = [...label.toUpperCase()];
  const w = useRef(chars.map(() => new Animated.Value(0))).current;
  const u = useRef(new Animated.Value(active ? 1 : 0)).current;
  const hv = useRef(new Animated.Value(0)).current;
  useEffect(() => { T(u, active ? 1 : 0, 250).start(); }, [active]);
  const wave = () =>
    Animated.stagger(35, w.map((v) => Animated.sequence([T(v, 1, 120), T(v, 0, 170)]))).start();
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => { wave(); T(hv, 1, 200).start(); }}
      onHoverOut={() => T(hv, 0, 200).start()}
      onPressIn={wave}
      accessibilityRole="link"
    >
      <View style={{ paddingVertical: 4 }}>
        <View style={{ flexDirection: 'row' }}>
          {chars.map((ch, i) => (
            <Animated.Text
              key={i}
              style={{ color: active ? C.lime : C.mute, fontSize: 12, letterSpacing: 1.5, transform: [{ translateY: w[i].interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] }}
            >
              {ch}
            </Animated.Text>
          ))}
        </View>
        <Animated.View
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, backgroundColor: C.lime, transform: [{ scaleX: Animated.add(u, hv).interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 1] }) }] }}
        />
      </View>
    </Pressable>
  );
}
 
/* ---------- Burger: 3 line se X ban jaata hai ---------- */
export function Burger({ open }) {
  const v = useRef(new Animated.Value(open ? 1 : 0)).current;
  useEffect(() => { T(v, open ? 1 : 0, 280, Easing.out(Easing.cubic)).start(); }, [open]);
  const line = { position: 'absolute', left: 0, width: 26, height: 2, borderRadius: 2, backgroundColor: C.paper };
  return (
    <View style={{ width: 26, height: 18 }}>
      <Animated.View style={[line, { top: 0, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }) }, { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) }] }]} />
      <Animated.View style={[line, { top: 8, opacity: v.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), backgroundColor: C.lime }]} />
      <Animated.View style={[line, { top: 16, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }, { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] }) }] }]} />
    </View>
  );
}
 
/* ---------- MenuPanel: mobile menu neeche slide hota hai, links ek ek karke aate hain ---------- */
function MenuItem({ label, i, open, active, onPress }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (open) Animated.timing(v, { toValue: 1, duration: 420, delay: 80 + i * 70, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
    else v.setValue(0);
  }, [open]);
  return (
    <Pressable onPress={onPress} style={{ paddingVertical: 10 }}>
      <Animated.Text style={{ fontFamily: F.display, fontSize: 40, color: active ? C.lime : C.paper, opacity: v, transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] }) }] }}>
        {label.toUpperCase()}
      </Animated.Text>
    </Pressable>
  );
}
export function MenuPanel({ open, items, current, onPick, top }) {
  const [mounted, setMounted] = useState(open);
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (open) setMounted(true);
    T(v, open ? 1 : 0, 300, Easing.out(Easing.cubic)).start(({ finished }) => { if (finished && !open) setMounted(false); });
  }, [open]);
  if (!mounted) return null;
  return (
    <Animated.View
      style={{ position: 'absolute', left: 0, right: 0, top, zIndex: 40, backgroundColor: C.ink, borderBottomWidth: 1, borderBottomColor: C.line, paddingHorizontal: 20, paddingVertical: 12, opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-24, 0] }) }] }}
    >
      {items.map(([k, l], i) => (
        <MenuItem key={k} label={l} i={i} open={open} active={current === k} onPress={() => onPick(k)} />
      ))}
    </Animated.View>
  );
}
 
/* ---------- AvatarPhoto: tap karo to spin/jump/slide/zoom, pakad ke kheencho to saath aati hai ---------- */
export function AvatarPhoto({ source, w = 230, h = 270, round = true, fade = false, showHint = true }) {
  const dx = useRef(new Animated.Value(0)).current; // drag (JS driver)
  const dy = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const jump = useRef(new Animated.Value(0)).current;
  const side = useRef(new Animated.Value(0)).current;
  const sc = useRef(new Animated.Value(1)).current;
  const ring = useRef(new Animated.Value(0)).current;
  const flt = useRef(new Animated.Value(0)).current;
  const hint = useRef(new Animated.Value(1)).current;
  const count = useRef(0);
  const tapRef = useRef(() => {});
 
  useEffect(() => {
    const l = Animated.loop(Animated.sequence([T(flt, 1, 2400, Easing.inOut(Easing.sin)), T(flt, 0, 2400, Easing.inOut(Easing.sin))]));
    l.start();
    return () => l.stop();
  }, []);
 
  tapRef.current = () => {
    count.current += 1;
    const k = count.current % 4;
    ring.setValue(0);
    T(ring, 1, 800, Easing.out(Easing.quad)).start();
    T(hint, 0, 300).start();
    const pop = (peak) => Animated.sequence([T(sc, peak, 160), Animated.spring(sc, { toValue: 1, friction: 4, useNativeDriver: ND })]);
    if (k === 1) {
      spin.setValue(0);
      Animated.parallel([T(spin, 1, 850, Easing.out(Easing.back(1.3))), pop(1.12)]).start(() => spin.setValue(0));
    } else if (k === 2) {
      Animated.parallel([
        Animated.sequence([T(jump, 1, 260, Easing.out(Easing.quad)), Animated.spring(jump, { toValue: 0, friction: 3, tension: 90, useNativeDriver: ND })]),
        pop(1.08),
      ]).start();
    } else if (k === 3) {
      Animated.sequence([T(side, 1, 280, Easing.out(Easing.quad)), T(side, -1, 420, Easing.inOut(Easing.quad)), Animated.spring(side, { toValue: 0, friction: 4, useNativeDriver: ND })]).start();
    } else {
      spin.setValue(0);
      Animated.parallel([T(spin, -1, 900, Easing.out(Easing.cubic)), Animated.sequence([T(sc, 1.35, 350), Animated.spring(sc, { toValue: 1, friction: 4, useNativeDriver: ND })])]).start(() => spin.setValue(0));
    }
  };
 
  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => { Animated.spring(sc, { toValue: 1.06, friction: 6, useNativeDriver: ND }).start(); },
      onPanResponderMove: (e, g) => { dx.setValue(g.dx); dy.setValue(g.dy); },
      onPanResponderRelease: (e, g) => {
        const moved = Math.abs(g.dx) + Math.abs(g.dy) > 8;
        Animated.spring(dx, { toValue: 0, friction: 4, tension: 60, useNativeDriver: false }).start();
        Animated.spring(dy, { toValue: 0, friction: 4, tension: 60, useNativeDriver: false }).start();
        Animated.spring(sc, { toValue: 1, friction: 5, useNativeDriver: ND }).start();
        if (!moved) tapRef.current();
      },
      onPanResponderTerminate: () => {
        Animated.spring(dx, { toValue: 0, useNativeDriver: false }).start();
        Animated.spring(dy, { toValue: 0, useNativeDriver: false }).start();
        Animated.spring(sc, { toValue: 1, useNativeDriver: ND }).start();
      },
    })
  ).current;
 
  const dragRot = dx.interpolate({ inputRange: [-160, 160], outputRange: ['-16deg', '16deg'], extrapolate: 'clamp' });
  const spinDeg = spin.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-360deg', '0deg', '360deg'] });
 
  return (
    <View style={{ width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
      {round && (
        <Animated.View
          pointerEvents="none"
          style={{ position: 'absolute', width: w, height: h, borderRadius: w / 2, borderWidth: 2, borderColor: C.lime, opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }), transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }] }}
        />
      )}
      <Animated.View
        {...responder.panHandlers}
        style={[{ transform: [{ translateX: dx }, { translateY: dy }, { rotate: dragRot }] }, Platform.select({ web: { cursor: 'grab', userSelect: 'none' }, default: {} })]}
      >
        <Animated.View
          style={{
            transform: [
              { translateY: Animated.add(flt.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }), jump.interpolate({ inputRange: [0, 1], outputRange: [0, -90] })) },
              { translateX: side.interpolate({ inputRange: [-1, 1], outputRange: [-70, 70] }) },
              { rotate: spinDeg },
              { scale: sc },
            ],
          }}
        >
          <View style={{ width: w, height: h }}>
            <Image source={source} style={[{ width: w, height: h }, round && { borderRadius: w / 2, borderWidth: 2, borderColor: C.violet }]} resizeMode="cover" />
            {fade && (
              <>
                <LinearGradient pointerEvents="none" colors={['rgba(8,9,12,0)', C.ink]} locations={[0, 0.92]} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h * 0.42 }} />
                <LinearGradient pointerEvents="none" colors={[C.ink, 'rgba(8,9,12,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: w * 0.18 }} />
                <LinearGradient pointerEvents="none" colors={['rgba(8,9,12,0)', C.ink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: w * 0.18 }} />
              </>
            )}
          </View>
        </Animated.View>
      </Animated.View>
      {showHint && <Animated.Text pointerEvents="none" style={{ position: 'absolute', bottom: round ? -30 : 12, color: C.mute, fontSize: 11, letterSpacing: 2, opacity: hint }}>
        TAP OR DRAG ME
      </Animated.Text>}
    </View>
  );
}
 
/* ---------- Orbit: photo ke charo taraf tech chips ghoomte hain ---------- */
export function Orbit({ radius, items }) {
  const r = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const l = Animated.loop(Animated.timing(r, { toValue: 1, duration: 26000, easing: Easing.linear, useNativeDriver: ND }));
    l.start();
    return () => l.stop();
  }, []);
  const CW = 78, CH = 28, size = radius * 2;
  const fwd = r.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const back = r.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });
  return (
    <Animated.View pointerEvents="none" style={{ position: 'absolute', width: size, height: size, left: '50%', top: '50%', marginLeft: -radius, marginTop: -radius, transform: [{ rotate: fwd }] }}>
      {items.map((t, i) => {
        const a = (i / items.length) * 2 * Math.PI;
        return (
          <Animated.View
            key={t}
            style={{ position: 'absolute', left: radius + radius * Math.cos(a) - CW / 2, top: radius + radius * Math.sin(a) - CH / 2, width: CW, height: CH, borderRadius: 999, borderWidth: 1, borderColor: C.line, backgroundColor: 'rgba(15,17,22,0.9)', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: back }] }}
          >
            <Text style={{ color: C.paper, fontSize: 11 }}>{t}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}
 
/* ---------- Marquee: lagataar chalti hui text patti ---------- */
export function Marquee({ items, size = 44, speed = 70 }) {
  const [w, setW] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!w) return;
    x.setValue(0);
    const a = Animated.loop(Animated.timing(x, { toValue: -w, duration: (w / speed) * 1000, easing: Easing.linear, useNativeDriver: ND }));
    a.start();
    return () => a.stop();
  }, [w]);
  const group = (
    <>
      {items.map((t, i) => (
        <Text key={t + i} style={{ fontFamily: F.display, fontSize: size, lineHeight: size * 1.1, color: i % 2 ? C.mute : C.paper, marginRight: 40 }}>
          {t.toUpperCase()}
        </Text>
      ))}
    </>
  );
  return (
    <View style={{ overflow: 'hidden', borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, backgroundColor: C.ink2, paddingVertical: 14 }}>
      <Animated.View style={{ flexDirection: 'row', alignSelf: 'flex-start', transform: [{ translateX: x }] }}>
        <View onLayout={(e) => setW(e.nativeEvent.layout.width)} style={{ flexDirection: 'row', flexShrink: 0 }}>{group}</View>
        <View style={{ flexDirection: 'row', flexShrink: 0 }}>{group}</View>
        <View style={{ flexDirection: 'row', flexShrink: 0 }}>{group}</View>
      </Animated.View>
    </View>
  );
}
 
/* ---------- Pop: scroll pe section aane par up/left/right/zoom animation ---------- */
export function Pop({ show, delay = 0, from = 'up', style, children }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (show) Animated.timing(v, { toValue: 1, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [show]);
  const tr =
    from === 'left' ? { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-90, 0] }) }
    : from === 'right' ? { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [90, 0] }) }
    : from === 'zoom' ? { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }
    : { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [60, 0] }) };
  return <Animated.View style={[style, { opacity: v, transform: [tr] }]}>{children}</Animated.View>;
}
 
/* ---------- CountUp: 0 se number tak ginti ---------- */
export function CountUp({ value, run, style }) {
  const to = parseInt(value, 10) || 0;
  const suffix = String(value).replace(/^[0-9]+/, '');
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const v = new Animated.Value(0);
    const id = v.addListener(({ value: x }) => setN(Math.round(x)));
    Animated.timing(v, { toValue: to, duration: 1600, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [run]);
  return <Text style={style}>{n}{suffix}</Text>;
}
 
/* ---------- Typewriter: role type hota aur mitta hai ---------- */
export function Typewriter({ words, style }) {
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [del, setDel] = useState(false);
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const l = Animated.loop(Animated.sequence([T(blink, 0, 420), T(blink, 1, 420)]));
    l.start();
    return () => l.stop();
  }, []);
  useEffect(() => {
    const w = words[i];
    let t;
    if (!del && j < w.length) t = setTimeout(() => setJ(j + 1), 90);
    else if (!del) t = setTimeout(() => setDel(true), 1400);
    else if (j > 0) t = setTimeout(() => setJ(j - 1), 45);
    else { setDel(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [i, j, del]);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={style}>{words[i].slice(0, j)}</Text>
      <Animated.Text style={[style, { color: C.lime, opacity: blink }]}>|</Animated.Text>
    </View>
  );
}
 
/* ---------- HoverLift: hover/press pe card upar uthta hai ---------- */
export function HoverLift({ children, style, inner, lift = 8, onPress }) {
  const h = useRef(new Animated.Value(0)).current;
  const to = (x) => Animated.spring(h, { toValue: x, friction: 7, tension: 90, useNativeDriver: ND }).start();
  return (
    <Pressable onHoverIn={() => to(1)} onHoverOut={() => to(0)} onPressIn={() => to(1)} onPressOut={() => to(0)} onPress={onPress} style={style}>
      <Animated.View style={[{ flex: 1 }, inner, { transform: [{ translateY: h.interpolate({ inputRange: [0, 1], outputRange: [0, -lift] }) }, { scale: h.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] }) }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
 
/* ---------- Stars: taare ek ek karke chamakte hain ---------- */
export function Stars() {
  const v = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0.35))).current;
  useEffect(() => {
    const ls = v.map((x, i) =>
      Animated.loop(Animated.sequence([Animated.delay(i * 200), T(x, 1, 450), T(x, 0.35, 450), Animated.delay((4 - i) * 200)]))
    );
    ls.forEach((l) => l.start());
    return () => ls.forEach((l) => l.stop());
  }, []);
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {v.map((x, i) => <Animated.Text key={i} style={{ color: C.lime, fontSize: 16, opacity: x }}>★</Animated.Text>)}
    </View>
  );
}
 
/* ---------- Pulse: dheere dheere bada-chhota hota rehta hai ---------- */
export function Pulse({ children, style, from = 1, to = 1.12, duration = 2200 }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const l = Animated.loop(Animated.sequence([T(v, 1, duration, Easing.inOut(Easing.sin)), T(v, 0, duration, Easing.inOut(Easing.sin))]));
    l.start();
    return () => l.stop();
  }, []);
  return <Animated.View style={[style, { transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [from, to] }) }] }]}>{children}</Animated.View>;
}
 