import gql from "graphql-tag"

export const GET_USER_INFO = gql(`
  query getUserInfo {
    userInfo {
      name
      id
      role
    }
  }
`)
