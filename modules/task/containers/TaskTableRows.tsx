import { Chip, TableCell, TableRow } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../store"
import { UserRole } from "../../auth/types"
import Dropdown, { DropdownMenuList } from "../../common/components/Dropdown"
import { DROPDOWN_TYPES } from "../../common/constants"
import { useUpdateTaskStatus } from "../services"
import { TaskStatus } from "../types"

const TaskTableRows = () => {
  const tasksList = useAppSelector(state => state.task.tasks.items)
  const role = useAppSelector(state => state.user.role)
  const [updateTaskStatus] = useUpdateTaskStatus()
  const dispatch = useAppDispatch()
  const handleSelectStatus = async ({ value, id }: { value: TaskStatus, id: string }) => {
    const status = value
    await updateTaskStatus({
      variables: {
        id,
        status
      },
      onCompleted: (data) => {
        if (data?.updateTaskStatus) {
          dispatch({ type: 'SET_TASK_STATUS', payload: { id, status } })
        }
      }
    })
  }

  return (
    <>
      {tasksList.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            <>{row.content}</>
          </TableCell>
            {role === UserRole.manager &&
              <TableCell>
                <>{row.createdBy.name}</>
              </TableCell>
            }
          <TableCell>
            <Dropdown
              variant='outlined'
              list={DROPDOWN_TYPES}
              onSelect={({ value }: DropdownMenuList<TaskStatus>) => handleSelectStatus({ value, id: row.id })}
              // list 不變
              selected={DROPDOWN_TYPES.find(item => item.value === row.status) as DropdownMenuList}
              disabled={role === UserRole.employee}
            />
          </TableCell>
          {role !== UserRole.user &&
            <TableCell>
              {row.editableBy.length > 0 ? row.editableBy.map((user) => {
                return <Chip label={user.name} sx={{ mr: 1 }} key={user.id} />
              }) : '-'}
            </TableCell>
          }
        </TableRow>
      ))}
    </>
  )
}

export default TaskTableRows
