import Axios from 'axios';

import { CloudUrl, token, headers } from '../../Url';
import { DOMESTIC_INDEX_COMPANY_NAME } from '../../ActionType/ListedCompanyListLawer2';
import {
    DEAL,
    DOMESTIC_INDEX_LAYER_TWO,
} from '../../ActionType/ListedCompanyList';

export const getDomesticCompanyNameLawerTwo =
    (exchange, group, setloder1, bottosheetRef, authToken) => dispatch => {
        console.log("^^^^&&&& DOMESTIC COMPANY NAME")
        Axios.get(
            `${CloudUrl}/master/?path=indexconstituents/${exchange}/${group}`,
            {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            },
        )
            .then(response => {
                if (response) {
                    bottosheetRef.current.snapToIndex(2);
                    // console.log('#########$$$$$$$$$$$', response.data.data);
                    setloder1(false);
                    dispatch({
                        type: DOMESTIC_INDEX_LAYER_TWO,
                        data: response.data.data,
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
//deal

export const getDealtWO = (setloder, type, val) => dispatch => {
    fetch(`${CloudUrl}/master/?path=BulkBlockDeal/${type}/${val}/10`, {
        method: 'Get',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            return res.json();
        })
        .then(result => {
            // console.log(result.data,'result');
            if (result) {
                setloder(false);
                dispatch({
                    type: DEAL,
                    data: result.data,
                });
            }
        })
        .catch(err => console.log(err));
};
