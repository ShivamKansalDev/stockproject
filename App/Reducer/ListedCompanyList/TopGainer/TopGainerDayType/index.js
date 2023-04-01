

import { TOP_GAINER_ALL_DAY_IS_SELETED,TOP_GAINER_ALL_DAY_TYPE } from '../../../../ActionType/ListedCompanyList/TopGainer';
import { TopLosetDay } from '../../../../Utils/TopLosetDay';


const initialState = {
    SeletedDayGn:[],
    AllListDayGn:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOP_GAINER_ALL_DAY_TYPE:
      const countdata=  TopLosetDay.filter(item => item.isChecked)
      return {
        ...state,
        SeletedDayGn: TopLosetDay,
        AllListDayGn: TopLosetDay,
     
       
        
      };
    case TOP_GAINER_ALL_DAY_IS_SELETED:
        const datalist=[ ...state.AllListDayGn]
        
     
     
        let d = datalist.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        SeletedDayGn: d,
      
       
        
      };
   

    default:
      return state;
  }
};
