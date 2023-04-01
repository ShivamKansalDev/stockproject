

import { ALL_TIME_HIGH_ALL_LIST, ALL_TIME_HIGH_IS_SELETED } from '../../../../ActionType/ListedCompanyList/AllHigh';

import { AllTimeHigh } from '../../../../Utils/AllTimeHigh';



const initialState = {
  AllTimeHighType:[],
   
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_TIME_HIGH_ALL_LIST:
      const countdata=  AllTimeHigh.filter(item => item.isChecked)
      return {
        ...state,
        AllTimeHighType: AllTimeHigh,
        
     
       
        
      };
    case ALL_TIME_HIGH_IS_SELETED:
   
        
     
     
        let d = AllTimeHigh.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        AllTimeHighType: d,
      
       
        
      };
   

    default:
      return state;
  }
};
