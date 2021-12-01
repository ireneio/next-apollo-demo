import { TableCell } from "@mui/material"
import { useAppSelector } from "../../../store"
import { UserRole } from "../../auth/types"

const TaskTableHeaders = () => {
  const role = useAppSelector(state => state.user.role)

  switch (role) {
    case UserRole.manager:
      return (
        <>
          <TableCell>內容</TableCell>
          <TableCell>建立者</TableCell>
          <TableCell>狀態</TableCell>
          <TableCell>可編輯用戶</TableCell>
        </>
      )
    case UserRole.user:
      return (
        <>
          <TableCell>內容</TableCell>
          <TableCell>狀態</TableCell>
        </>
      )
    case UserRole.employee:
      return (
        <>
          <TableCell>內容</TableCell>
          <TableCell>狀態</TableCell>
          <TableCell>可編輯用戶</TableCell>
        </>
      )
    default:
      return <></>
  }
  
}

export default TaskTableHeaders
