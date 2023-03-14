import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useAppDispatch } from '../../../../../../app/store'
import { setAllPacksSortedTC } from '../../../../packsReducer'

export const TableForPacks = ({ packsData }: PropsType) => {
  const dispatch = useAppDispatch()

  const [orderBy, setOrderBy] = useState<string>('')
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')
  const columnsData = ['Name', 'Cards', 'Last updated', 'Created By', 'Actions']

  const setSortDirectionHandler = () => {
    direction === 'asc' ? setDirection('desc') : setDirection('asc')
  }

  const createData = (name: string, cards: number, lastUpdated: string, createdBy: string) => {
    return { name, cards, lastUpdated, createdBy }
  }

  const setSortedData = (sortBy: string) => {
    let sortedPacks = [...packsData].sort((a, b) => {
      if (sortBy === 'Name') {
        if (direction === 'desc') {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        } else {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        }
      } else if (sortBy === 'Cards') {
        if (direction === 'desc') {
          return a.cardsCount - b.cardsCount
        } else {
          return b.cardsCount - a.cardsCount
        }
      } else if (sortBy === 'Last updated') {
        if (direction === 'desc') {
          return new Date(a.updated).getTime() - new Date(b.updated).getTime()
        } else {
          return new Date(b.updated).getTime() - new Date(a.updated).getTime()
        }
      } else if (sortBy === 'Created By') {
        if (direction === 'desc') {
          return new Date(a.created).getTime() - new Date(b.created).getTime()
        } else {
          return new Date(b.created).getTime() - new Date(a.created).getTime()
        }
      }
      return a.name.localeCompare(b.name)
    })
    dispatch(setAllPacksSortedTC(sortedPacks))
  }

  const rows = packsData.map(pack =>
    createData(pack.name, pack.cardsCount, pack.created, pack.updated)
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', paddingLeft: '36px' }} aria-label="simple table">
        <TableHead sx={{ background: '#EFEFEF' }}>
          <TableRow>
            {columnsData.map((columnData, index) => (
              <TableCell
                sx={{ fontWeight: '700', cursor: 'pointer' }}
                align="center"
                key={index}
                onClick={() => {
                  setOrderBy(columnData)
                }}
              >
                <TableSortLabel
                  active={orderBy === columnData}
                  direction={direction}
                  sx={
                    columnData === 'Actions' ? { visibility: 'hidden' } : { visibility: 'visible' }
                  }
                  onClick={() => {
                    orderBy === columnData && setSortDirectionHandler()
                    setSortedData(columnData)
                  }}
                />
                {columnData}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.createdBy}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.cards}</TableCell>
              <TableCell align="center">
                {new Date(row.createdBy).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell align="center">
                {new Date(row.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell align="center">HI</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// types

type packsData = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

type PropsType = {
  packsData: packsData[]
}
