import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';

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

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      console.log(username, password);
      try {
        const { data } = await signIn({ username, password });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}

export default SignIn;
