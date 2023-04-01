

import { DEAL_ALL_LIST,DEAL_IS_SELTED } from '../../../ActionType/DealSeleted';
import { DealSeletected } from '../../../Utils/DealSeletected';


const initialState = {
    seleted:[],
    allList:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DEAL_ALL_LIST:
      const countdata=  DealSeletected.filter(item => item.isChecked)
      return {
        ...state,
        seleted: DealSeletected,
        allList: DealSeletected,
     
       
        
      };
    case DEAL_IS_SELTED:
        const datalist=[ ...state.allList]
        
     
     
        let d = datalist.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        seleted: d,
      
       
        
      };
   

    default:
      return state;
  }
};
