import timeTableReducer from "./timeTableReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  timeTable: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  },
  isFetching: false,
  error: false,
};

export const TimeTableContext = createContext(INITIAL_STATE);

export const TimeTableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timeTableReducer, INITIAL_STATE);

  return (
    <TimeTableContext.Provider
      value={{
        timeTable: state.timeTable,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
