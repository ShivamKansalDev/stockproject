import {LISTED_SEARCH} from '../../Action/ListedSearch/types';

const initialState = {
  SearchedDetails: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LISTED_SEARCH:
      //   console.log(action.payload.data);
      return {
        ...state,
        SearchedDetails: action.data,
      };

    default:
      return state;
  }
};
