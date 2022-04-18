import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Error: React.FC<{ text: string }> = ({ text }) => {
  return <Text style={styles.error}>{text}</Text>;
};

const styles = StyleSheet.create({
  error: { textAlign: 'center', color: '#EC7063' },
});

export default Error;
