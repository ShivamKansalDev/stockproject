
import {IPO} from '../../ActionType/Ipo/'
const initialState = {
Ipo:'BestPerformingIPO',
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IPO:
      // console.log(action.data,' action.data')
      return {
        ...state,
        Ipo: action.data,
       
        
      };

    default:
      return state;
  }
};
