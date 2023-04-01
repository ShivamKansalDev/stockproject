
import {CLOSE_IPO } from "../../../ActionType/Unlisted";


const initialState = {
  CloseIpo: [],

};
export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_IPO:
          // console.log(action.data);
      return {
        ...state,
        CloseIpo:action.data
      };
   

    default:
      return state;
  }
};
