import { TaskStatus } from "../../modules/task/types"

interface User {
  id: string
  name: string
}

interface Task {
  id: string
  content: string
  createdBy: Partial<User>
  editableBy: User[]
  status: TaskStatus
}

interface PageInfo {
  startCursor: number
  endCursor: number
  hasNextPage: boolean
  totalCount: number
}

interface TableInfo {
  rowsPerPage: number
}

interface Tasks {
  items: Task[],
    pageInfo: PageInfo
    tableInfo: TableInfo
}

interface TaskState {
  tasks: Tasks,
  users: User[]
}

const initialState: TaskState = {
  tasks: {
    items: [],
    pageInfo: {
      startCursor: 0,
      endCursor: 0,
      hasNextPage: false,
      totalCount: 0
    },
    tableInfo: {
      rowsPerPage: 5
    }
  },
  users: []
}

type Action = {
  type: 'PREPEND_TASK',
  payload: Task
} | {
  type: 'SET_TASKS',
  payload: { pageInfo: PageInfo, items: Task[] }
} | {
  type: 'SET_AVAILABLE_USERS',
  payload: User[]
} | {
  type: 'SET_ROWS_PER_PAGE',
  payload: number
} | {
  type: 'SET_TASK_STATUS',
  payload: { status: TaskStatus, id: string }
}

export default function taskReducer(state: TaskState = initialState, action: Action) {
  switch (action.type) {
    case 'PREPEND_TASK':
      return {
      	...state,
        tasks: {
          ...state.tasks,
          items: [action.payload, ...state.tasks.items.slice(0, state.tasks.items.length - 1)],
        }
      }
    case 'SET_TASKS':
      const { items, pageInfo } = action.payload
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items,
          pageInfo
        }
      }
    case 'SET_AVAILABLE_USERS':
      return {
        ...state,
        users: [...action.payload]
      }
    case 'SET_ROWS_PER_PAGE':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          tableInfo: {
            rowsPerPage: action.payload
          }
        }
      }
    case 'SET_TASK_STATUS':
      const { id, status } = action.payload
      const _items = state.tasks.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status
          }
        }
        return item
      })
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: _items
        }
      }
    default:
      return state
  }
}
