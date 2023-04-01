
import Axios from 'axios';
import {
    DOMESTIC_INDEX, DEAL,
    INTERNATIONAL_INDEX,
    SECTOR,
    WEEK_HEIG_52,
    WEEK_LOW_52,
    ALL_HIGH,
    ALL_LOW,
    //
    FILL_ACTIVITY,
    TOP_GAINER,
    TOP_LOSER,
    EXCHANGE_HOLIDAY,
    LOW_PRICE_HIGH_VOLU,
    FII_DII_ACTIVITY,
    ADVANCE_DECLINE,
    OUT_UNDER_PERFORMERS,
    ACTIVE_COMPANIES

} from '../../ActionType/ListedCompanyList';
import { CloudUrl, token, headers } from '../../Url';
//DEAL
export const getDeal = (setloder) => dispatch => {
    fetch(`${CloudUrl}/master/?path=BulkBlockDeal/bse/bulk/10`, {
        method: 'Get',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => {
        return res.json()
    }).then(result => {
        // console.log(result.data,'result');

        if (result) {
            setloder(false)
            dispatch({
                type: DEAL,
                data: result.data
            })
        }


    }).catch(err => console.log(err))
};
//// 52 week high
export const get52weekHigh = (setloder, exch, exbscnsc, num) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=FiftyTwoWeekHigh/${exch}/${exbscnsc}/${num}`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: WEEK_HEIG_52,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: WEEK_HEIG_52,
                    data: []
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//52low
export const get52weekLow = (setloder, exch, exbscnsc, num = 10) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=FiftyTwoWeekLow/${exch}/${exbscnsc}/${num}`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: WEEK_LOW_52,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//domestic
export const getdomesticIndex = (setloder) => dispatch => {
    console.log("#@#@#@ DOMETIC INDEX")
    Axios.get(`${CloudUrl}/master/?path=Indices`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: DOMESTIC_INDEX,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//international
export const getInternationalIndex = (setloder) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=WorldIndices`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: INTERNATIONAL_INDEX,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
// domesti index
export const getSector = (setloder) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=SectorList`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: SECTOR,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
// ALL hIGH
export const getAllHigh = (setloder, exch, exbscnsc, type) => dispatch => {
    console.log("##$##@!@! ALL HIGH API: ", `${CloudUrl}/master/?path=ALLHigh/${exch}/${exbscnsc}/${type}/10`)
    Axios.get(`${CloudUrl}/master/?path=ALLHigh/${exch}/${exbscnsc}/${type}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log("##$##@!@! ALL HIGH: ", response.data.data)
                setloder(false)
                dispatch({
                    type: ALL_HIGH,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: ALL_HIGH,
                    data: []
                })
            }
        })
        .catch(error => {
            // console.error(error);
            console.log("!@!@! ALL HIGH ERROR: ", JSON.stringify(error, null, 4))
        });

};
export const getAllLow = (setloder, exch, exbscnsc, type) => dispatch => {
    // console.log("@#@#@#@$# ALL LOW: ", `${CloudUrl}/master/?path=ALLLow/${exch}/${exbscnsc}/${type}/10`)
    Axios.get(`${CloudUrl}/master/?path=ALLLow/${exch}/${exbscnsc}/${type}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log("^^^^^^ ALL TIME LOW: ", response.data.data)
                setloder(false)
                dispatch({
                    type: ALL_LOW,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: ALL_LOW,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//FILL_ACTIVITY
export const getFillActivity = (setloder) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=FII-Investment`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: FILL_ACTIVITY,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//TOP loser
export const getTopLoser = (setloder, exch, exbscnsc, type) => dispatch => {
    //  console.log(exch,exbscnsc,type,'exch,exbscnsc,type')
    Axios.get(`${CloudUrl}/master/?path=losers/${exch}/${exbscnsc}/${type}/10`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: TOP_LOSER,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//TOP GAINER
export const getTopGainer = (setloder, exch, exbscnsc, type) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=Gainers/${exch}/${exbscnsc}/${type}/10`, { headers })
        .then(response => {
            if (response) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: TOP_GAINER,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//get lowPriceHightValue
export const getlowPriceHightValue = (setloder, exch, type, exbscnsc) => dispatch => {
    // console.log("object");
    Axios.get(`${CloudUrl}/master/?path=LowPriceHighVolume/${exch}/${type}/${exbscnsc}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: LOW_PRICE_HIGH_VOLU,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: LOW_PRICE_HIGH_VOLU,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//FII DII
export const getFiiDiiActivity = (setloder) => dispatch => {
    // alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=FII-Investment`, { headers })
        .then(response => {
            if (response) {
                //  console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: FII_DII_ACTIVITY,
                    data: response.data.data
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};
//ExchangeHolidays
export const getExchangeHolidays = (setloder, type) => dispatch => {
    // alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=exchangeholidays/${type}`, { headers })
        .then(response => {
            if (response.data.success == true) {
                //  console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: EXCHANGE_HOLIDAY,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: EXCHANGE_HOLIDAY,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//getAdvanceDecline
export const getAdvanceDecline = (setloder, exch, exbscnsc, type) => dispatch => {
    // alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=advancesdeclinesdetails/${exch}/${exbscnsc}/${type}`, { headers })
        .then(response => {
            if (response.data.success == true) {
                //  console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: ADVANCE_DECLINE,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: ADVANCE_DECLINE,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};

// 
export const getOutPerformer = (setloder, exch, group, change, type) => dispatch => {
    //  alert('dddd')
    Axios.get(`${CloudUrl}/master/?path=OutUnderPerformers/${exch}/${group}/${change}/${type}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: OUT_UNDER_PERFORMERS,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: OUT_UNDER_PERFORMERS,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//ACTIVE_COMPANIES
export const getActiveCompanies = (setloder, exch, group, type) => dispatch => {
    //  alert('dddd')
    console.log("!@!@%^%$ ACTIVE: ", exch, group, type)
    Axios.get(`${CloudUrl}/master/?path=MostActiveToppers/${exch}/${group}/${type}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: ACTIVE_COMPANIES,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: ACTIVE_COMPANIES,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
