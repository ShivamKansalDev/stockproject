import { NIFTY_SENSEX } from "../../ActionType/ListedNiftySensex";


const initialState = {
  ListedNiftySensex:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NIFTY_SENSEX:
        // console.log(action.data,' action.data')
      return {
        ...state,
        ListedNiftySensex: action.data,
       
        
      };

    default:
      return state;
  }
};

