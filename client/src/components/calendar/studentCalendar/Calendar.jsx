import React, { useState} from "react";
import { ToastContainer } from "react-toastify";
import DateCard from "../../dateCard/DateCard";
import "./Calendar.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import DaysCard from "../../daysCard/DaysCard"


const Calendar = () => {
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  function getDay(K, M, D, C) {
    console.log(M, D);
    let twelve = 12;
    if (Number(M) === 1 || Number(M) === 2) {
      M = Number(M) + Number(twelve);
      D = D - 1;
    }
    let first = Math.floor(2.6 * M - 5.39);
    let second = Math.floor(D / 4);
    let third = Math.floor(C / 4);
    let daynumber = first + second + third + K + D - 2 * C;
    while (daynumber < 0) {
      daynumber += 7;
    }
    daynumber = daynumber % 7;
    if (daynumber === 0) {
      return 7;
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
  let particular_day = getDay(1, selectMonth, selectYear % 100, 20);
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

  const months = [
    { no: 1, name: "January" },
    { no: 2, name: "February" },
    { no: 3, name: "March" },
    { no: 4, name: "April" },
    { no: 5, name: "May" },
    { no: 6, name: "June" },
    { no: 7, name: "July" },
    { no: 8, name: "August" },
    { no: 9, name: "September" },
    { no: 10, name: "October" },
    { no: 11, name: "November" },
    { no: 12, name: "December" },
  ];

  const years=[];
  for(let i=2020;i<=2030;i++){
    years.push(i)
  }
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
              {months.map((month)=>{
                return(
                  <option value={month.no}>{month.name}</option>
                )
              })}
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
              {years.map((y)=>{
                return(
                  <option value={y}>{y}</option>
                )
              })}
              
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
            return <DateCard month={selectMonth} date={e} isStudent={true} />;
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