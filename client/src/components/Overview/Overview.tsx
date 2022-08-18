import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { baseUrl, TOKEN } from '../../constants';
import {
  getToken,
  removeTokens,
  storeToken,
} from '../../services/asyncStorage';
import { useStoreActions, useStoreState } from '../../store/hooks';
import { OverviewProps } from '../../Types';

const OverView: React.FC<OverviewProps> = ({ navigation }) => {
  const clearUser = useStoreActions((s) => s.user.clearUser);
  const userName = useStoreState((s) => s.user.userName);
  const [displayText, setDisplayText] = useState('');

  const handleTestCall = async () => {
    const accessToken = await getToken(TOKEN.access);

    const {
      data: { text, error },
    } = await axios.get(`${baseUrl}/`, {
      headers: {
        'x-access-token': accessToken || '',
      },
    });
    if (error) {
      setDisplayText(error);
      if (error === 'Invalid Token') {
        const refreshToken = await getToken(TOKEN.refresh);
        const res = await axios.get(`${baseUrl}/auth/refresh`, {
          headers: { 'x-access-token': refreshToken || '' },
        });
        if (res.data.error) {
          clearUser();
        } else {
          storeToken(res.data.token);
        }
      }
    }
    if (text) {
      setDisplayText(text);
    }
  };

  const logout = () => {
    clearUser();
    removeTokens();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Hi ${userName}!`}</Text>
      <Text style={styles.text}>You have logged in</Text>
      <Text style={styles.text}>{displayText}</Text>
      <Button onPress={handleTestCall} title="Am I logged in?" />
      <Button onPress={logout} title="Log out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
    fontSize: 40,
  },
});

export default OverView;
