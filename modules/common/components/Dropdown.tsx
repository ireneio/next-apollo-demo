import { BaseSyntheticEvent, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import StatusButton from '../styled/StatusButton'

export interface DropdownMenuList<T = any> {
  label: string
  value: T
}

interface Props {
  list: DropdownMenuList[]
  onSelect: (list: DropdownMenuList) => void
  selected: DropdownMenuList
  variant?: string
  disabled?: boolean
}

export default function Dropdown({ list, onSelect, selected, variant, disabled = false }: Props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: BaseSyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSelect = ({ label, value }: DropdownMenuList) => {
    setAnchorEl(null)
    onSelect({ label, value })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <StatusButton
        onClick={handleClick}
        variant={variant || 'primary'}
        disabled={disabled}
      >
        {selected.label}
      </StatusButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {list.map((item) => {
          return <MenuItem key={item.value} onClick={() => handleSelect(item)}>{item.label}</MenuItem>
        })}
      </Menu>
    </div>
  );
}
