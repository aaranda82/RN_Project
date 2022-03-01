import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface ModeSelectProps {
  mode: ModeTypes;
  setMode: (value: ModeTypes) => void;
}

export type ModeTypes = 'login' | 'signup';

const LoginModeSelect: React.FC<ModeSelectProps> = ({mode, setMode}) => {
  return (
    <>
      <View style={styles.paddingT}>
        <View style={styles.spacer} />
        <Text style={styles.loginText}>
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </Text>
        {mode === 'login' ? (
          <Button title="Sign Up" onPress={() => setMode('signup')} />
        ) : (
          <Button title="Log In" onPress={() => setMode('login')} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paddingT: {paddingTop: 100},
  loginText: {textAlign: 'center', paddingBottom: 20, paddingTop: 20},
  spacer: {height: 5, backgroundColor: '#566573'},
});

export default LoginModeSelect;
