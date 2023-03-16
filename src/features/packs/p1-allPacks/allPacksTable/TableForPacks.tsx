import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getSortDownPacksTC, getSortUpPacksTC } from '../../packsReducer'
import { TableFooter, TablePagination } from '@mui/material'
import { ActionsWithPacks } from '../actions/ActionsWithPacks'
import { NavLink, useNavigate } from 'react-router-dom'
import s from '../AllPacks.module.css'
import { PATH } from '../../../../common/components/routes/RoutesComponent'

export const TableForPacks = ({ packsData }: PropsType) => {
  const dispatch = useAppDispatch()
  const sortDirection = useAppSelector(state => state.packs.sortDirection)
  const userId = useAppSelector(state => state.auth._id)

  const columnsData = ['Name', 'Cards', 'Last updated', 'Created By', 'Actions']

  const setSortDirectionHandler = () => {
    sortDirection === 'up' ? dispatch(getSortDownPacksTC()) : dispatch(getSortUpPacksTC())
  }

  const createData = (
    name: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    userId: string,
    packId: string
  ) => {
    return { name, cards, lastUpdated, createdBy, userId, packId }
  }

  let rows = packsData.map(pack =>
    createData(pack.name, pack.cardsCount, pack.created, pack.updated, pack.user_id, pack._id)
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', paddingLeft: '36px' }} aria-label="simple table">
        <TableHead sx={{ background: '#EFEFEF' }}>
          <TableRow>
            {columnsData.map((columnData, index) => (
              <TableCell sx={{ fontWeight: '700', cursor: 'pointer' }} align="center" key={index}>
                <TableSortLabel
                  active={columnData === 'Last updated'}
                  direction={sortDirection === 'up' ? 'desc' : 'asc'}
                  sx={
                    columnData === 'Last updated'
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                  onClick={() => {
                    setSortDirectionHandler()
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
              <TableCell sx={{ cursor: 'pointer' }} align="center">
                {row.userId === userId ? (
                  <NavLink className={s.allPacks_link} to={`/myPack/${row.packId}`}>
                    {row.name}{' '}
                  </NavLink>
                ) : (
                  <NavLink className={s.allPacks_link} to={`/friendsPack/${row.packId}`}>
                    {row.name}{' '}
                  </NavLink>
                )}
              </TableCell>
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
              <TableCell align="center">
                <ActionsWithPacks
                  cardsQuantity={row.cards}
                  isVisible={row.userId === userId}
                  packId={row.packId}
                  userId={userId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
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
