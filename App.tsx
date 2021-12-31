import axios from 'axios';
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Section from './src/client/components/Section';

const App = () => {
  const [num, setNum] = useState(0);
  const [text, setText] = useState<Array<string>>([]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = async () => {
    const res = await axios.get('http://localhost:5000');
    setText(prev => [...prev, res.data]);
    setNum(prev => prev + 1);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Wow">
            <Text style={styles.highlight}>Great job!!</Text> You created a
            React-Native project.
          </Section>
          <Section title="Keep going">Now do more!</Section>
          <View>
            <Text style={styles.topText}>You have pressed the button</Text>
            <Text style={styles.text}>{num}</Text>
            <Text style={styles.text}>times</Text>
            <Button title="Press here" onPress={handlePress} />
            {text.map((t, i) => (
              <Text style={styles.text} key={t + i}>
                {t}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  text: {textAlign: 'center'},
  topText: {textAlign: 'center', margin: 30},
});

export default App;
