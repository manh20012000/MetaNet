/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  // SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {store} from './src/Redux_Toolkit/Store';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/navigation.js';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SocketProvider} from './src/util/socket.io.js';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <StatusBar
          // barStyle={'transparent'}
          translucent={true}
          hidden={false}
          //  backgroundColor={'rgba(233,233,233,0.9)'}
          backgroundColor={'transparent'}
        />
        <SocketProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <Navigation />
          </GestureHandlerRootView>
        </SocketProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }
