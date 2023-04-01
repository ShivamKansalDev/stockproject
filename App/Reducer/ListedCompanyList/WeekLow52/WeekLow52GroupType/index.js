
import { WEEK_LOW_52_ALL_GROUP_IS_SELETED,WEEK_LOW_52_ALL_GROUP_NAME } from '../../../../ActionType/ListedCompanyList/WeekLow52';


const initialState = {
    SeletedG52L:[],
   AllListG:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WEEK_LOW_52_ALL_GROUP_NAME:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        SeletedG52L: dd,
        AllListG: dd,
     
       
        
      };
    case WEEK_LOW_52_ALL_GROUP_IS_SELETED:
        const datalist=[ ...state.AllListG]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedG52L: d,
      
       
        
      };
   

    default:
      return state;
  }
};
