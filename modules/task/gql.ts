import { gql } from 'graphql-tag'

export const GET_TASKS_AND_AVAILABLE_USERS = gql(`
  query getTasksAndAvailableUsers($startCursor: Int, $count: Int) {
    tasks(startCursor: $startCursor, count: $count) {
      items {
        id
        status
        content
        createdBy {
          name
        }
        editableBy {
          name
          id
        }
      }
      pageInfo {
        startCursor
        endCursor
        totalCount
        hasNextPage
      }
    }
    usersAvailable {
      name
      id
    }
  }
`)

export const ADD_TASK = gql(`
  mutation addTask($content: String!, $editableBy: [ID]) {
    addTask(content: $content, editableBy: $editableBy) {
      id
      content
      editableBy {
        name
      }
      createdBy {
        name
      }
      status
    }
  }
`)

export const UPDATE_TASK_STATUS = gql(`
  mutation updateTaskStatus($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      content
      editableBy {
        name
      }
      createdBy {
        name
      }
      status
    }
  }
`)
