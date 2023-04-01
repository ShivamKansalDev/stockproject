import { ADVANCE_DECLINE } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    AdvanceDecline: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case ADVANCE_DECLINE:
          //  console.log(action.data);
        return {
          ...state,
          AdvanceDecline:action.data
        };
     
  
      default:
        return state;
    }
  };
  