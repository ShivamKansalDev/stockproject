

import { ALL_TIME_HIGH_ALL_GROUP_IS_SELETED,
ALL_TIME_HIGH_ALL_GROUP } from '../../../../ActionType/ListedCompanyList/AllHigh';


const initialState = {
  AllTimeHighGroup:[],
   
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_TIME_HIGH_ALL_GROUP:
        let dd = action.data.map(item => {
            let d={...item,isChecked:false}
             return d;
           });
           // console.log(d,'action.payload.id');
           dd[0].isChecked=true
      return {
        ...state,
        AllTimeHighGroup: dd,
        
     
       
        
      };
    case ALL_TIME_HIGH_ALL_GROUP_IS_SELETED:
      const datalist=[ ...state.AllTimeHighGroup]
        let d = datalist.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        AllTimeHighGroup: d,
      
       
        
      };
   

    default:
      return state;
  }
};
