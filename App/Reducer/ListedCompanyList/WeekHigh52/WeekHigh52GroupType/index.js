
import { HIGH_WEEK_52_ALL_GROUP_IS_SELETED, HIGH_WEEK_52_ALL_GROUP_NAME } from '../../../../ActionType/ListedCompanyList/HighWeek52';

 

const initialState = {
    SeletedG52h:[],
   AllListG:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HIGH_WEEK_52_ALL_GROUP_NAME:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        SeletedG52h: dd,
        AllListG: dd,
     
       
        
      };
    case HIGH_WEEK_52_ALL_GROUP_IS_SELETED:
        const datalist=[ ...state.AllListG]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedG52h: d,
      
       
        
      };
   

    default:
      return state;
  }
};
