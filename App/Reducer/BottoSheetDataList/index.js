

import { ALL_LIST,IS_SELECTED,FILTER_LIST } from '../../ActionType/BottoSheetDataList';
import { danger } from '../../Components/Helper';
import { data1 } from '../../Utils/BottoSheetDataList';


const initialState = {
    BottoSheetDataList:[],
    BottoSheetDataListAll:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_LIST:
      const countdata=  data1.filter(item => item.isChecked)
      return {
        ...state,
        BottoSheetDataList: countdata,
        BottoSheetDataListAll: data1,
       
        
      };
    case IS_SELECTED:
        const datalist=[ ...state.BottoSheetDataListAll]
        
     
     
        let d = datalist.map(item => {
            if (action.payload.id == item.id) {
              item.isChecked = !item.isChecked;
            }
            return item;
          });
     
        
      return {
        ...state,
        BottoSheetDataListAll: d,
       
        
      };
    case FILTER_LIST:
      // console.log(state.BottoSheetDataListAll.filter(item => item.isChecked),'pp')
      return {
        ...state,
        BottoSheetDataList: state.BottoSheetDataListAll.filter(item => item.isChecked), 
      };

    default:
      return state;
  }
};
