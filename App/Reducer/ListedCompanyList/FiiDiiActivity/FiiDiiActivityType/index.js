

import { FII_DII_ALL_GROUP_IS_SELETED,FII_DII_ALL_GROUP_NAME } from '../../../../ActionType/ListedCompanyList/FiiDiiActivity';

import { fiidill } from '../../../../Utils/FillDii';

const initialState = {
    FiiDiiActivityType:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FII_DII_ALL_GROUP_NAME:
     
      return {
        ...state,
        FiiDiiActivityType: fiidill, 
        
      };
    case FII_DII_ALL_GROUP_IS_SELETED:
        let d = fiidill.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        FiiDiiActivityType: d,
      
       
        
      };
   

    default:
      return state;
  }
};
