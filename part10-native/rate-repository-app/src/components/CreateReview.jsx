import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useCreateReview } from '../hooks/useCreateReview';

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

export default function CreateReview() {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownername: '',
      reponame: '',
      rating: '',
      review: '',
    },
    validationSchema: yup.object().shape({
      ownername: yup.string().required('Repository owner name is required'),
      reponame: yup.string().required('Repository name is required'),
      rating: yup.number().min(0).max(100).required('Rating is required'),
      review: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await createReview({
          ownerName: values.ownername,
          repositoryName: values.reponame,
          rating: Number(values.rating),
          text: values.review,
        });

        if (data && data.createReview) {
          navigate(`/repository/${data.createReview.repositoryId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create a review</Text>
        <TextInput
          placeholder="Repository owner name"
          style={[
            styles.input,
            formik.touched.ownername && formik.errors.ownername ? styles.inputError : null
          ]}
          value={formik.values.ownername}
          onChangeText={formik.handleChange('ownername')}
          onBlur={formik.handleBlur("ownername")}
        />
        {formik.touched.ownername && formik.errors.ownername && (
          <Text style={styles.error}>{formik.errors.ownername}</Text>
        )}
        <TextInput
          placeholder="Repository name"
          style={[
            styles.input,
            formik.touched.reponame && formik.errors.reponame ? styles.inputError : null
          ]}
          value={formik.values.reponame}
          onChangeText={formik.handleChange('reponame')}
          onBlur={formik.handleBlur("reponame")}
          />
        {formik.touched.reponame && formik.errors.reponame && (
          <Text style={styles.error}>{formik.errors.reponame}</Text>
        )}
        <TextInput
          placeholder="Rating (0-100)"
          style={[
            styles.input,
            formik.touched.rating && formik.errors.rating ? styles.inputError : null
          ]}
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur("rating")}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.error}>{formik.errors.rating}</Text>
        )}
        <TextInput
          placeholder="Review"
          multiline
          style={[
            styles.input,
            formik.touched.review && formik.errors.review ? styles.inputError : null
          ]}
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          onBlur={formik.handleBlur("review")}
        />
        {formik.touched.review && formik.errors.review && (
          <Text style={styles.error}>{formik.errors.review}</Text>
        )}

        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text>Create review</Text>
        </Pressable>
      </View>
    </>

  )
}