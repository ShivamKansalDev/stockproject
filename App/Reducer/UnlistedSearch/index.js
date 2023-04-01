import {UNLISTED_SEARCH} from '../../Action/UnlistedSearch/types';

const initialState = {
  UnlistedDetails: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UNLISTED_SEARCH:
      //   console.log(action.payload.data);
      return {
        ...state,
        UnlistedDetails: action.data,
      };

    default:
      return state;
  }
};
