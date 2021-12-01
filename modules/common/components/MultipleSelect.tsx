import { FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"

interface Props {
  label: string
  labelId: string
  value: any
  onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void
  children: ReactNode
}

const MultipleSelect = ({ label, labelId, value, onChange, children }: Props) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
      >
        {children}
      </Select>
    </FormControl>
  )
}

export default MultipleSelect
