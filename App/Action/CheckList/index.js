


import Axios from 'axios';

import { CloudUrl, token, headers, tok, userUrl } from '../../Url';
import { ALL_CHECK_LIST } from '../../ActionType/CheckList';
import { getToken } from '../AuthHelper';





export const getChecklist = (id) => dispatch => {
    //  alert('dddd') master/?path=Board-Meetings/1375/10
    // console.log(id)
    getToken().then(token => {
        Axios.get(`${userUrl}/pagesettings`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.listed_individual_score_card, 'ddd');
                if (response.data) {
                    //  console.log(response.data.data,'sc')
                    // setloder(false)
                    dispatch({
                        type: ALL_CHECK_LIST,
                        data: response.data.listed_individual_score_card
                    })
                } else {
                    // setloder(false)
                    dispatch({
                        type: ALL_CHECK_LIST,
                        data: []
                    })

                }
            })
            .catch(error => {
                console.error(error);
            });
    })

};
export const getCheckPost = (listed_individual_score_card) => dispatch => {

    console.log(listed_individual_score_card)
    getToken().then(token => {
        Axios.post(`${userUrl}/pagesettings`, { listed_individual_score_card }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },)
            .then(response => {
                console.log(response.data, 'ddd');
                if (response.data) {
                    console.log(response.data.data, 'sc')
                    // setloder(false)
                    dispatch({
                        type: ALL_CHECK_LIST,
                        data: response.data.listed_individual_score_card
                    })
                } else {
                    // setloder(false)
                    dispatch({
                        type: ALL_CHECK_LIST,
                        data: []
                    })

                }
            })
            .catch(error => {
                console.error(error);
            });
    })
};