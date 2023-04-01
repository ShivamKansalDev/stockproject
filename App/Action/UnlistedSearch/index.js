import axios from 'axios';
import { UNLISTED_SEARCH } from './types';
import { companyUrl } from '../../Url';
import jsonFile from '../../../getToken.json';

export const getUnlistedSearchDetails = (cin, navigation, authToken) => dispatch => {
    //  alert('dddd')
    axios
        .get(`${companyUrl}/unlistedcompanies/${cin}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            // console.log('!!@@@#### ', response.data);
            dispatch({
                type: UNLISTED_SEARCH,
                data: JSON.stringify(response.data),
            });
            navigation.navigate('TabNaV', {
                screen: 'UnlistedNavigator',
                params: {
                    screen: 'UnlistedSearch',
                    initial: false
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
};
