import React from "react";
import s from "./NumberOfCards.module.css";
import Slider from "@mui/joy/Slider";
import Box from "@mui/joy/Box";
import { getAllPacksTC } from "../../../packsReducer";


type PropsType = {
  value: number[]
  onChange: (newValue: number[]) => void
  setMinMaxCardsValue: (newValue: number[]) => void
  onChangeCardsFilter: (newValue:number[]) => void
}

export const NumberOfCards = ({ value, onChange, setMinMaxCardsValue,onChangeCardsFilter }: PropsType) => {

  const handleChangeCommited = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    onChangeCardsFilter(newValue as number[])
    setMinMaxCardsValue(newValue as number[]);
  };

  return (
    <div className={s.numberOfCards}>
      <h3>Number of cards</h3>
      <div className={s.numberOfCards_wrapper}>
        <div className={s.numberOfCards_minValue}>{value[0]}</div>
        <Box sx={{ width: 155 }}>
          <Slider
            // getAriaLabel={() => 'Number of cards'}
            value={value}
            // onChange={(e)=>onChange(e)}
            size={"md"}
            onChangeCommitted={handleChangeCommited}
          />
        </Box>
        <div className={s.numberOfCards_maxValue}>{value[1]}</div>
      </div>
    </div>
  );
};

