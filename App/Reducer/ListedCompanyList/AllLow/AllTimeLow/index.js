

import { ALL_TIME_LOW_ALL_LIST, ALL_TIME_LOW_IS_SELETED } from '../../../../ActionType/ListedCompanyList/AllLow';

import { AllTimeHigh } from '../../../../Utils/AllTimeHigh';

const initialState = {
  AllTimeLowType:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_TIME_LOW_ALL_LIST:
      const countdata=  AllTimeHigh.filter(item => item.isChecked)
      return {
        ...state,
        AllTimeLowType: AllTimeHigh, 
        
      };
    case ALL_TIME_LOW_IS_SELETED:
        let d = AllTimeHigh.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        AllTimeLowType: d,
      
       
        
      };
   

    default:
      return state;
  }
};
