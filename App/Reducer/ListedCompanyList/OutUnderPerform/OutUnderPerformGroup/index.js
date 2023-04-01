
import {  GROUP_ALL,GROUP_ALL_IS_SELECTED} from "../../../../ActionType/ListedCompanyList/OutUnderPerform";



const initialState = {
    OutUnderPerformGroup:[],
   AllList:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUP_ALL:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        OutUnderPerformGroup: dd,
        AllList: dd,
     
       
        
      };
    case GROUP_ALL_IS_SELECTED:
        const datalist=[ ...state.AllList]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        OutUnderPerformGroup: d,
      
       
        
      };
   

    default:
      return state;
  }
};
