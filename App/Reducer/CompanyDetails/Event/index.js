import {
    
    COMPANY_DETAILS_EVENT,
    DETAILS_EVENT

} from "../../../ActionType/CompanyDetails";
    
    
      const initialState = {
        Event: [],
        EventDetails: '',
      
      };
      export default (state = initialState, action) => {
        switch (action.type) {
          case COMPANY_DETAILS_EVENT:
            //   console.log(action.payload.data);
            return {
              ...state,
              Event:action.data
            };
          case DETAILS_EVENT:
            //   console.log(action.payload.data);
            return {
              ...state,
              EventDetails:action.data
            };
         
      
          default:
            return state;
        }
      };
      