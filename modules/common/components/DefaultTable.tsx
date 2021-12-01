import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { ReactNode } from "react"

interface Props {
  rows: ReactNode
  headers: ReactNode
}

const DefaultTable = ({ rows, headers }: Props) => {
  return (
    <TableContainer sx={{ my: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DefaultTable
