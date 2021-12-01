import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import AppHeader from '../modules/common/containers/AppHeader'
import DefaultTable from '../modules/common/components/DefaultTable'
import TaskForm from '../modules/task/containers/TaskForm'
import TaskTablePagination from '../modules/task/containers/TaskTablePagination'
import { useGetTaskAndEditableUsers } from '../modules/task/services'
import TaskTableHeaders from '../modules/task/containers/TaskTableHeaders'
import TaskTableRows from '../modules/task/containers/TaskTableRows'
import { useAppDispatch, useAppSelector } from '../store'
import { useLazyGetUserInfo } from '../modules/auth/services'
import { UserRole } from '../modules/auth/types'

export default function Index() {
  const token = useAppSelector(state => state.user.token)
  const role = useAppSelector(state => state.user.role)
  const dispatch = useAppDispatch()
  const { refetch } = useGetTaskAndEditableUsers((data) => {
    if (data?.tasks?.items && data?.tasks?.pageInfo) {
      dispatch({ type: 'SET_TASKS', payload: { items: data.tasks.items, pageInfo: data.tasks.pageInfo } })
    }
    if (data?.usersAvailable) {
      dispatch({ type: 'SET_AVAILABLE_USERS', payload: data.usersAvailable })
    }
  })
  const [getUserInfo] = useLazyGetUserInfo((data) => {
    if (data?.userInfo) {
      dispatch({ type: 'SET_USER', payload: data.userInfo })
      refetch({
        startCursor: 0
      })
    }
  })

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      content: '',
      editableBy: []
    }
  })

  // 當 token 修改時, 重新撈用戶資料
  useEffect(() => {
    getUserInfo()
  }, [token])

  return (
    <FormProvider {...formMethods}>
      <AppHeader />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          {role === UserRole.employee && <TaskForm /> }
          <Paper>
            <DefaultTable
              headers={<TaskTableHeaders />}
              rows={<TaskTableRows />}
            />
            <TaskTablePagination />
          </Paper>
        </Box>
      </Container>
    </FormProvider>
  )
}
