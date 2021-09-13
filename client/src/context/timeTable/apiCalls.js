// import {
//   getTimeTableStart,
//   getTimeTableSuccess,
//   getTimeTableFailure,
// } from "./timeTableActions";
// import axios from "axios";

// const userId = JSON.parse(localStorage.getItem("suser"))._id;

// //get Timetable
// export const getTimeTable = async (dispatch) => {
//     dispatch(getTimeTableStart());
//     try {
//         const res = await axios.post("/api/getlectures", {
//             studentId: userId,
//             requiredDay: "Tuesday" 
//         });
//         dispatch(getTimeTableSuccess(res.data));
//     } catch(err) {
//        dispatch(getTimeTableFailure());
//     }
// }