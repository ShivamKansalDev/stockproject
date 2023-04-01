
import {TYPE_ALL, TYPE_IS_SELECTED, OUT_UNDER, OUT_UNDER_IS_SELECTE } from '../../../../ActionType/ListedCompanyList/OutUnderPerform';

import { OutUnderPerform,OutUnderPerform1 } from '../../../../Utils/OutUnderPerform';

const initialState = {
    OutUnder:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OUT_UNDER:
     
      return {
        ...state,
        OutUnder: OutUnderPerform1,
        
      };
    case OUT_UNDER_IS_SELECTE:
        let d = OutUnderPerform1.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
      return {
        ...state,
        OutUnder: d,  
       
      };
   

    default:
      return state;
  }
};
