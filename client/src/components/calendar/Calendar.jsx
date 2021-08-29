import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DateCard from "../dateCard/DateCard";
import "./Calendar.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import DaysCard from "./DaysCard";

const Calendar = () => {
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth()+1);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());


  function getDay( K, M, D, C) {
    console.log(M,D);
    let twelve=12
    if(Number(M)===1 || Number(M)===2){
      M=Number(M)+Number(twelve)
      D=D-1;
    }
    let first = Math.floor(2.6*M-5.39)
    let second = Math.floor(D/4)
    let third=Math.floor(C/4)
    let daynumber=first+second+third+K+D-(2*C)
      while (daynumber<0) {
        daynumber+=7;
      }
      daynumber=daynumber%7
      if(daynumber===0){
        return 7
      }
    return daynumber;

  }
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  let days = daysInMonth(selectMonth, 2021);

  let arr = [];
  for (let i = 0; i < days; i++) {
    arr.push(i + 1);
  }
  let particular_day = getDay(1, selectMonth, selectYear%100, 20);
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
    1: "JANUARY",
    2: "FEBRUARY",
    3: "MARCH",
    4: "APRIL",
    5: "MAY",
    6: "JUNE",
    7: "JULY",
    8: "AUGUST",
    9: "SEPTEMBER",
    10: "OCTOBER",
    11: "NOVEMBER",
    12: "DECEMBER",
  };

  return (
    <div className="calendarPage">

      <div
        style={{ width: "500px", display: "flex", justifyContent: "center" }}
      >
        <div>
          <BsChevronLeft
            className="calendarIcon"
            onClick={(e) => {
              selectMonth > 1
                ? setSelectMonth(selectMonth - 1)
                : setSelectMonth(1);
            }}
          />
          <select
            className="monthSelect"
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
          <BsChevronRight
            className="calendarIcon"
            onClick={(e) => {
              selectMonth < 12
                ? setSelectMonth(selectMonth + 1)
                : setSelectMonth(12);
            }}
          />
        </div>
        <div>
          <BsChevronLeft
            className="calendarIcon"
            onClick={(e) => {
              selectYear > 2021
                ? setSelectYear(selectYear - 1)
                : setSelectYear(2021);
            }}
          />
          <select
            className="monthSelect"
            value={selectYear}
            onChange={(e) => {
              setSelectYear(e.target.value);
            }}
          >
            <option value="">Choose Year</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
          <BsChevronRight
            className="calendarIcon"
            onClick={(e) => {
              selectYear < 2025
                ? setSelectYear(selectYear + 1)
                : setSelectYear(2025);
            }}
          />
        </div>
      </div>

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
          return <DateCard month={selectMonth} date={e} />;
        })}
      </div>
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  );
};

export default Calendar;
