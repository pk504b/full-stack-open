import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-native';
import { useSignIn } from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 8,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  button: {
    backgroundColor: '#6b4eca',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
  error: {
    color: '#d73a4a',
    fontSize: 12,
    fontStyle: 'italic',
  }
});

export default function Signup() {
  const [signIn] = useSignIn();
  const [signup] = useSignup();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(5).max(30).required('Username is required'),
      password: yup.string().min(5).max(30).required('Password is required'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await signup({ username, password });
        const { data } = await signIn({ username, password });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        navigate('/repositories');
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup & join the app</Text>
      <TextInput
        placeholder="Username"
        style={[
          styles.input,
          formik.touched.username && formik.errors.username ? styles.inputError : null
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password && formik.errors.password ? styles.inputError : null
        ]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={[
          styles.input,
          formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.inputError : null
        ]}
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur("confirmPassword")}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  )
}