import { ALL_LOW } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    AllLow: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case ALL_LOW:
          //  console.log(action.data);
        return {
          ...state,
          AllLow:action.data
        };
     
  
      default:
        return state;
    }
  };
  