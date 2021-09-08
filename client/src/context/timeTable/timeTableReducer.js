const timeTableReducer = (state,action) => {
    switch(action.type) {
        case "GET_TIMETABLE_START" : 
        return {
            timeTable : [],
            isFetching: true,
            error: false,
        }
        case "GET_TIMETABLE_SUCCESS" : 
          return {
              timeTable: action.payload,
              isFetching: true,
              error: false,
          }
        case "GET_TIMETABLE_FAILURE" : 
        return {
            timeTable: [],
            isFetching: false,
            error: true,
        }
        default: 
          return { ...state };
    }
}

export default timeTableReducer