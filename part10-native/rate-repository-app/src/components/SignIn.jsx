import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: 'center',
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
  button: {
    backgroundColor: '#6b4eca',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
