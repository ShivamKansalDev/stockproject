import { LOW_PRICE_HIGH_VOLU } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    LowPriceHighVolu: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOW_PRICE_HIGH_VOLU:
          //  console.log(action.data);
        return {
          ...state,
          LowPriceHighVolu:action.data
        };
     
  
      default:
        return state;
    }
  };
  