import React from 'react';
import {ReactComponent as Star} from 'common/assets/pictures/Star 5.svg';

type PropsType = {
    grade: number
}

const StarIcon = ({grade}: PropsType) => {

    let color = Math.floor(grade)

    return (
        <div>
            {color >= 1 ? <Star fill="yellow"/> : <Star fill="#DADADA"/>}
            {color >= 2 ? <Star fill="yellow"/> : <Star fill="#DADADA"/>}
            {color >= 3 ? <Star fill="yellow"/> : <Star fill="#DADADA"/>}
            {color >= 4 ? <Star fill="yellow"/> : <Star fill="#DADADA"/>}
            {color >= 5 ? <Star fill="yellow"/> : <Star fill="#DADADA"/>}
        </div>
    );
};

export default StarIcon;