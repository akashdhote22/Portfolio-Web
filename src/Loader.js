import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { C, F } from './theme';

// "Welcome to my portfolio" loader: counter 0-100 phir upar slide hokar hat jata hai.
export default function Loader({ onDone }) {
  const { height, width } = useWindowDimensions();
  const y = useRef(new Animated.Value(0)).current;
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(100, v + Math.ceil(Math.random() * 9))), 45);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (n < 100) return;
    const id = setTimeout(() => {
      Animated.timing(y, { toValue: -height, duration: 800, easing: Easing.bezier(0.76, 0, 0.24, 1), useNativeDriver: true }).start(onDone);
    }, 250);
    return () => clearTimeout(id);
  }, [n]);
  const fs = Math.min(width * 0.12, 90);
  return (
    <Animated.View style={[s.wrap, { transform: [{ translateY: y }] }]}>
      <Text style={[s.t, { fontSize: fs, lineHeight: fs }]}>WELCOME TO MY</Text>
      <Text style={[s.t, { fontSize: fs, lineHeight: fs, color: C.lime }]}>PORTFOLIO</Text>
      <View style={s.line}><View style={[s.fill, { width: `${n}%` }]} /></View>
      <Text style={s.n}>{n}%</Text>
    </Animated.View>
  );
}
const s = StyleSheet.create({
  wrap: { ...StyleSheet.absoluteFillObject, backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  t: { fontFamily: F.display, color: C.paper, textAlign: 'center' },
  line: { width: 240, height: 2, backgroundColor: C.line, marginTop: 20 },
  fill: { height: 2, backgroundColor: C.lime },
  n: { marginTop: 12, color: C.mute, fontSize: 13 },
});
