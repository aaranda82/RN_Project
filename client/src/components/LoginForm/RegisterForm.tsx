import {Formik} from 'formik';
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import Error from './Error';
import * as Yup from 'yup';
import axios from 'axios';
import {baseUrl} from '../../constants';
import {storeTokens} from '../../services/asyncStorage';
import {useStoreActions} from '../../store';
import {RegisterFormProps} from '../../Types';

const SignUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .trim()
    .required('Required'),
  email: Yup.string().email().required(),
  password: Yup.string()
    // .matches(
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,30}$/,
    //   'Password must contain at least 8 characters, one uppercase, one number, and one special case character',
    // )
    .min(8, 'Too Short!')
    .max(20, 'To Long!')
    .required('No password provided.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

export interface BasicFormValues {
  userName: string;
  password: string;
}

interface SignUpFormValues extends BasicFormValues {
  confirmPassword: string;
  email: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({navigation}) => {
  const setUserId = useStoreActions(s => s.setUserId);
  const handleOnSubmit = async (values: SignUpFormValues) => {
    const res = await axios.post(`${baseUrl}/auth/register`, {
      userName: values.userName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    await storeTokens(res.data.accessToken, res.data.refreshToken);
    setUserId(res.data.userId);
    navigation.navigate('Overview');
  };

  return (
    <View style={styles.login}>
      <Formik
        initialValues={{
          userName: '',
          password: '',
          confirmPassword: '',
          email: '',
        }}
        validationSchema={SignUpSchema}
        validateOnBlur
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
            {errors.userName && touched.userName ? (
              <Error text={errors.userName} />
            ) : null}
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="EMAIL"
              style={styles.input}
            />
            {touched.email && errors.email ? (
              <Error text={errors.email} />
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
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="PASSWORD"
              secureTextEntry={true}
              style={styles.input}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Error text={errors.confirmPassword} />
            ) : null}
            <Button onPress={handleSubmit} title="Sign Up" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {},
  input: {textAlign: 'center', padding: 20},
});

export default RegisterForm;
