import Axios from 'axios';
import {
    COMPANY_DETAILS_FOR_HOME,
    COMPANY_DETAILS_PRICE_VOLUME,
    COMPANY_DETAILS_SCORE,
    COMPANY_FINANCIALS,
    COMPANY_DETAILS_EVENT
} from '../../ActionType/CompanyDetails';
import { CloudUrl, token, headers, tok, companyUrl } from '../../Url';

// const header = {
//   'Authorization': `Bearer ${tok}`
// };
// console.log(header);


// const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1YzJiNDBhYTJmMzIyNzk4NjY2YTZiMzMyYWFhMDNhNjc3MzAxOWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYW51cCBqYW5hIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDU1WnNDdHRXYUE5QlhMSENiYklKU1p4Ukw5b3htWm0yMVJQMUlUPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3N0b2Nra25vY2tzLXByb2QiLCJhdWQiOiJzdG9ja2tub2Nrcy1wcm9kIiwiYXV0aF90aW1lIjoxNjc3NTI1NTEwLCJ1c2VyX2lkIjoiOUF1ZzFCRjM4TmdwMDFtdm1rTGtaODlXTk43MiIsInN1YiI6IjlBdWcxQkYzOE5ncDAxbXZta0xrWjg5V05ONzIiLCJpYXQiOjE2Nzc1MjU1MTAsImV4cCI6MTY3NzUyOTExMCwiZW1haWwiOiJhbnVwQHhpZ21hcHJvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA3NjgxMzg2NTg5NDIxOTc1NDgyIl0sImVtYWlsIjpbImFudXBAeGlnbWFwcm8uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.DdJ4KHhNkxmxJuxs5CnD5KHR86Jbub6-3zLYarkeBu38qw5zkzTUki5em7p3grWY1OUlj61cWWqFUFH6QF_z0FE-sQO34q9QHzl2bvY3xPfUQ_HRx2Zrw2BHnQ9Zx_jAQUA6O08MM-7nzGdeu4RPl3H3d6rF0oiaqMOs71U6g919JC4RjlbplBvGzCLjJcQDREjCwCBYPtdIadxJfKVVHrNSzAWpIUNynl213j0MFtOeOz2vX52OlR5kehIHs6jZvyXP-fIpcli342hMiO2DXlPUKGLEQKwaqxdPW13J2OaAmjsKnDEZ4WGnA-P2aKTgH69isUj-E_GIgTFy_IXjjg';

export const getCompanyDetails = (id, authToken) => dispatch => {
    //  alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=GetQuoteDetails/${id}/nse`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            console.log("@#@#*&#@##@ COMPANY DETAILS RESPONSE: ", response.data);
            const selectedCompany = response.data?.data.map((item) => {
                return {
                    ...item,
                    co_code: id
                }
            })
            if (response.data.success == true) {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_FOR_HOME,
                    data: selectedCompany
                })
            } else {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_FOR_HOME,
                    data: []
                })

            }
        })
        .catch(error => {
            console.log("@#@#*&#@##@ COMPANY DETAILS ERROR: ", JSON.stringify(error, null, 4))
        });

};


export const getPriceVolume = (exchange, id, stateDate, endData, authToken) => dispatch => {
    //  alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=CompanyPriceHistorical/${exchange}/${id}/${stateDate}/${endData}`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            console.log("@#*&*&*&*& PRICE VOLUME RESPONSE: ", response.data)
            if (response.data.data) {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_PRICE_VOLUME,
                    data: response.data.data
                })
            } else {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_PRICE_VOLUME,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error("#@#@#@# PRICE VOLUME ERROR: ", JSON.stringify(error, null, 4));
        });

};
// Score
export const getScore = (id, authToken) => dispatch => {
    //  alert('dddd')
    console.log("$#$@!@!@ GET SCORE: ", id)
    Axios.get(`${CloudUrl}/master?path=ScoreBoard/${id}`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            if (response.data.success == true) {
                //  console.log(response.data.data,'sc')
                // setloder(false)
                let data = response.data.data;
                console.log("***&&&@@@ GET SCORE RESPONSE: ", data);
                dispatch({
                    type: COMPANY_DETAILS_SCORE,
                    data: data
                })
            } else {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_SCORE,
                    data: []
                })

            }
        })
        .catch(error => {
            console.log("#@#@*&*&*(*&*( GET SCORE ERROR: ", JSON.stringify(error, null, 4));
        });

};
// Score
export const getEvent = (id, authToken) => dispatch => {
    //  alert('dddd') master/?path=Board-Meetings/1375/10
    // console.log(id)
    Axios.get(`${CloudUrl}/master/?path=Board-Meetings/${id}/5`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            console.log("#@#@*&*&*(*&*( GET EVENT RESPONSE: ", response.data)
            if (response.data.success == true) {
                //  console.log(response.data.data,'sc')
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_EVENT,
                    data: response.data.data
                })
            } else {
                // setloder(false)
                dispatch({
                    type: COMPANY_DETAILS_EVENT,
                    data: []
                })

            }
        })
        .catch(error => {
            console.log("#@#@*&*&*(*&*( GET EVENT ERROR: ", JSON.stringify(error, null, 4))
        });

};
export const getFinancial = (id, authToken) => dispatch => {
    //  alert('dddd') master/?path=Board-Meetings/1375/10
    // console.log(id)
    Axios.get(`${companyUrl}/listedfinancials/profitandloss/6/S`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then(response => {
            // console.log(response.data.data);
            if (response.data) {
                //  console.log(response.data.data,'sc')
                // setloder(false)
                dispatch({
                    type: COMPANY_FINANCIALS,
                    data: response.data.data
                })
            } else {
                // setloder(false)
                dispatch({
                    type: COMPANY_FINANCIALS,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};