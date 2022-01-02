import axios from 'axios';
import {Formik} from 'formik';
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import * as Yup from 'yup';
import Error from './Error';
import {BasicFormValues} from './SignUpForm';

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .trim()
    .required('Required'),
  password: Yup.string().required('No password provided.'),
});

const LoginForm = () => {
  const handleOnSubmit = async (values: BasicFormValues) => {
    const response = await axios.post('http://localhost:5000/login', {
      userName: values.userName,
      password: values.password,
    });

    console.log(response.data);
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
