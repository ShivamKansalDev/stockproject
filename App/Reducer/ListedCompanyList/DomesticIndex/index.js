import { DOMESTIC_INDEX } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    DomesticIndex: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case DOMESTIC_INDEX:
          //  console.log(action.data);
        return {
          ...state,
          DomesticIndex:action.data
        };
     
  
      default:
        return state;
    }
  };
  