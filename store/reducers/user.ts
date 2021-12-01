import { UserRole } from "../../modules/auth/types"

interface UserState {
  token: string
  name: string
  id: string
  role: UserRole
}

const initialState: UserState = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZW1wbG95ZWUxIiwiaWQiOjEsInJvbGUiOiJlbXBsb3llZSJ9.4dqIZl-jYMmMrXJb-51M5gv2ouuWNRJXbPd1rd0bAhw',
  name: 'employee1',
  id: '1',
  role: UserRole.employee
}

type Action = {
  type: 'SET_USER',
  payload: { name: string, id: string, role: UserRole }
} | {
  type: 'SET_TOKEN',
  payload: string
}

export default function userReducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case 'SET_USER':
      return {
      	...state,
        ...action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}
