import { GROUP_MASTER_FOR_DOMESTIC_INDEX } from "../../ActionType/GroupMasterForDomesticIndex";



const initialState = {
    GroupMasterForDomesticIndex:[],
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUP_MASTER_FOR_DOMESTIC_INDEX:
        // console.log(action.data,' action.data')
      return {
        ...state,
        GroupMasterForDomesticIndex: action.data,
       
        
      };

    default:
      return state;
  }
};

