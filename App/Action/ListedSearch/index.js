import axios from 'axios';
import { LISTED_SEARCH } from './types';
import { companyUrl } from '../../Url';
import jsonFile from '../../../getToken.json';
import { useSelector } from 'react-redux';

export const getListedSearchDetails = (co_code, navigation, authToken) => dispatch => {
    //  alert('dddd')
    axios
        .get(`${companyUrl}/listed/co_code/${co_code}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            console.log('!!@@@#### ', response.data);
            dispatch({
                type: LISTED_SEARCH,
                data: JSON.stringify(response.data),
            });
            navigation.navigate('ListedSearch');
        })
        .catch(error => {
            console.error(error);
        });
};
