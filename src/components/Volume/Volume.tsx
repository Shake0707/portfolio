import { useState } from "react";
import classes from "./style.module.css";
import Item from "./Item";

interface IItem {
  hMaxValue: number;
  yMinValue: number;
  dur: number;
}

const list: IItem[] = [
  { hMaxValue: 7, yMinValue: 4, dur: 2 },
  { hMaxValue: 9, yMinValue: 3, dur: 1.7 },
  { hMaxValue: 7, yMinValue: 4, dur: 2 },
  { hMaxValue: 9, yMinValue: 3, dur: 1.7 },
  { hMaxValue: 9, yMinValue: 3, dur: 1.9 },
]

export default function Volume() {
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleClick() {
    setIsActive(prev => !prev);
  }

  return (
    <div className={isActive ? classes.frame + " " + classes.active : classes.frame} onClick={handleClick}>
      <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        {list.map((item, i) => (
          <Item hMaxValue={item.hMaxValue} dur={item.dur} isActive={isActive} yMinValue={item.yMinValue} key={i} index={i} />
        ))}
      </svg>
    </div>
  )
}
