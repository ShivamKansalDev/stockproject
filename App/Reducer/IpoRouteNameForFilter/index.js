

import { IPO_ALL_LIST, IPO_FILTER_LIST, IPO_IS_SELECTED } from '../../ActionType/IpoRouteNameForFilter';
import { data1 } from '../../Utils/IpoRouteNameForFilterListAll';
const initialState = {
    IpoRouteNameForFilterList:[],
    IpoRouteNameForFilterListAll:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IPO_ALL_LIST:
      const countdata=  data1.filter(item => item.isChecked)
      return {
        ...state,
        IpoRouteNameForFilterList: countdata,
        IpoRouteNameForFilterListAll: data1,
       
        
      };
    case IPO_IS_SELECTED:
        const datalist=[ ...state.IpoRouteNameForFilterListAll]
        
     
     
        let d = datalist.map(item => {
            if (action.payload.id == item.id) {
              item.isChecked = !item.isChecked;
            }
            return item;
          });
     
        
      return {
        ...state,
        IpoRouteNameForFilterList: d,
       
        
      };
    case IPO_FILTER_LIST:
      // console.log(state.BottoSheetDataListAll.filter(item => item.isChecked),'pp')
      return {
        ...state,
        IpoRouteNameForFilterList: state.IpoRouteNameForFilterListAll.filter(item => item.isChecked), 
      };

    default:
      return state;
  }
};
