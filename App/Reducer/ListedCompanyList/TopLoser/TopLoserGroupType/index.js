

import { TOP_LOSER_ALL_GROUP_IS_SELETED,TOP_LOSER_ALL_GROUP_NAME } from '../../../../ActionType/ListedCompanyList/TopLoser';
import { TopLosetDay } from '../../../../Utils/TopLosetDay';


const initialState = {
    TopLoserGroupTypeSeleted:[],
    TopLoserGroupTypeAllList:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOP_LOSER_ALL_GROUP_NAME:

    let dd = action.data.map(item => {
        let d={...item,isChecked:false}
         return d;
       });
       // console.log(d,'action.payload.id');
       dd[0].isChecked=true
    //   const countdata=  TopLosetDay.filter(item => item.isChecked)
      return {
        ...state,
        TopLoserGroupTypeSeleted: dd,
        TopLoserGroupTypeAllList: dd,
     
       
        
      };
    case TOP_LOSER_ALL_GROUP_IS_SELETED:
        const datalist=[ ...state.TopLoserGroupTypeAllList]
        
     
     
        let d = datalist.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        TopLoserGroupTypeSeleted: d,
      
       
        
      };
   

    default:
      return state;
  }
};
