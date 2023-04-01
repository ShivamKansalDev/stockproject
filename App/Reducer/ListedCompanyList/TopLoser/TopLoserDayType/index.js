

import { TOP_LOSER_ALL_DAY_TYPE, TOP_LOSER_ALL_DAY_IS_SELETED, TOP_LOSER_WEEK_IS_SELETED } from '../../../../ActionType/ListedCompanyList/TopLoser';
import { TopLosetDay } from '../../../../Utils/TopLosetDay';


const initialState = {
    TopLoserDayTypeSeleted: [],
    TopLoserDayTypeAllList: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOP_LOSER_ALL_DAY_TYPE:
            const countdata = TopLosetDay.filter(item => item.isChecked)
            return {
                ...state,
                TopLoserDayTypeSeleted: TopLosetDay,
                TopLoserDayTypeAllList: TopLosetDay,



            };
        case TOP_LOSER_ALL_DAY_IS_SELETED:
            const datalist = [...state.TopLoserDayTypeAllList]



            let d = datalist.map(item => {
                let dd = { ...item, isChecked: false }
                return dd;
            });
            // console.log(d,'action.payload.id');
            d[action.payload.id].isChecked = true


            return {
                ...state,
                TopLoserDayTypeSeleted: d,
            };


        default:
            return state;
    }
};
