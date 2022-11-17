import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Detail from './src/screens/Detail';
import Home from './src/screens/Home';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
};

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                options={{ headerTitle: 'Artworks' }}
                component={Home}
              />
              <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

export default App;
