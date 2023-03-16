import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getSortDownPacksTC, getSortUpPacksTC } from '../../packsReducer'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableBody from '@mui/material/TableBody'
import { TableFooter } from '@mui/material'
import Star from '../../../../common/assets/pictures/Star 5.svg'
import { ActionsWithCards } from '../actionsWithCards/ActionsWithCards'

type PropsType = {
  cardsData: cardData[]
  minMaxCardsValue: number[]
}

export const MyPackTable = ({ cardsData,minMaxCardsValue }: PropsType) => {
  const dispatch = useAppDispatch()
  const sortDirection = useAppSelector(state => state.packs.sortDirection)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  const columnsData = ['Question', 'Answer', 'Last updated', 'Grade', '']

  const setSortDirectionHandler = () => {
    sortDirection === 'up' ? dispatch(getSortDownPacksTC(
        {
          sortPacks: '0updated',
          min: minMaxCardsValue[0],
          max: minMaxCardsValue[1],
          page,
          pageCount,
        }
    )) : dispatch(getSortUpPacksTC(
        {
          sortPacks: '0updated',
          min: minMaxCardsValue[0],
          max: minMaxCardsValue[1],
          page,
          pageCount,
        }
    ))
  }

  const createData = (
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
    id: string,
    cardId: string
  ) => {
    return { question, answer, lastUpdated, grade, id, cardId }
  }

  let rows = cardsData.map(pack =>
    createData(pack.question, pack.answer, pack.updated, pack.grade, pack.cardsPack_id, pack._id)
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
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{row.question}</TableCell>
              <TableCell align="center">{row.answer}</TableCell>
              <TableCell align="center">
                {new Date(row.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell align="center">
                <img src={Star} />
                <img src={Star} />
                <img src={Star} />
                <img src={Star} />
                <img src={Star} />
              </TableCell>
              <TableCell align="center">
                <ActionsWithCards cardId={row.cardId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/*<Pagination count={elementsOnPage} page={currentPageNumber} onChange={onChangePagination}/>*/}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

type cardData = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
