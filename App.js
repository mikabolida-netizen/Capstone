import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    'Markazi Text': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Markazi Text Bold': require('./assets/fonts/MarkaziText-Bold.ttf'),
    'Karla': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla Bold': require('./assets/fonts/Karla-Bold.ttf'),
  });

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem('isOnboarded');
      if (hasOnboarded === 'true') {
        setIsOnboarded(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        {!isOnboarded ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ animationEnabled: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                cardStyle: { backgroundColor: '#fff' },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
