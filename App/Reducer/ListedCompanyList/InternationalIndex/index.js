import { INTERNATIONAL_INDEX } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    InternationalIndex: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case INTERNATIONAL_INDEX:
          //  console.log(action.data);
        return {
          ...state,
          InternationalIndex:action.data
        };
     
  
      default:
        return state;
    }
  };
  