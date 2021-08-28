import React, { useState } from "react";
import DateCard from "../dateCard/DateCard";
import "./Calendar.css";
import DaysCard from "./DaysCard";

const Calendar = () => {
  const [selectMonth, setSelectMonth] = useState();
  function getDay(K, M, D, C) {
    let daynumber =
      K +
      Math.floor((13 * M - 1) / 5) +
      D +
      Math.floor(D / 4) +
      Math.floor(C / 4) -
      2 * C;

    if (M === 11 || M === 12) {
      return (daynumber % 7) - 1;
    } else if (M === 1 || M === 2 || M === 3) {
      return daynumber + 7;
    } else if (M === 4 || M === 5) {
      return daynumber;
    } else if (M === 6 || M === 7 || M === 8) {
      return daynumber - 7;
    } else {
      return daynumber - 14;
    }
  }
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  let days = daysInMonth(selectMonth, 2021);
  //console.log(days);

  let arr = [];
  for (let i = 0; i < days; i++) {
    arr.push(i + 1);
  }
  let particular_day = getDay(
    1,
    selectMonth - 2 > 0 ? selectMonth - 2 : selectMonth - 2 === -1 ? 11 : 12,
    21,
    20
  );
  let array = [];
  for (let i = 0; i < particular_day - 1; i++) {
    array.push(i + 1);
  }
  const day = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const months = {
    1: "MARCH",
    2: "APRIL",
    3: "MAY",
    4: "JUNE",
    5: "JULY",
    6: "AUGUST",
    7: "SEPTEMBER",
    8: "OCTOBER",
    9: "NOVEMBER",
    10: "DECEMBER",
    11: "JANUARY",
    12: "FEBRUARY",
  };

  return (
    <div>
      <h1>The Student Calendar is here bitches!</h1>

      <select
        value={selectMonth}
        onChange={(e) => {
          setSelectMonth(e.target.value);
        }}
      >
        <option value="">Choose Month</option>
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>

      <div className="monthContainer">
        {day.map((e) => {
          return <DaysCard day={e} />;
        })}
      </div>

      <div className="monthContainer">
        {array.map((e) => {
          return <DateCard month="" date="" />;
        })}
        {arr.map((e) => {
          return (
            <DateCard
              month={
                months[
                  selectMonth - 2 > 0
                    ? selectMonth - 2
                    : selectMonth - 2 === -1
                    ? 11
                    : 12
                ]
              }
              date={e}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
