import axios from 'axios';
import {Formik} from 'formik';
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import * as Yup from 'yup';
import {baseUrl} from '../../constants';
import {storeTokens} from '../../services/asyncStorage';
import {useStoreActions} from '../../store';
import {LoginFormProps} from '../../Types';
import Error from './Error';
import {BasicFormValues} from './RegisterForm';

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .trim()
    .required('Required'),
  password: Yup.string().required('No password provided.'),
});

const LoginForm: React.FC<LoginFormProps> = ({navigation}) => {
  const setUserId = useStoreActions(s => s.setUserId);
  const handleOnSubmit = async (values: BasicFormValues) => {
    const {
      data: {accessToken, refreshToken, userId, error},
    } = await axios.post(`${baseUrl}/auth/login`, {
      userName: values.userName,
      password: values.password,
    });
    if (error) {
      console.log(error);
    }
    if (accessToken && refreshToken && userId) {
      await storeTokens(accessToken, refreshToken);
      setUserId(userId);
      navigation.navigate('Overview');
    }
  };

  return (
    <View>
      <Formik
        initialValues={{userName: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
              placeholder="USER NAME"
              style={styles.input}
            />
            {touched.userName && errors.userName ? (
              <Error text={errors.userName} />
            ) : null}
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="PASSWORD"
              secureTextEntry={true}
              style={styles.input}
            />
            {touched.password && errors.password ? (
              <Error text={errors.password} />
            ) : null}

            <Button onPress={handleSubmit} title="Log In" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {textAlign: 'center', padding: 20},
});

export default LoginForm;
