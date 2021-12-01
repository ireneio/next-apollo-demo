import { TablePagination } from "@mui/material"
import { BaseSyntheticEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import { useGetTaskAndEditableUsers } from "../services"

const rowsPerPageOptions = [5, 10, 15]

const TaskTablePagination = () => {
  const pageInfo = useAppSelector(state => state.task.tasks.pageInfo)
  const rowsPerPage = useAppSelector(state => state.task.tasks.tableInfo.rowsPerPage)
  const dispatch = useAppDispatch()
  const page = pageInfo.startCursor / rowsPerPage
  const { refetch } = useGetTaskAndEditableUsers((data) => {
    if (data?.tasks?.items && data?.tasks?.pageInfo) {
      dispatch({ type: 'SET_TASKS', payload: { items: data.tasks.items, pageInfo: data.tasks.pageInfo } })
    }
    if (data?.usersAvailable) {
      dispatch({ type: 'SET_AVAILABLE_USERS', payload: data.usersAvailable })
    }
  })

  const handleChangePage = async (e: BaseSyntheticEvent | null, page: number) => {
    await refetch({
      startCursor: rowsPerPage * page,
      count: rowsPerPage
    })
  }

  const handleChangeRowsPerPage = async (e: BaseSyntheticEvent) => {
    const _value = e.target.value
    dispatch({ type: 'SET_ROWS_PER_PAGE', payload: _value })
  }

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={pageInfo.totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default TaskTablePagination
