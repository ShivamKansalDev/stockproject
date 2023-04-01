import { TOP_LOSER } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    TopLoser: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case TOP_LOSER:
          //  console.log(action.data);
        return {
          ...state,
          TopLoser:action.data
        };
     
  
      default:
        return state;
    }
  };
  