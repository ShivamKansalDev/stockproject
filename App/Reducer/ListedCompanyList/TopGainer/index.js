import { TOP_GAINER } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    TopGainer: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case TOP_GAINER:
          //  console.log(action.data);
        return {
          ...state,
          TopGainer:action.data
        };
     
  
      default:
        return state;
    }
  };
  