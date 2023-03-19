import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './MyPack.module.css'
import { getPacksTC } from 'features/packs/packsReducer'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { useSelector } from 'react-redux'
import { getIsAuthSelector } from 'features/login/selectors/loginSelectors'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { MyPackTable } from 'features/packs/p4-myPacks/myPackTable/myPackTable'
import { useAppDispatch } from 'app/store'
import { addCardTC, getCardsTC } from 'features/packs/cardsReducer'
import { PacksInput } from 'features/packs/p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useDebouncedEffect from 'use-debounced-effect'
import { SuperPagination } from 'features/packs/p5-commonComponents/commonPackComponents/pagination/SuperPagination'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import { LocalLoader } from 'features/packs/p5-commonComponents/usefullComponents/localLoader/LocalLoader'
import { getErrorMessageSelector, getLoadingSelector } from 'app/appSelectors'
import {
  getButtonDisableSelector,
  getMaxCardsCountSelector,
  getMinCardsCountSelector,
  getPackPageCountSelector,
  getPackPageSelector,
  getPageTotalCountSelector,
  getCardsDataSelector,
} from 'features/packs/selectors/packsSelectors'
import { PATH } from 'common/components/routes/RoutesComponent'
import myPackMenu from 'common/assets/pictures/myPackMenu.svg'
import { Error } from 'common/components/error/Error'

export const MyPack = () => {
  const cardsData = useSelector(getCardsDataSelector)
  const isAuth = useSelector(getIsAuthSelector)
  const isLoading = useSelector(getLoadingSelector)
  const errorMessage = useSelector(getErrorMessageSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)
  const totalCount = useSelector(getPageTotalCountSelector)
  const minCardsCountValue = useSelector(getMinCardsCountSelector)
  const maxCardsCountValue = useSelector(getMaxCardsCountSelector)
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { packId, packName } = useParams()

  useEffect(() => {
    if (isAuth) {
      dispatch(getCardsTC({ cardsPack_id: packId }))
    } else {
      navigate(PATH.LOGIN)
    }
  }, [packId, isAuth])

  const [myPacksInput, setMyPacksInput] = useState('')

  const onChangeMyPacksInput = (e: ChangeEvent<HTMLInputElement>) =>
    setMyPacksInput(e.currentTarget.value)

  const addCardOnClickHandler = () => {
    packId && dispatch(addCardTC(packId))
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(
      getPacksTC({
        min: minCardsCountValue,
        max: maxCardsCountValue,
        page: newPage,
        pageCount: newCount,
        packName: myPacksInput,
      })
    )
  }

  useDebouncedEffect(
    () => {
      dispatch(getCardsTC({ cardsPack_id: packId, cardQuestion: myPacksInput }))
    },
    800,
    [myPacksInput]
  )

  return (
    <div className={s.myPacks}>
      <div className={s.myPacks_container}>
        <BackToPackLists />
        <div className={s.myPacks_titleAndButton}>
          <div className={s.myPacks_titleMenu}>
            <PacksTitle title={`My Pack:  ${packName!}`} />
            <img src={myPackMenu} alt={'myPackMenu'} />
          </div>
          <PackButton
            name={'Add new card'}
            onClick={addCardOnClickHandler}
            disable={buttonDisableBecauseProcess}
          />
        </div>
        <PacksInput
          id={'myPacksInput'}
          text={'Search'}
          type={'text'}
          value={myPacksInput}
          width={'98%'}
          onChange={onChangeMyPacksInput}
        />

        {isLoading ? (
          <LocalLoader />
        ) : cardsData.length !== 0 ? (
          <div className={s.myPacks_table}>
            <MyPackTable cardsData={cardsData} />
          </div>
        ) : myPacksInput.length !== 0 ? (
          <div className={s.myPacks_noPacksWasFound}>
            NO PACKS WERE FOUND. REVISE YOUR FILTERS ;)
          </div>
        ) : (
          <Navigate to={`/emptyPack/${packId}/${packName}`} />
        )}
        <div className={s.myPacks_pagination}>
          <SuperPagination
            page={page}
            itemsCountForPage={pageCount}
            totalCount={totalCount}
            onChange={onChangePagination}
          />
        </div>
      </div>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
