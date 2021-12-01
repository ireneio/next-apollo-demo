import { useLazyQuery } from "@apollo/client"
import { GET_USER_INFO } from "./gql"

export const useLazyGetUserInfo = (onCompleted?: (data: any) => void, onError?: (error: any) => void) => {
  return useLazyQuery(GET_USER_INFO, {
    onCompleted: (data) => {
      onCompleted && onCompleted(data)
    },
    onError: (error) => {
      onError && onError(error)
    }
  })
}
