import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    user {
      id
      username
      createdAt
      reviewCount
    }
    accessToken
    expiresAt
  }
}
`;