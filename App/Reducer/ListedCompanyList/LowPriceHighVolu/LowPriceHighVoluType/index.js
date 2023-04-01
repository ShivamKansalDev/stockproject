




import { LOW_PRICE_HIGH_VOLU_IS_SELETED_TYPE,LOW_PRICE_HIGH_VOLU_ALL_LIST_TYPE  } from '../../../../ActionType/ListedCompanyList/LowPriceHighVolu';
import { LowPriceHighVolu } from '../../../../Utils/LowPriceHighVolu';



const initialState = {
    SeletedLpHvTYPE:[],
 
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOW_PRICE_HIGH_VOLU_ALL_LIST_TYPE:
     
      return {
        ...state,
        SeletedLpHvTYPE: LowPriceHighVolu,
        
     
       
        
      };
    case LOW_PRICE_HIGH_VOLU_IS_SELETED_TYPE:
       
        
     
     
        let d = LowPriceHighVolu.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedLpHvTYPE: d,
      
       
        
      };
   

    default:
      return state;
  }
};
