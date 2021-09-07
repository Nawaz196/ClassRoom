import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import DateCard from "../../dateCard/DateCard";
import "./Calendar.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import DaysCard from "../../daysCard/DaysCard";
import axios from "axios";
import { UserContext } from "../../../App";

const Calendar = () => {
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [dataLectures, setDataLectures] = useState([]);
  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);
  const [timeTable, setTimeTable] = useState(null);

  const userId = JSON.parse(localStorage.getItem("suser"))._id;

  useEffect(() => {
    const getLectures = async () => {
      try {
        const res = await axios.post("/api/getlectures", {
          studentId: userId,
        });
        //console.log(res);
        setDataLectures(res.data);

        res.data.map((item) => {
          const subjectName = item.subjectId.subjectName;
          const teacherName = item.teacherId.name;

          item.lectures.map((doc) => {
            const presentDay = doc.day;
            const lect = {
              day: presentDay,
              subjectName: subjectName,
              teacherName: teacherName,
              startTime: doc.startTime,
              endTime: doc.endTime,
            };
            //console.log(lect);

            switch (presentDay) {
              case "Monday":
                setMon([...mon, lect]);
                break;
              case "Tuesday":
                setTue([...tue, lect]);
                break;
              case "Wednesday":
                setWed([...wed, lect]);
                break;
              case "Thursday":
                setThu([...thu, lect]);
                break;
              case "Friday":
                setFri([...fri, lect]);
                break;
              case "Saturday":
                setSat([...sat, lect]);
                break;
            }
          });
        });
      } catch (err) {
        console.log(err);
      }

      console.log(thu);

      const lavde = {
        Monday: mon,
        Tuesday: tue,
        Wednesday: wed,
        Thursday: thu,
        Friday: fri,
        Saturday: sat,
      };
      //console.log(lavde);
      setTimeTable(lavde);
    };
    getLectures();
  }, []);

  console.log(timeTable);

  function getDay(K, M, D, C) {
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

  const years = [];
  for (let i = 2020; i <= 2030; i++) {
    years.push(i);
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
            {months.map((month) => {
              return <option value={month.no}>{month.name}</option>;
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
            {years.map((y) => {
              return <option value={y}>{y}</option>;
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
