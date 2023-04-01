import { SENSEX_ROUTE_NAME } from "../../ActionType/SenSexRoute";


const initialState = {
senSexRouteName:'DomesticIndex',
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SENSEX_ROUTE_NAME:
    //    console.log(action.data,' action.data')
      return {
        ...state,
        senSexRouteName: action.data,
       
        
      };

    default:
      return state;
  }
};

