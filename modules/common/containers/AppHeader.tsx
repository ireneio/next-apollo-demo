import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../store"
import Dropdown, { DropdownMenuList } from "../components/Dropdown"
import { users } from "../constants"

// 用準備好的 tokens 建立用戶 dropdown
const credentials: DropdownMenuList<string>[] = Object.entries(users).map(([key, value]) => ({ label: key, value }))

const AppHeader = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const handleChangeUser = async ({ value }: { value: string }) => {
    dispatch({ type: 'SET_TOKEN', payload: value })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task 查詢
          </Typography>
          <Dropdown list={credentials} onSelect={handleChangeUser} selected={{ label: user.name, value: user.token }} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AppHeader
