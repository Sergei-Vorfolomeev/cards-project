import React, {ChangeEvent} from 'react'

import s from './SuperPagination.module.css'
import { Pagination } from "@mui/material";
import { SuperSelect } from "./SuperSelect";

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const SuperPagination: React.FC<SuperPaginationPropsType> = (
  {
    page, itemsCountForPage, totalCount, onChange, id = 'new',
  }
) => {
  const lastPage = Math.ceil(totalCount/itemsCountForPage) // пишет студент // вычислить количество страниц

  const onChangeCallback = (event: any, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event:  ChangeEvent<HTMLSelectElement>) => {
    onChange(page, +event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-packPagination'}
        sx={{
          // стили для Pagination // пишет студент
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />

      <span className={s.text1}>
                Show
            </span>

      <SuperSelect
        id={id + '-packPagination-select'}
        value={itemsCountForPage}
        options={[
          {id: 4, value: '4'},
          {id: 7, value: '7'},
          {id: 10, value: '10'},
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>
                Cards per Page
            </span>
    </div>
  )
}
