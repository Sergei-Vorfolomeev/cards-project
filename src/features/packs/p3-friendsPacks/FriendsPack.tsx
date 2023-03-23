import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './FriendsPack.module.css'
import { getPacksTC } from 'features/packs/packsReducer'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { useAppDispatch } from 'app/store'
import { FriendsPackTable } from 'features/packs/p3-friendsPacks/friendsPackTable/FriendsPackTable'
import { getCardsTC } from 'features/packs/cardsReducer'
import { PacksInput } from 'features/packs/p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import useDebouncedEffect from 'use-debounced-effect'
import { SuperPagination } from 'features/packs/p5-commonComponents/commonPackComponents/pagination/SuperPagination'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import { LocalLoader } from 'features/packs/p5-commonComponents/usefullComponents/localLoader/LocalLoader'
import {
  getButtonDisableSelector,
  getCardPageCountSelector,
  getCardPageSelector,
  getCardTotalCountSelector,
  getMaxCardsCountSelector,
  getMinCardsCountSelector,
  getCardsDataSelector,
} from 'features/packs/selectors/packsSelectors'
import { useSelector } from 'react-redux'
import { getLoadingSelector } from 'app/appSelectors'
import { PATH } from 'common/components/routes/RoutesComponent'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const tableData = useSelector(getCardsDataSelector)
  const isLoading = useSelector(getLoadingSelector)
  const page = useSelector(getCardPageSelector)
  const pageCount = useSelector(getCardPageCountSelector)
  const totalCount = useSelector(getCardTotalCountSelector)
  const min = useSelector(getMinCardsCountSelector)
  const max = useSelector(getMaxCardsCountSelector)
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)

  const [inputValue, setInputValue] = useState<string>('')

  const navigate = useNavigate()
  let { packId,packName } = useParams()

  const inputOnChaneHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value)

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(getPacksTC({ page: newPage, pageCount: newCount, packName: inputValue, min, max }))
  }

  const learnOnClickButtonHandler = () => {
    navigate(`/learn/${packId}/${packName}`)
  }



  useEffect(() => {
    packId && dispatch(getCardsTC({ cardsPack_id: packId }))
  }, [packId])

  useDebouncedEffect(
    () => {
      dispatch(getCardsTC({ cardQuestion: inputValue, cardsPack_id: packId }))
    },
    800,
    [inputValue]
  )

  return (
    <div className={s.friendsPack}>
      <div className={s.friendsPack_container}>
        <BackToPackLists />
        <div className={s.friendsPack_titleAndButton}>
          <PacksTitle title={`Friend’s Pack: ${packName}`} />
          <PackButton
            disable={buttonDisableBecauseProcess}
            name={'Learn to pack'}
            onClick={learnOnClickButtonHandler}
          />
        </div>
        <PacksInput
          id={'friendsPackInput'}
          text={'Search'}
          type={'text'}
          value={inputValue}
          width={'98%'}
          onChange={inputOnChaneHandler}
        />
        {isLoading ? (
          <LocalLoader />
        ) : tableData.length === 0 ? (
          <div className={s.friendsPack_noCardsWasFound}>NO PACKS WERE FOUND. TRY AGAIN ;)</div>
        ) : (
          <div className={s.friendsPack_table}>
            <FriendsPackTable cardsData={tableData} />
          </div>
        )}
        <div className={s.friendsPack_pagintion}>
          <SuperPagination
            page={page}
            itemsCountForPage={pageCount}
            totalCount={totalCount}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </div>
  )
}
