
import { NEW_LISTING } from "../../../ActionType/Unlisted";


const initialState = {
    NewListing: [],

};
export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_LISTING:
        //  console.log(action.data);
      return {
        ...state,
        NewListing:action.data
      };
   

    default:
      return state;
  }
};
