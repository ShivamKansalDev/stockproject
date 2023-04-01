import { ALL_HIGH } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    AllHigh: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case ALL_HIGH:
          //  console.log(action.data);
        return {
          ...state,
          AllHigh:action.data
        };
     
  
      default:
        return state;
    }
  };
  