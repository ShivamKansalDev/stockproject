import { HOME_COMPANY_NAME } from "../../ActionType/CompanyName";


  const initialState = {
    CompanyName: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case HOME_COMPANY_NAME:
        //   console.log(action.payload.data);
        return {
          ...state,
          CompanyName:action.data
        };
     
  
      default:
        return state;
    }
  };
  