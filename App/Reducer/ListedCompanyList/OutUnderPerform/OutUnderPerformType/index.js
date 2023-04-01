
import {TYPE_ALL, TYPE_IS_SELECTED } from '../../../../ActionType/ListedCompanyList/OutUnderPerform';

import { OutUnderPerform } from '../../../../Utils/OutUnderPerform';

const initialState = {
    OutUnderPerformType:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_ALL:
     
      return {
        ...state,
        OutUnderPerformType: OutUnderPerform,
        
      };
    case TYPE_IS_SELECTED:
        let d = OutUnderPerform.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
      return {
        ...state,
        OutUnderPerformType: d,  
       
      };
   

    default:
      return state;
  }
};
