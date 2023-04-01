
import { UNLISTED_COMPANIES } from "../../../ActionType/Unlisted";


  const initialState = {
    UnlistedCompanies: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case UNLISTED_COMPANIES:
          //  console.log(action.data);
        return {
          ...state,
          UnlistedCompanies:action.data
        };
     
  
      default:
        return state;
    }
  };
  