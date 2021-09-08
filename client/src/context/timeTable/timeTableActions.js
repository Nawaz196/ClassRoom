export const getTimeTableStart = () => ({
    type: "GET_TIMETABLE_START",
})

export const getTimeTableSuccess = (timetable) => ({
    type: "GET_TIMETABLE_SUCCESS",
    payload: timetable,
})

export const getTimeTableFailure = () => ({
    type: "GET_TIMETABLE_FAILURE",
})