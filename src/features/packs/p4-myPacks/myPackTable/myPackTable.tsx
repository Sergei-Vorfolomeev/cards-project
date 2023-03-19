import React from 'react'
import { useAppDispatch } from 'app/store'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableBody from '@mui/material/TableBody'
import Star from 'common/assets/pictures/Star 5.svg'
import { ActionsWithCards } from 'features/packs/p4-myPacks/actionsWithCards/ActionsWithCards'
import { getSortDownPacksTC, getSortUpPacksTC } from 'features/packs/packsReducer'
import {
  getPackPageCountSelector,
  getPackPageSelector,
  getSorDirectionSelector,
} from 'features/packs/selectors/packsSelectors'
import { useSelector } from 'react-redux'

type PropsType = {
  cardsData: cardData[]
}

export const MyPackTable = ({ cardsData }: PropsType) => {
  const sortDirection = useSelector(getSorDirectionSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)

  const dispatch = useAppDispatch()

  const columnsData = ['Question', 'Answer', 'Last updated', 'Grade', '']

  const setSortDirectionHandler = () => {
    sortDirection === 'up'
      ? dispatch(
          getSortDownPacksTC({
            sortPacks: '0updated',
            page,
            pageCount,
          })
        )
      : dispatch(
          getSortUpPacksTC({
            sortPacks: '0updated',
            page,
            pageCount,
          })
        )
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
                <img src={Star} alt={'star'} />
                <img src={Star} alt={'star'} />
                <img src={Star} alt={'star'} />
                <img src={Star} alt={'star'} />
                <img src={Star} alt={'star'} />
              </TableCell>
              <TableCell align="center">
                <ActionsWithCards cardId={row.cardId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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