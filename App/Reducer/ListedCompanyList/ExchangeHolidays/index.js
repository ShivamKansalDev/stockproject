import { EXCHANGE_HOLIDAY } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    ExchangeHolidays: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case EXCHANGE_HOLIDAY:
          //  console.log(action.data);
        return {
          ...state,
          ExchangeHolidays:action.data
        };
     
  
      default:
        return state;
    }
  };
  