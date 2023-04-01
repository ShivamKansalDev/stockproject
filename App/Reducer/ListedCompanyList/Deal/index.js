import { DEAL } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    Deal: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case DEAL:
          //  console.log(action.data);
        return {
          ...state,
          Deal:action.data
        };
     
  
      default:
        return state;
    }
  };
  