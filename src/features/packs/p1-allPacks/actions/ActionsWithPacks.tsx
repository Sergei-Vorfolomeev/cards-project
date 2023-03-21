import React, {useState} from 'react'
import s from './ActionsWithPacks.module.css'
import addPack from 'common/assets/pictures/addPack.svg'
import changePack from 'common/assets/pictures/changePack.svg'
import deletePack from 'common/assets/pictures/deletePack.svg'
import {useAppDispatch} from 'app/store'
import {deletePackTC, updatePackTC} from 'features/packs/packsReducer'
import {Navigate, useNavigate} from "react-router-dom";

type PropsType = {
    isVisible: boolean
    packId: string
    userId: string
    packName: string
    cardsNumber: number
}

export const ActionsWithPacks = ({isVisible, packId, userId, packName, cardsNumber}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled] = useState(false)

    const PacksTypeLocalStorage = localStorage.getItem('PackType')
        ? localStorage.getItem('PackType')
        : 'AllPacks'
    const isMyPacks = PacksTypeLocalStorage !== 'AllPacks'


    const deleteOnClickHandler = () => {
        setIsDisabled(true)
        if (!isMyPacks) {
            dispatch(deletePackTC(packId))
        } else {
            dispatch(deletePackTC(packId, userId))
        }
    }

    const updateOnClickHandler = () => {
        if (!isMyPacks) {
            dispatch(updatePackTC(packId))
        } else {
            dispatch(updatePackTC(packId, userId))
        }
    }

    const learnOnClickHandler = () => {
        navigate(`/learn/${packId}/${packName}`)
    }

    if (!isVisible) {
        return (
            <div className={s.actionsWithPacks}>
                <button disabled={cardsNumber === 0}
                        style={cardsNumber !== 0 ? {
                            backgroundImage: `url(${addPack})`,
                            cursor: 'pointer'
                        } : {backgroundImage: `url(${addPack})`, cursor: 'pointer', opacity: 0.5}}
                        onClick={learnOnClickHandler}></button>
            </div>
        )
    }

    return (
        <div className={s.actionsWithPacks}>
            <button
                style={cardsNumber !== 0 ? {
                    backgroundImage: `url(${addPack})`,
                    cursor: 'pointer'
                } : {backgroundImage: `url(${addPack})`, cursor: 'pointer', opacity: 0.5}}
                onClick={learnOnClickHandler}
                disabled={cardsNumber === 0}
            >
            </button>
            <button
                style={{backgroundImage: `url(${changePack})`, cursor: 'pointer'}}
                onClick={updateOnClickHandler}
            ></button>
            <button
                style={
                    !isDisabled
                        ? {backgroundImage: `url(${deletePack})`, cursor: 'pointer'}
                        : {
                            backgroundImage: `url(${deletePack})`,
                            opacity: 0.5,
                            cursor: 'pointer'
                        }
                }
                onClick={deleteOnClickHandler}
                disabled={isDisabled}
            ></button>
        </div>
    )
}
