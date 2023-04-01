import { SECTOR_LAYER_TWO } from "../../../../ActionType/ListedCompanyListLawer2";


  const initialState = {
    SectorLayerTwo: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case SECTOR_LAYER_TWO:
          //  console.log(action.data);
        return {
          ...state,
          SectorLayerTwo:action.data
        };
     
  
      default:
        return state;
    }
  };
  