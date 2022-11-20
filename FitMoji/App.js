import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lemon-Jelly': require('./assets/fonts/lemonjelly.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{
            textShadowColor: '#000000',
            textShadowRadius: '5',
            fontFamily: 'Lemon-Jelly',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 120,
        }}>FitMoji</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
  },
});
