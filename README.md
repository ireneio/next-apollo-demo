## 指令
開發環境
```
yarn dev
```

## App 介紹
- 資料皆為本地 mock 資料
- 專案參考範例連結建置 https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server-and-client
- 右上角可切換用戶, 使用預先準備好的 token 來模擬 auth 效果 (重新取得用戶資訊及 Task 資料)
- 用戶分級:
```
UserRole {
  employee = 'employee', // 員工
  manager = 'manager', // 主管
  user = 'user' // 普通用戶
}
```
- 員工可新增 Task 及指定可編輯 Task 狀態的普通用戶
- 主管可查看員工所有 Task
- 普通用戶可編輯自己所屬的 Task 狀態

## Schema
```
type Query {
    // 普通用戶
    usersAvailable: [User]
    // 用戶個人資訊
    userInfo: User!
    // Tasks
    tasks(startCursor: Int, count: Int): Tasks
  }
  type Mutation {
    // 新增 Task
    addTask(content: String!, editableBy: [String]): Task
    // 更新 Task 狀態
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
```