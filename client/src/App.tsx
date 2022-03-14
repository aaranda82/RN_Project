import React, {useEffect, useState} from 'react';
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
import ModeSelect, {ModeTypes} from './components/LoginForm/ModeSelect';
import Home from './components/Home/Home';
import {getToken, removeTokens} from './services/asyncStorage';
import {TOKEN} from './constants';
import AuthenticationForms from './components/LoginForm';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [mode, setMode] = useState<ModeTypes>('signup');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (!userId) {
      removeTokens();
      setMode('login');
    } else {
      getToken(TOKEN.access).then(token => {
        if (token) {
          setMode('logged_in');
        }
      });
    }
  }, [userId, setMode]);

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
            {(() => {
              switch (mode) {
                case 'logged_in':
                  return <Home setUserId={setUserId} />;
                case 'login':
                case 'signup':
                  return (
                    <AuthenticationForms setUserId={setUserId} mode={mode} />
                  );
                default:
                  return (
                    <AuthenticationForms setUserId={setUserId} mode={mode} />
                  );
              }
            })()}
            {!userId ? <ModeSelect mode={mode} setMode={setMode} /> : null}
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
