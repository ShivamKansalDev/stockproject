import {ACTIVE_COMPANIES } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    ActiveCompanies: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case ACTIVE_COMPANIES:
          //  console.log(action.data);
        return {
          ...state,
          ActiveCompanies:action.data
        };
     
  
      default:
        return state;
    }
  };
  