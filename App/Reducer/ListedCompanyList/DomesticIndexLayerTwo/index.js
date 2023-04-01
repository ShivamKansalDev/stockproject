// import { FII_DII_ACTIVITY } from "../../../ActionType/DomesticIndexLayerTwo";

import { DOMESTIC_INDEX_LAYER_TWO } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    DomesticIndexLayerTwo: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case DOMESTIC_INDEX_LAYER_TWO:
          //  console.log(action.data);
        return {
          ...state,
          DomesticIndexLayerTwo:action.data
        };
     
  
      default:
        return state;
    }
  };
  