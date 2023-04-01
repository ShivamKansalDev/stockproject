import { FII_DII_ACTIVITY } from "../../../ActionType/ListedCompanyList";


  const initialState = {
    FiiDiiActivity: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case FII_DII_ACTIVITY:
          //  console.log(action.data);
        return {
          ...state,
          FiiDiiActivity:action.data
        };
     
  
      default:
        return state;
    }
  };
  