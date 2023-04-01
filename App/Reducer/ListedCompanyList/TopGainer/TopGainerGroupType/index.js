

import { TOP_GAINER_ALL_GROUP_IS_SELETED,TOP_GAINER_ALL_GROUP_NAME } from '../../../../ActionType/ListedCompanyList/TopGainer';



const initialState = {
    SeletedG:[],
   AllListG:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOP_GAINER_ALL_GROUP_NAME:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        SeletedG: dd,
        AllListG: dd,
     
       
        
      };
    case TOP_GAINER_ALL_GROUP_IS_SELETED:
        const datalist=[ ...state.AllListG]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedG: d,
      
       
        
      };
   

    default:
      return state;
  }
};
