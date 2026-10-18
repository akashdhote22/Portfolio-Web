import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { C, F } from './theme';

// Neeche se upar fade-in. delay se stagger milta hai.
export function Reveal({ children, delay = 0, style }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 800, delay, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}

export function Button({ label, onPress, ghost, danger, style }) {
  const [hover, setHover] = useState(false);
  const bg = ghost ? 'transparent' : danger ? C.danger : C.lime;
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      accessibilityRole="button"
      style={[b.btn, { backgroundColor: bg, borderColor: ghost ? (hover ? C.lime : C.line) : bg, transform: [{ translateY: hover ? -2 : 0 }] }, style]}
    >
      <Text style={[b.txt, { color: ghost ? (hover ? C.lime : C.paper) : '#0b0d08' }]}>{label}</Text>
    </Pressable>
  );
}

export function Eyebrow({ children }) {
  return <Text style={b.eyebrow}>{String(children).toUpperCase()}</Text>;
}

export function H2({ children, accent, size = 64 }) {
  return (
    <Text style={[b.h2, { fontSize: size, lineHeight: size * 0.92 }]}>
      {children}{accent ? <Text style={{ color: C.lime }}>{' ' + accent}</Text> : null}
    </Text>
  );
}

const b = StyleSheet.create({
  btn: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 999, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  txt: { fontWeight: '700', fontSize: 15 },
  eyebrow: { color: C.mute, fontSize: 12, letterSpacing: 2, marginBottom: 8, fontFamily: Platform.select({ web: 'monospace', default: undefined }) },
  h2: { fontFamily: F.display, color: C.paper, textTransform: 'uppercase' },
});
