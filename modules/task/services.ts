import { useMutation, useQuery } from "@apollo/client"
import { useAppSelector } from "../../store"
import { ADD_TASK, GET_TASKS_AND_AVAILABLE_USERS, UPDATE_TASK_STATUS } from "./gql"

export const useAddTask = (onCompleted?: (data: any) => void, onError?: (error: any) => void) => {
  return useMutation(ADD_TASK, {
    onCompleted: (data) => {
      onCompleted && onCompleted(data)
    },
    onError: (error) => {
      onError && onError(error)
    }
  })
}

export const useUpdateTaskStatus = (onCompleted?: (data: any) => void, onError?: (error: any) => void) => {
  return useMutation(UPDATE_TASK_STATUS, {
    onCompleted: (data) => {
      onCompleted && onCompleted(data)
    },
    onError: (error) => {
      onError && onError(error)
    }
  })
}

export const useGetTaskAndEditableUsers = (onCompleted?: (data: any) => void, onError?: (error: any) => void) => {
  const rowsPerPage = useAppSelector(state => state.task.tasks.tableInfo.rowsPerPage)

  return useQuery(GET_TASKS_AND_AVAILABLE_USERS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      startCursor: 0,
      count: rowsPerPage
    },
    onCompleted: (data) => {
      onCompleted && onCompleted(data)
    },
    onError: (error) => {
      onError && onError(error)
    }
  })
}
