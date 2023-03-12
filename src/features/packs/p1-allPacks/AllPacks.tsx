import React from 'react';
import {PacksInput} from "../p5-commonComponents/packsInput/PacksInput";
import {BackToPackLists} from "../p5-commonComponents/backToPackLists/BackToPackLists";
import {PackButton} from "../p5-commonComponents/packButton/PackButton";
import {PacksTitle} from "../p5-commonComponents/packTitle/PacksTitle";

export const AllPacks = () => {
    return (
        <div>
            <BackToPackLists/>
            <PacksInput id={'fff'} text={'Search'} type={'text'} value={''} onChange={()=>{}} width={'40%'}/>
            <PackButton name={'Add new pack'} onClick={()=>{}}/>
            <PacksTitle title={'All packs'}/>
        </div>
    );
};

