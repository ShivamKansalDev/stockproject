import { LOW_PRICE_HIGH_VOLU_ALL_LIST_GROUP,LOW_PRICE_HIGH_VOLU_IS_SELETED_GROUP } from "../../../../ActionType/ListedCompanyList/LowPriceHighVolu";



const initialState = {
    SeletedLpHvGroup:[],
   AllList:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOW_PRICE_HIGH_VOLU_ALL_LIST_GROUP:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
   
      return {
        ...state,
        SeletedLpHvGroup: dd,
        AllList: dd,
     
       
        
      };
    case LOW_PRICE_HIGH_VOLU_IS_SELETED_GROUP:
        const datalist=[ ...state.AllList]
        
      // console.log("d",action.payload.id);
     
      let d = datalist.map(item => {
        let dd={...item,isChecked:false}
         return dd;
       });
       
       d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedLpHvGroup: d,
      
       
        
      };
   

    default:
      return state;
  }
};
