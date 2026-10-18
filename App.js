import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, BigShouldersDisplay_700Bold, BigShouldersDisplay_900Black } from '@expo-google-fonts/big-shoulders-display';
import Loader from './src/Loader';
import Portfolio from './src/Portfolio';
import Admin from './src/Admin';
import { C } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ BigShouldersDisplay_700Bold, BigShouldersDisplay_900Black });
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: C.ink }} />;
  return (
    <View style={{ flex: 1, backgroundColor: C.ink }}>
      <StatusBar style="light" />
      {admin ? <Admin onBack={() => setAdmin(false)} /> : <Portfolio onAdmin={() => setAdmin(true)} />}
      {loading ? <Loader onDone={() => setLoading(false)} /> : null}
    </View>
  );
}
