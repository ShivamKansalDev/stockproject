import { SECTOR } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    Sector: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case SECTOR:
          //  console.log(action.data);
        return {
          ...state,
          Sector:action.data
        };
     
  
      default:
        return state;
    }
  };
  