import Axios from 'axios';

import { CloudUrl, token,headers } from '../../../Url';
import { SECTOR_LAYER_TWO } from '../../../ActionType/ListedCompanyListLawer2';


export const getSectorNameLawerTwo = (setloder1,id) => dispatch => {
    // alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=SectorWiseComp/${id}`, {headers})
    .then(response => {
      if (response) {
        //  console.log(response.data.data)
        setloder1(false)
        dispatch({
          type: SECTOR_LAYER_TWO,
          data: response.data.data
        })
      }
    })
    .catch(error => {
      console.error(error);
    });
   
  };
  