import React, { createContext, useReducer, useContext } from "react";

const TimeContext = createContext();
const { Provider } = TimeContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TIME":
      return {
        ...state,
        clock: action.clock,
      };
    default:
      return state;
  }
};

const TimeProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    clock: {
      clockFunction: undefined,
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useTimeContext = () => {
  return useContext(TimeContext);
};

export { TimeProvider, useTimeContext, TimeContext };
