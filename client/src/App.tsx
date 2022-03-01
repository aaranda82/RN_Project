import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginForm from './components/LoginForm/LoginForm';
import ModeSelect, {ModeTypes} from './components/LoginForm/ModeSelect';
import RegisterForm from './components/LoginForm/RegisterForm';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [mode, setMode] = useState<ModeTypes>('signup');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text style={[styles.sectionTitle, styles.topText]}>
              Super Sweet Mobile App
            </Text>
            <Text style={styles.subTitle}>Create an account and log in</Text>
            <Text style={styles.subTitle}>
              to view all the <Text style={styles.highlight}>super sweet</Text>{' '}
              content
            </Text>
            {mode === 'login' ? <LoginForm /> : <RegisterForm />}
            <ModeSelect mode={mode} setMode={setMode} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  topText: {textAlign: 'center', margin: 30},
  subTitle: {textAlign: 'center', fontSize: 16, color: '#566573'},
  highlight: {fontWeight: '600'},
});

export default App;
