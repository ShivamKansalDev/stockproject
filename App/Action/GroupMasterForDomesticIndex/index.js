
import Axios from 'axios';

import { CloudUrl, headers } from '../../Url';
import { GROUP_MASTER_FOR_DOMESTIC_INDEX } from '../../ActionType/GroupMasterForDomesticIndex';
import { TOP_LOSER_ALL_GROUP_NAME } from '../../ActionType/ListedCompanyList/TopLoser';



export const getGroupMsterForDomesticIndex = (authToken, exchange = 'bse', type = '') => dispatch => {
    console.log("!@!@!@&*&*&*& GROUP MASTER DOMESTIC INDEX: ", type)
    Axios.get(`${CloudUrl}/master/?path=GroupMaster/${exchange}`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                dispatch({
                    type: GROUP_MASTER_FOR_DOMESTIC_INDEX,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
