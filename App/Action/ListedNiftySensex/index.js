
import { NIFTY_SENSEX } from "../../ActionType/ListedNiftySensex";

import { CloudUrl, token,headers } from '../../Url';
import Axios from 'axios';
// 
export const getListNiftySensex = (setniftySenser) => dispatch => {
  fetch(`${CloudUrl}/master/?path=Indices`, {
    method: 'Get',

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((res) => {
    return res.json()
  }).then(result => {
    // console.log(result.data[57],'result');
    if (result) {
      setniftySenser(false)
      dispatch({
        type: NIFTY_SENSEX,
        data: result.data
      })
    }
  }).catch(err => console.log(err))
};
