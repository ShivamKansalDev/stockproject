import {
  COMPANY_FINANCIALS_SELECTED,
  COMPANY_FINANCIALS,
} from '../../../ActionType/CompanyDetails';

import moment from 'moment';
const initialState = {
  Financials: [],
  data: [],
  volume1: [],
  volume2: [],
  name: [],
  val: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_FINANCIALS:
      const slicedArray1 = action.data;
      const slicedArray = action.data.find(i => i.rowno == 2);

      // const words = {
      //     "COLUMNNAME": "   Sale of Products",
      //     "RID": 2,
      //     "Y202112": 15811.06,
      //     "Y202012": 13483.48,
      //     "Y201912": 15339.21,
      //     "Y201812": 14470.19,
      //     "Y201712": 13837.51,
      //     "rowno": 2
      // }

      const results = [];
      const results1 = [];

      Object.entries(slicedArray).map((val, i) => {
        const dat = {
          x: `${moment(val[0].slice(5, 7), 'MM').format('MMM')} ${val[0].slice(
            1,
            5,
          )}`,
          y: val[1],
        };

        results.push(dat);
        results1.push(
          `${moment(val[0].slice(5, 7), 'MM').format('MMM')} ${val[0].slice(
            1,
            5,
          )}`,
        );
      });

      //  console.log(results.slice(2,7))
      //  console.log(results1.slice(2,7))

      return {
        ...state,
        Financials: slicedArray1,
        data: results.slice(2, 7),
        name: results1.slice(2, 7),
      };
    // =================================
    case COMPANY_FINANCIALS_SELECTED:
      // console.log(action.id);
      const slicedArray2 = [...state.Financials];
      const slicedArray3 = slicedArray2.find(i => i.rowno == action.id);

      const results2 = [];
      const results3 = [];

      Object.entries(slicedArray3).map((val, i) => {
        const dat = {
          x: `${moment(val[0].slice(5, 7), 'MM').format('MMM')} ${val[0].slice(
            1,
            5,
          )}`,
          y: val[1],
        };

        results2.push(dat);
        results3.push(
          `${moment(val[0].slice(5, 7), 'MM').format('MMM')} ${val[0].slice(
            1,
            5,
          )}`,
        );
      });

      //  console.log(results.slice(2,7))
      //  console.log(results1.slice(2,7))

      return {
        ...state,
        data: results2.slice(2, 7),
        name: results3.slice(2, 7),
      };

    default:
      return state;
  }
};
