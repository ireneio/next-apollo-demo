import { TaskStatus } from "../task/types"
import { DropdownMenuList } from "./components/Dropdown"

export const DROPDOWN_TYPES: DropdownMenuList<TaskStatus>[] = [
  { label: '開始', value: TaskStatus.start },
  { label: '進行中', value: TaskStatus.inProgress },
  { label: '完成', value: TaskStatus.done }
]

// 各用戶的 token, 切換用戶時使用
export const users = {
  employee1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZW1wbG95ZWUxIiwiaWQiOjEsInJvbGUiOiJlbXBsb3llZSJ9.4dqIZl-jYMmMrXJb-51M5gv2ouuWNRJXbPd1rd0bAhw',
  employee2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZW1wbG95ZWUyIiwiaWQiOiI1Iiwicm9sZSI6ImVtcGxveWVlIn0.F50jo1IC155VckS1oFXBQoII9QDNI5-lavyNs46zvKs',
  manager1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFuYWdlcjEiLCJpZCI6IjIiLCJyb2xlIjoibWFuYWdlciJ9.O7x0d7yOWaYycKD-8H8z2I6rdKk4Y1s56uPlGWGD1A4',
  user1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJpZCI6IjMiLCJyb2xlIjoidXNlciJ9.rzov39ddG1UOhKyFK4S2Gvmi99hl63Hoyl0OS-4hJ_U',
  user2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6IjQiLCJyb2xlIjoidXNlciJ9.606gUBLYM2aZ-1vC6VS6V6e3B7VEvRSqq2bcbUAYRqU'
}
