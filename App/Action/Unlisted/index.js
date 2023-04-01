
import Axios from 'axios';

import { CloudUrl, headers } from '../../Url';
import {
    HOME_DATA, BEST_PERFORMING_IPO, OPEN_IPO,
    NEW_LISTING,
    UNLISTED_COMPANIES,
    CLOSE_IPO,
    FORTH_COMING
} from '../../ActionType/Unlisted';
//hOME
export const getUnlistedHome = (setloder) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=LowPriceHighVolume/${exch}/${type}/${exbscnsc}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: HOME_DATA,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: HOME_DATA,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//BEST PERFORM
export const getBestPerformingIPO = (setloder, exchangeType) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=BestPerformerIpo/${exchangeType}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: BEST_PERFORMING_IPO,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: BEST_PERFORMING_IPO,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
//OPEN IPO
export const getOpenIpo = (setloder, exchangeType) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=OpenIssues/${exchangeType}/IPO/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: OPEN_IPO,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: OPEN_IPO,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
// New Listing
export const getNewListing = (setloder, exchangeType) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=Newlisting/${exchangeType}/10`, { headers })
        .then(response => {
            if (response.data.success == true) {
                // console.log(response.data.data)
                setloder(false)
                dispatch({
                    type: NEW_LISTING,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: NEW_LISTING,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
export const getCloseIpo = (setloder, bse, startDate, endData) => dispatch => {
    console.log("!@!#@#*&^&^ CALLED API")
    Axios.get(`${CloudUrl}/master/?path=ClosedIssues/${bse}/IPO/10/${startDate}/${endData}`, { headers })
        .then(response => {
            if (response.data.success == true) {
                //  console.log(response.data.data,'ddd')
                setloder(false)
                dispatch({
                    type: CLOSE_IPO,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: CLOSE_IPO,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};
export const getUnlistedCompanies = (setloder) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=draftprospectus/sebi`, { headers })
        .then(response => {
            if (response.data.success == true) {
                //  console.log(response.data.data,'ddd')
                setloder(false)
                dispatch({
                    type: UNLISTED_COMPANIES,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: UNLISTED_COMPANIES,
                    data: []
                })

            }
        })
        .catch(error => {
            console.error(error);
        });

};

export const getForthComing = (setloder, exch) => dispatch => {
    Axios.get(`${CloudUrl}/master/?path=forthcomingipo/${exch}/IPO/10`, { headers })
        .then(response => {
            // console.log("#@#@#*(*&^^& FORTH COMING: ", response.data)
            if (response.data.success == true) {
                setloder(false)
                dispatch({
                    type: FORTH_COMING,
                    data: response.data.data
                })
            } else {
                setloder(false)
                dispatch({
                    type: FORTH_COMING,
                    data: []
                })
            }
        })
        .catch(error => {
            console.error(error);
        });

};