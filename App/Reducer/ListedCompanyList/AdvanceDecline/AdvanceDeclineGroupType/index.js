

import { ADVANCE_DECLINE_IS_SELETED_GROUP,ADVANCE_DECLINE_ALL_LIST_GROUP } from '../../../../ActionType/ListedCompanyList/AdvanceDecline';

const initialState = {
    SeletedAv:[],
   AllListAV:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADVANCE_DECLINE_ALL_LIST_GROUP:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        SeletedAv: dd,
        AllListAV: dd,
     
       
        
      };
    case ADVANCE_DECLINE_IS_SELETED_GROUP:
        const datalist=[ ...state.AllListAV]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedAv: d,
      
       
        
      };
   

    default:
      return state;
  }
};
