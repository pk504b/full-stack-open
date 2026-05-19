import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import client from './src/utils/apolloClient';

export default function App() {
  const apolloClient = client();
  
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <ApolloProvider client={apolloClient }>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}