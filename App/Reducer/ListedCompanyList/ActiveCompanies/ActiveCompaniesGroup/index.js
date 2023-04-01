import { ALL_GROUP,ALL_GROUP_IS_SELECTED } from "../../../../ActionType/ListedCompanyList/ActiveCompanies";




const initialState = {
    ActiveCompaniesGroup:[],
   AllList:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_GROUP:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        ActiveCompaniesGroup: dd,
        AllList: dd,
     
       
        
      };
    case ALL_GROUP_IS_SELECTED:
        const datalist=[ ...state.AllList]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        ActiveCompaniesGroup: d,
      
       
        
      };
   

    default:
      return state;
  }
};
