import React from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeProps} from '../../Types';

const Home: React.FC<HomeProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
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
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
          <Button
            title="Sign up"
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </View>
      </ScrollView>
    </>
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

export default Home;
