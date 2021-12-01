import { SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAppSelector } from '../../../store'
import MultipleSelect from '../../common/components/MultipleSelect'

const AvailableUserSelect = () => {
  const users = useAppSelector(state => state.task.users)
  const [value, setValue] = useState<string>('')
  const { setValue: setFormValue, getValues } = useFormContext()

  const handleSelectUsers = (e: SelectChangeEvent) => {
    const _value = e.target.value
    setValue(_value)
    setFormValue('editableBy', _value)
  }

  return (
    <MultipleSelect label='可編輯用戶' labelId='userSelect' value={getValues('editableBy')} onChange={handleSelectUsers}>
      {users.map((user) => {
        return (
          <MenuItem
            key={user.id}
            value={user.name}
          >
            {user.name}
          </MenuItem>
        )
      })}
    </MultipleSelect>
  )
}

export default AvailableUserSelect
