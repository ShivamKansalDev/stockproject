
import { ALL_TYPE,ALL_TYPE_IS_SELECTED } from '../../../../ActionType/ListedCompanyList/ActiveCompanies';

import { data } from '../../../../Utils/ActiveCompanies';


const initialState = {
    ActiveCompaniesType:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_TYPE:
     
      return {
        ...state,
        ActiveCompaniesType: data,
        
      };
    case ALL_TYPE_IS_SELECTED:
        let d = data.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
      return {
        ...state,
        ActiveCompaniesType: d,  
       
      };
   

    default:
      return state;
  }
};
