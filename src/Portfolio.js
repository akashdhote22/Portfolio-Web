import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking, Pressable, StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { C, F } from './theme';
import { Button, Eyebrow, H2 } from './ui';
import { useProjects } from './useProjects';
import {
  ND, Letters, WaveLoop, NavLink, Burger, MenuPanel, AvatarPhoto, Marquee,
  Pop, CountUp, Typewriter, HoverLift, Stars, Pulse,
} from './Motion';
 
// ====== Edit your details here ======
const ME = {
  name: 'AKASH',
  role: 'Software Developer',
  email: 'akashdhote26346@gmail.com',
  intro: 'I build web, mobile and AI products that run smoothly.',
  about: 'I am a software developer who takes an idea all the way to launch: design, frontend, backend and deployment.',
  introText: "Hey, I'm Akash. An enthusiastic full-stack developer who loves to build modern web and mobile applications. I enjoy turning concepts into scalable products using a tech stack like React, Node.js, Firebase, Expo and Python.",
  stats: [['3+', 'Years coding'], ['25+', 'Projects shipped'], ['100%', 'Mobile ready']],
  socials: [['Instagram', 'https://instagram.com'], ['GitHub', 'https://github.com'], ['LinkedIn', 'https://linkedin.com']],
};
// Photos: put them in the assets folder. For a different photo in the Intro section, add assets/photo2.png
// and change the second line to require('../assets/photo2.png'). A transparent (background removed) PNG gives the best result.
const HERO_PHOTO = require('../assets/photo.png');
const INTRO_PHOTO = require('../assets/photo.png');
 
const PINK = '#d86bff';
const ROLES = ['Software Developer', 'App Builder', 'AI Tinkerer', 'Problem Solver'];
const TECH_STRIP = ['TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'React', 'Node.js', 'Firebase', 'Expo', 'Python'];
const MARQUEE = ['Web Apps', 'Mobile Apps', 'AI Tools', 'Automation', 'UI Motion', 'APIs'];
const STEPS = [
  ['Understanding Your Vision', 'I clarify your goal, audience and budget before writing any code.'],
  ['Designing the Experience', 'I share wireframes and the look, then move ahead after your approval.'],
  ['Building It Right', 'Clean code, mobile first, with a progress demo every week.'],
  ['Launch and Support', 'Testing, deployment and support after launch.'],
];
const VOICES = [
  ['The site is fast and smooth. It looks perfect on mobile too.', 'Client name, Founder'],
  ['Delivered on time and every change was done right away.', 'Client name, Marketing lead'],
  ['The animations took our website to another level.', 'Client name, Startup owner'],
];
// Certificates shown in the Showcase. Add an imageUrl (link to your certificate image) to show the real one.
const CERTS = [
  { title: 'Full-Stack Web Development', by: 'Your platform or institute', imageUrl: '' },
  { title: 'React Native Specialist', by: 'Your platform or institute', imageUrl: '' },
  { title: 'Cloud and DevOps Basics', by: 'Your platform or institute', imageUrl: '' },
];
const SKILLS = [['Re', 'React'], ['No', 'Node.js'], ['Fb', 'Firebase'], ['Ex', 'Expo'], ['Py', 'Python'], ['JS', 'JavaScript'], ['H5', 'HTML'], ['C3', 'CSS']];
const TABS = ['Projects', 'Certificates', 'Skills'];
 
const NAV = [['intro', 'Intro'], ['about', 'About'], ['showcase', 'Showcase'], ['contact', 'Contact']];
const KEYS = NAV.map(([k]) => k);
 
/* Portfolio Showcase: Projects / Certificates / Skills tabs */
function Showcase({ show, projects, wide, onCall }) {
  const [tab, setTab] = useState(0);
  const colW = wide ? '31%' : '100%';
  return (
    <View>
      <Pop show={show} style={{ alignItems: 'center' }}>
        <Text style={[s.scHead, { fontSize: wide ? 46 : 30, lineHeight: wide ? 50 : 34 }]}>PORTFOLIO SHOWCASE</Text>
        <Text style={[s.mute, { textAlign: 'center', maxWidth: 640, marginTop: 10 }]}>
          Explore my journey through projects, certificates and technical expertise. Each section marks a step in my continuous learning path.
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TABS.map((t, i) => (
            <Pressable key={t} onPress={() => setTab(i)} accessibilityRole="tab">
              {tab === i ? (
                <LinearGradient colors={[C.violet, PINK]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.pill}>
                  <Text style={s.pillT}>{t}</Text>
                </LinearGradient>
              ) : (
                <View style={[s.pill, s.pillOff]}><Text style={[s.pillT, { color: C.mute }]}>{t}</Text></View>
              )}
            </Pressable>
          ))}
        </View>
      </Pop>
 
      <View key={tab} style={{ marginTop: 36 }}>
        {tab === 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            {projects.map((p, i) => (
              <Pop key={p.id} show delay={i * 110} style={{ width: colW }}>
                <HoverLift inner={s.scCard} onPress={() => p.link && Linking.openURL(p.link)}>
                  <View style={[s.scShot, { backgroundColor: p.color || C.violet }]}>
                    {p.imageUrl ? <Image source={{ uri: p.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" /> : <Text style={s.shotT}>{(p.title || '').toUpperCase()}</Text>}
                  </View>
                  <Text style={s.scTitle}>{p.title}</Text>
                  <Text style={s.mute}>{p.description}</Text>
                </HoverLift>
              </Pop>
            ))}
          </View>
        )}
 
        {tab === 1 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            {CERTS.map((c, i) => (
              <Pop key={c.title} show delay={i * 130} from={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} style={{ width: colW }}>
                <HoverLift inner={s.certFrame}>
                  {c.imageUrl ? (
                    <Image source={{ uri: c.imageUrl }} style={{ width: '100%', aspectRatio: 1.4, borderRadius: 6 }} resizeMode="cover" />
                  ) : (
                    <View style={s.certPaper}>
                      <Text style={s.certLabel}>CERTIFICATE OF COMPLETION</Text>
                      <Text style={s.certTitle}>{c.title}</Text>
                      <View style={s.certLine} /><View style={[s.certLine, { width: '60%' }]} /><View style={[s.certLine, { width: '75%' }]} />
                      <View style={s.certSeal} />
                    </View>
                  )}
                  <Text style={[s.scTitle, { marginTop: 12 }]}>{c.title}</Text>
                  <Text style={s.mute}>{c.by}</Text>
                </HoverLift>
              </Pop>
            ))}
          </View>
        )}
 
        {tab === 2 && (
          <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              {SKILLS.map(([ab, name], i) => (
                <Pop key={name} show delay={i * 70} from="zoom">
                  <HoverLift lift={6} style={{ width: 76 }} inner={{ alignItems: 'center', gap: 6 }}>
                    <View style={s.skillDot}><Text style={s.skillAb}>{ab}</Text></View>
                    <Text style={s.skillName}>{name}</Text>
                  </HoverLift>
                </Pop>
              ))}
            </View>
            <View style={{ flexDirection: wide ? 'row' : 'column', gap: wide ? 48 : 28, marginTop: 44, alignItems: wide ? 'center' : 'stretch' }}>
              <Pop show from="left" style={{ flex: 1 }}>
                <Text style={[s.scHeadL, { fontSize: wide ? 40 : 28, lineHeight: wide ? 44 : 32 }]}>AN APPROACH THAT HELPS MY CLIENTS <Text style={{ color: PINK }}>GROW</Text></Text>
                <Text style={[s.mute, { marginTop: 12, maxWidth: 440 }]}>I follow a clear process so you always know what is happening and what comes next, from the first call to launch day.</Text>
                <Button label="Book a Call" onPress={onCall} style={{ alignSelf: 'flex-start', marginTop: 20 }} />
              </Pop>
              <View style={{ flex: 1, gap: 12 }}>
                {STEPS.map(([t, d], i) => (
                  <Pop key={t} show delay={150 + i * 120} from="right">
                    <HoverLift lift={4} inner={s.skillStep}>
                      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                        <View style={s.skillNo}><Text style={{ color: '#fff', fontWeight: '700' }}>{i + 1}</Text></View>
                        <View style={{ flex: 1, minWidth: 0 }}>
                          <Text style={{ color: C.paper, fontWeight: '700', fontSize: 15 }}>{t}</Text>
                          <Text style={[s.mute, { fontSize: 13, lineHeight: 19 }]}>{d}</Text>
                        </View>
                      </View>
                    </HoverLift>
                  </Pop>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
 
export default function Portfolio({ onAdmin }) {
  const { width, height } = useWindowDimensions();
  const wide = width >= 900;
  const pad = wide ? 48 : 20;
  const bigSize = Math.min(((width - pad * 2) * 0.98) / 3.9, 340);
  const h2 = wide ? 72 : 40;
 
  // Hero geometry: the photo stands in front of the giant text, head slightly above the letters.
  const capH = bigSize * 0.82;
  const photoH = Math.min(capH * 3, height * 0.78);
  const photoW = photoH * 0.8;
  const padT = 24 + capH * 0.18;
  const heroH = 48 + photoH;
 
  const introW = wide ? 340 : Math.min(width * 0.4, 200);
  const introH = introW * 1.45;
 
  const scroller = useRef(null);
  const posRef = useRef({});
  const reachRef = useRef(height * 0.9);
  const curRef = useRef('top');
  const topRef = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const topV = useRef(new Animated.Value(0)).current;
 
  const [pos, setPos] = useState({});
  const [reach, setReach] = useState(height * 0.9);
  const [cur, setCur] = useState('top');
  const [menu, setMenu] = useState(false);
  const [navH, setNavH] = useState(60);
  const [contentH, setContentH] = useState(3000);
  const { projects } = useProjects();
 
  const mark = (k) => (e) => {
    const y = e.nativeEvent.layout.y;
    posRef.current[k] = y;
    setPos((p) => (p[k] === y ? p : { ...p, [k]: y }));
  };
  const show = (k) => (pos[k] ?? 1e9) < reach - 60;
  const go = (k) => {
    setMenu(false);
    scroller.current?.scrollTo({ y: k === 'top' ? 0 : Math.max(0, (posRef.current[k] ?? 0) - 4), animated: true });
  };
  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    const r = y + height * 0.9;
    if (r > reachRef.current + 20) { reachRef.current = r; setReach(r); }
    let c = 'top';
    for (const k of KEYS) if ((posRef.current[k] ?? 1e9) <= y + 140) c = k;
    if (c !== curRef.current) { curRef.current = c; setCur(c); }
    const t = y > 500;
    if (t !== topRef.current) {
      topRef.current = t;
      Animated.spring(topV, { toValue: t ? 1 : 0, friction: 6, useNativeDriver: ND }).start();
    }
  };
  const progress = scrollY.interpolate({ inputRange: [0, Math.max(1, contentH - height)], outputRange: ['0%', '100%'], extrapolate: 'clamp' });
  const heroShift = scrollY.interpolate({ inputRange: [0, 700], outputRange: [0, -90], extrapolate: 'clamp' });
  const photoShift = scrollY.interpolate({ inputRange: [0, 700], outputRange: [0, 80], extrapolate: 'clamp' });
 
  return (
    <View style={{ flex: 1, backgroundColor: C.ink }}>
      {/* scroll progress bar */}
      <Animated.View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, height: 3, width: progress, backgroundColor: C.lime, zIndex: 60 }} />
 
      {/* NAV */}
      <View style={[s.nav, { paddingHorizontal: pad }]} onLayout={(e) => setNavH(e.nativeEvent.layout.height)}>
        <Pressable onPress={() => go('top')}>
          <Letters text={ME.name + '.'} style={s.logo} accentLast delay={1700} step={70} interactive />
        </Pressable>
        {wide ? (
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {NAV.map(([k, l]) => <NavLink key={k} label={l} active={cur === k} onPress={() => go(k)} />)}
          </View>
        ) : (
          <Pressable onPress={() => setMenu((m) => !m)} hitSlop={12} accessibilityLabel="Menu"><Burger open={menu} /></Pressable>
        )}
      </View>
      {!wide && <MenuPanel open={menu} items={NAV} current={cur} onPick={go} top={navH} />}
 
      <Animated.ScrollView
        ref={scroller}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(w, h) => setContentH(h)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false, listener: onScroll })}
      >
        {/* HERO: giant text, photo standing in front of it */}
        <View style={{ height: heroH, overflow: 'hidden' }}>
          <Animated.View style={{ position: 'absolute', left: pad, right: pad, top: padT, transform: [{ translateX: heroShift }] }}>
            <Letters text="PORTFOLIO" style={[s.big, { fontSize: bigSize, lineHeight: bigSize * 0.85 }]} delay={1500} step={70} interactive />
          </Animated.View>
          {/* metallic fade on the letters: bright on top, darker at the bottom */}
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(8,9,12,0)', 'rgba(8,9,12,0.72)']}
            style={{ position: 'absolute', left: pad, right: pad, top: padT, height: bigSize * 0.85 }}
          />
          <Animated.View style={{ position: 'absolute', top: 24, left: '50%', marginLeft: -photoW / 2, transform: [{ translateY: photoShift }] }}>
            <Pop show delay={2000} from="up">
              <AvatarPhoto source={HERO_PHOTO} w={photoW} h={photoH} round={false} fade />
            </Pop>
          </Animated.View>
          <Pop show delay={2300} style={{ position: 'absolute', left: pad, top: padT + capH + 16, zIndex: 5 }}>
            <Text style={s.heroLabel}>Software <Text style={{ fontStyle: 'italic', color: C.mute }}>Developer</Text></Text>
          </Pop>
        </View>
 
        <Pop show delay={2500} style={{ alignItems: 'center', gap: 16, paddingHorizontal: pad, paddingBottom: 56 }}>
          <Eyebrow>Based in India · Open for work</Eyebrow>
          <Typewriter words={ROLES} style={s.role} />
          <Text style={[s.mute, { textAlign: 'center', maxWidth: 380 }]}>{ME.intro}</Text>
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button label="See my work" onPress={() => go('showcase')} />
            <Button label="Let's talk" ghost onPress={() => go('contact')} />
          </View>
        </Pop>
 
        {/* INTRO: photo on the left, heading and glass card on the right */}
        <View onLayout={mark('intro')} style={{ paddingHorizontal: pad, paddingVertical: 56 }}>
          <View style={{ flexDirection: 'row', gap: wide ? 56 : 14, alignItems: wide ? 'center' : 'flex-start', justifyContent: 'center' }}>
            <Pop show={show('intro')} from="left">
              <AvatarPhoto source={INTRO_PHOTO} w={introW} h={introH} round={false} fade showHint={false} />
            </Pop>
            <View style={{ flex: 1, minWidth: 0, maxWidth: 560, gap: wide ? 24 : 12 }}>
              <Pop show={show('intro')} from="right" style={{ alignItems: 'flex-end' }}>
                <Text style={[s.big, { fontSize: wide ? 120 : 52, lineHeight: wide ? 110 : 50 }]}>INTRO</Text>
              </Pop>
              <Pop show={show('intro')} from="right" delay={200}>
                <View style={[s.glass, { padding: wide ? 24 : 14 }]}>
                  <Text style={{ color: '#d4d7df', fontSize: wide ? 16 : 12.5, lineHeight: wide ? 25 : 19 }}>{ME.introText}</Text>
                </View>
              </Pop>
            </View>
          </View>
        </View>
        <Marquee items={TECH_STRIP} size={wide ? 22 : 16} speed={55} />
 
        <Marquee items={MARQUEE} size={wide ? 40 : 28} />
 
        {/* ABOUT */}
        <View onLayout={mark('about')} style={[s.sec, { paddingHorizontal: pad }, wide && { flexDirection: 'row', gap: 64 }]}>
          <Pop show={show('about')} from="left" style={{ flex: 1 }}>
            <Eyebrow>About</Eyebrow>
            <H2 size={h2} accent="works">Code that</H2>
          </Pop>
          <Pop show={show('about')} from="right" delay={150} style={{ flex: 1, marginTop: wide ? 0 : 24 }}>
            <Text style={s.lead}>{ME.about}</Text>
            <View style={s.stats}>
              {ME.stats.map(([n, l]) => (
                <HoverLift key={l} style={{ flex: 1 }} inner={s.stat}>
                  <CountUp value={n} run={show('about')} style={s.statN} />
                  <Text style={s.statL}>{l.toUpperCase()}</Text>
                </HoverLift>
              ))}
            </View>
          </Pop>
        </View>
 
        {/* PORTFOLIO SHOWCASE */}
        <View onLayout={mark('showcase')} style={[s.sec, { paddingHorizontal: pad }]}>
          <Showcase show={show('showcase')} projects={projects} wide={wide} onCall={() => go('contact')} />
        </View>
 
        {/* VOICES */}
        <View onLayout={mark('voices')} style={[s.sec, { paddingHorizontal: pad }]}>
          <Pop show={show('voices')}>
            <Eyebrow>Client voices · sample text</Eyebrow>
            <H2 size={h2} accent="say">What clients</H2>
          </Pop>
          <View style={{ flexDirection: wide ? 'row' : 'column', gap: 16, marginTop: 36 }}>
            {VOICES.map(([q, w], i) => (
              <Pop key={q} show={show('voices')} delay={i * 160} from={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} style={{ flex: 1 }}>
                <HoverLift inner={s.step}>
                  <Stars />
                  <Text style={{ color: C.paper, fontSize: 16, lineHeight: 23 }}>{q}</Text>
                  <Text style={s.mute}>{w}</Text>
                </HoverLift>
              </Pop>
            ))}
          </View>
        </View>
 
        {/* CONTACT */}
        <View onLayout={mark('contact')} style={[s.sec, { paddingHorizontal: pad, alignItems: 'center' }]}>
          <Pop show={show('contact')} from="zoom" style={{ alignItems: 'center' }}>
            <Eyebrow>Get in touch</Eyebrow>
            <Text style={[s.big, { fontSize: wide ? 110 : 44, lineHeight: wide ? 104 : 42, textAlign: 'center' }]}>GOT A PROJECT?{'\n'}<Text style={{ color: C.lime }}>LET'S TALK</Text></Text>
          </Pop>
          <Pop show={show('contact')} delay={250} style={{ alignItems: 'center' }}>
            <Text selectable style={s.email}>{ME.email}</Text>
            <Pulse style={{ marginTop: 20 }} from={1} to={1.06} duration={1200}>
              <Button label="Send email" onPress={() => Linking.openURL('mailto:' + ME.email)} />
            </Pulse>
            <View style={{ flexDirection: 'row', gap: 24, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
              {ME.socials.map(([l, u]) => <NavLink key={l} label={l} onPress={() => Linking.openURL(u)} />)}
            </View>
          </Pop>
        </View>
 
        {/* FOOTER */}
        <View style={s.footer}>
          <WaveLoop text={ME.name} style={[s.big, { fontSize: Math.min(width * 0.26, 300), lineHeight: Math.min(width * 0.26, 300) * 0.9, color: C.lime }]} />
          <Pressable onPress={onAdmin}><Text style={[s.mute, { marginTop: 16, fontSize: 12 }]}>© 2026 {ME.name} · Admin login</Text></Pressable>
        </View>
      </Animated.ScrollView>
 
      {/* back to top */}
      <Animated.View style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 50, opacity: topV, transform: [{ scale: topV }] }} pointerEvents={'box-none'}>
        <Pressable onPress={() => go('top')} style={s.topBtn} accessibilityLabel="Back to top">
          <Text style={{ color: '#0b0d08', fontSize: 22, fontWeight: '700' }}>↑</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
 
const s = StyleSheet.create({
  nav: { paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.ink, zIndex: 50 },
  logo: { fontFamily: F.display, fontSize: 26, color: C.paper },
  big: { fontFamily: F.display, color: C.paper, textAlign: 'center' },
  heroLabel: { color: C.paper, fontSize: 15, letterSpacing: 0.3 },
  role: { fontFamily: F.displayBold, color: C.paper, fontSize: 30, lineHeight: 36, textTransform: 'uppercase' },
  mute: { color: C.mute, fontSize: 14, lineHeight: 21 },
  sec: { paddingVertical: 64 },
  lead: { color: '#c3c6cf', fontSize: 17, lineHeight: 26 },
  stats: { flexDirection: 'row', gap: 16, marginTop: 28 },
  stat: { borderTopWidth: 1, borderTopColor: C.line, paddingTop: 12 },
  statN: { fontFamily: F.display, fontSize: 40, color: C.lime },
  statL: { color: C.mute, fontSize: 10, letterSpacing: 1.2 },
  row: { borderBottomWidth: 1, borderBottomColor: C.line, paddingVertical: 18, paddingHorizontal: 16 },
  rowN: { width: 28, fontSize: 13 },
  rowT: { flex: 1, fontFamily: F.display },
  rowPl: { fontSize: 26 },
  tag: { color: C.mute, borderWidth: 1, borderColor: C.line, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, fontSize: 12, overflow: 'hidden' },
  tagDark: { color: '#0b0d08', borderWidth: 1, borderColor: '#0b0d08', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, fontSize: 12, overflow: 'hidden' },
  card: { backgroundColor: C.ink2, borderWidth: 1, borderColor: C.line, borderRadius: 18, overflow: 'hidden' },
  shot: { aspectRatio: 16 / 10, overflow: 'hidden' },
  shotT: { fontFamily: F.display, fontSize: 36, color: 'rgba(255,255,255,0.92)', textAlign: 'center' },
  cardT: { fontFamily: F.display, fontSize: 24, color: C.paper },
  step: { borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 22, gap: 10, backgroundColor: C.ink2 },
  stepN: { fontFamily: F.display, fontSize: 44, color: C.violet },
  arrow: { width: 48, height: 48, paddingVertical: 0, paddingHorizontal: 0 },
  email: { color: C.paper, fontSize: 16, marginTop: 28, borderWidth: 1, borderStyle: 'dashed', borderColor: C.mute, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18 },
  footer: { paddingTop: 40, paddingBottom: 28, paddingHorizontal: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: C.line, overflow: 'hidden' },
  topBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center' },
  glass: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 20 },
  // showcase
  scHead: { fontFamily: F.display, color: PINK, textAlign: 'center' },
  scHeadL: { fontFamily: F.display, color: C.paper },
  pill: { paddingVertical: 10, paddingHorizontal: 22, borderRadius: 999, borderWidth: 1, borderColor: 'transparent', alignItems: 'center' },
  pillOff: { borderColor: C.line, backgroundColor: C.ink2 },
  pillT: { color: '#fff', fontWeight: '600', fontSize: 14 },
  scCard: { borderWidth: 1, borderColor: 'rgba(216,107,255,0.28)', borderRadius: 16, padding: 12, gap: 8, backgroundColor: C.ink2 },
  scShot: { aspectRatio: 16 / 10, borderRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', padding: 10 },
  scTitle: { color: C.paper, fontWeight: '700', fontSize: 16 },
  certFrame: { borderWidth: 1, borderColor: 'rgba(216,107,255,0.4)', borderRadius: 14, padding: 10, backgroundColor: C.ink2 },
  certPaper: { backgroundColor: '#f1f1f4', borderRadius: 6, aspectRatio: 1.4, padding: 14, gap: 8, justifyContent: 'center' },
  certLabel: { color: '#5b5f6b', fontSize: 9, letterSpacing: 2 },
  certTitle: { color: '#14161c', fontWeight: '800', fontSize: 17 },
  certLine: { height: 4, width: '90%', backgroundColor: '#cfd1d9', borderRadius: 2 },
  certSeal: { position: 'absolute', right: 14, bottom: 12, width: 34, height: 34, borderRadius: 17, backgroundColor: '#1f2230' },
  skillDot: { width: 60, height: 60, borderRadius: 30, backgroundColor: C.ink2, borderWidth: 1.5, borderColor: C.violet, alignItems: 'center', justifyContent: 'center' },
  skillAb: { color: C.paper, fontWeight: '800', fontSize: 16 },
  skillName: { color: C.mute, fontSize: 11, textAlign: 'center' },
  skillStep: { borderWidth: 1, borderColor: 'rgba(216,107,255,0.35)', borderRadius: 14, padding: 14, backgroundColor: C.ink2 },
  skillNo: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e0509e', alignItems: 'center', justifyContent: 'center' },
});