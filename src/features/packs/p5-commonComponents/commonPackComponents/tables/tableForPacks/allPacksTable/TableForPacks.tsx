import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useAppDispatch, useAppSelector} from "../../../../../../../app/store";
import {
    getSortDownPacksTC,
    getSortUpPacksTC,
} from "../../../../../packsReducer";
import { TableFooter, TablePagination} from "@mui/material";



export const TableForPacks = ({packsData}: PropsType) => {

    const dispatch = useAppDispatch()
    const currentPageNumber = useAppSelector(state => state.packs.page)
    const elementsOnPage = useAppSelector(state => state.packs.pageCount)
    const sortDirection = useAppSelector(state => state.packs.sortDirection)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)



    const columnsData = ['Name', 'Cards', 'Last updated', 'Created By', 'Actions']

    const setSortDirectionHandler = () => {
        sortDirection === 'up' ? dispatch(getSortDownPacksTC()) : dispatch(getSortUpPacksTC())
    }
    // const onChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    //     getPacksPaginationTC(value, elementsOnPage);
    // };

    const createData = (name: string, cards: number, lastUpdated: string, createdBy: string) => {
        return {name, cards, lastUpdated, createdBy}
    }

console.log(packsData)
    let rows = packsData.map(pack => createData(pack.name, pack.cardsCount, pack.created, pack.updated))

    return (
        <TableContainer component={Paper}>
            <Table sx={{width: '100%', paddingLeft: '36px'}} aria-label="simple table">
                <TableHead sx={{background: '#EFEFEF'}}>
                    <TableRow>
                        {columnsData.map((columnData, index) => (
                            <TableCell sx={{fontWeight: '700', cursor: 'pointer'}}
                                       align="center"
                                       key={index}
                                       >
                                <TableSortLabel
                                    active={columnData === 'Last updated'}
                                    direction={sortDirection === 'up' ?  "desc" : "asc" }
                                    sx={columnData === 'Last updated' ? {visibility: "visible"} : {visibility: "hidden"}}
                                    onClick={() => {
                                         setSortDirectionHandler();
                                    }}
                                />
                                {columnData}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.createdBy}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.cards}</TableCell>
                            <TableCell align="center">{new Date(row.createdBy).toLocaleString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}</TableCell>
                            <TableCell align="center">{new Date(row.lastUpdated).toLocaleString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}</TableCell>
                            <TableCell align="center">HI</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>

                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}


// types

type packsData = {
    _id: string
    user_id: string
    name: string
    cardsCount: number,
    created: string,
    updated: string,
}


type PropsType = {
    packsData: packsData[]
}

