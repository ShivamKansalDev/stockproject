
import { OPEN_IPO
 } from "../../../ActionType/Unlisted";


const initialState = {
    OpenIPO: [],

};
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_IPO:
        //  console.log(action.data);
      return {
        ...state,
        OpenIPO:action.data
      };
   

    default:
      return state;
  }
};
