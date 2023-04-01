


import { ALL_TIME_LOW_ALL_GROUP,ALL_TIME_LOW_IS_SELETED_GROUP } from '../../../../ActionType/ListedCompanyList/AllLow';


const initialState = {
  AllTimeLowGroup:[],
   
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_TIME_LOW_ALL_GROUP:
        let dd = action.data.map(item => {
            let d={...item,isChecked:false}
             return d;
           });
           // console.log(d,'action.payload.id');
           dd[0].isChecked=true
      return {
        ...state,
        AllTimeLowGroup: dd,
        
     
       
        
      };
    case ALL_TIME_LOW_IS_SELETED_GROUP:
      const datalist=[ ...state.AllTimeLowGroup]
        let d = datalist.map(item => {
           let dd={...item,isChecked:false}
            return dd;
          });
          // console.log(d,'action.payload.id');
          d[action.payload.id].isChecked=true
     
        
      return {
        ...state,
        AllTimeLowGroup: d,
      
       
        
      };
   

    default:
      return state;
  }
};
