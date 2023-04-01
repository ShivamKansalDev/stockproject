

import { ADVANCE_DECLINE_ALL_LIST_TYPE, ADVANCE_DECLINE_IS_SELETED_TYPE } from '../../../../ActionType/ListedCompanyList/AdvanceDecline';

import { AdvanceDecline } from '../../../../Utils/AdvanceDecline';



const initialState = {
    SeletedAvType:[],
 
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADVANCE_DECLINE_ALL_LIST_TYPE:
     
      return {
        ...state,
        SeletedAvType: AdvanceDecline,
        
     
       
        
      };
    case ADVANCE_DECLINE_IS_SELETED_TYPE:
       
        
     
     
        let d = AdvanceDecline.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedAvType: d,
      
       
        
      };
   

    default:
      return state;
  }
};
