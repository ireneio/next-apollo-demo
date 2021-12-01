import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Query {
    usersAvailable: [User]
    userInfo: User!
    tasks(startCursor: Int, count: Int): Tasks
  }
  type Mutation {
    addTask(content: String!, editableBy: [ID]): Task
    updateTaskStatus(id: ID!, status: TaskStatus!): Task
  }
  type PageInfo {
    startCursor: String!
    endCursor: String!
    totalCount: Int!
    hasNextPage: Boolean!
  }
  type Tasks {
    items: [Task]!
    pageInfo: PageInfo
  }
  type Task {
    id: ID!
    status: TaskStatus!
    content: String!
    createdBy: User!
    editableBy: [User]
  }
  type User {
    name: String!
    id: ID!
    role: UserRole!
  }
  enum UserRole {
    manager
    employee
    user
  }
  enum TaskStatus {
    done
    inProgress
    start
  }
`
