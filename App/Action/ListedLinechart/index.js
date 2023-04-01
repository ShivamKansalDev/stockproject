
import { LISTED_CHART_BSE } from "../../ActionType/ListedLineChart";


import { CloudUrl, token, headers } from '../../Url';
import Axios from 'axios';
import { getToken } from "../AuthHelper";
// 

export const getListedchartBse = (date) => dispatch => {



    Axios.get(`${CloudUrl}/master/?path=Nifty-Vs-Nifty-Futures-chart/${date}/D1`, { headers })
        .then(response => {
            // console.log(response.data.data,'dfsdsa');

            if (response.data.success == true) {
                dispatch({
                    type: LISTED_CHART_BSE,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
