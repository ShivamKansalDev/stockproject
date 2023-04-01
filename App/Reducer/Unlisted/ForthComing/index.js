
import {CLOSE_IPO,FORTH_COMING } from "../../../ActionType/Unlisted";


const initialState = {
    ForthComing: [],
    isLoding:true

};
export default (state = initialState, action) => {
  switch (action.type) {
    case FORTH_COMING:
          // console.log(action.data);
      return {
        ...state,
        ForthComing:action.data,
        isLoding:false
      };
   

    default:
      return state;
  }
};
