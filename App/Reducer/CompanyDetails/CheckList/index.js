
// import { ALL_CHECK_LIST, ALL_CHECK_LIST_IS_SELETED } from "../../../ActionType/CheckList";

// import { listedCheck, listed_individual_score_card } from "../../../Utils/listedCheck";


// const initialState = {
//   CheckList: [],
//   CheckList1: [],


// };
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case ALL_CHECK_LIST:

//       return {
//         ...state,
//         CheckList: listedCheck,
//         CheckList1: listed_individual_score_card,

//       };

//     case ALL_CHECK_LIST_IS_SELETED:
//       const datalist = [...state.CheckList1]
//         if (datalist.includes(action.payload.id)) {
//           return {
//             ...state,
//             CheckList1: datalist.filter(item => item!==action.payload.id),

//           };  //remove
//         } else {
//           datalist.push(action.payload.id) 
//           return {
//             ...state,
//             CheckList1: datalist,

//           };  // add

//         }





//     default:
//       return state;
//   }
// };
import { ALL_CHECK_LIST, ALL_CHECK_LIST_IS_SELETED } from "../../../ActionType/CheckList";

import { listedCheck, listed_individual_score_card } from "../../../Utils/listedCheck";


const initialState = {
    CheckList: [],
    CheckList1: [],


};
export default (state = initialState, action) => {
    switch (action.type) {
        case ALL_CHECK_LIST:

            if (action.data.length > 0) {
                return {
                    ...state,
                    CheckList: action.data,
                    CheckList1: action.data,

                };


            } else {
                return {
                    ...state,
                    CheckList: listed_individual_score_card,
                    CheckList1: listed_individual_score_card,

                };

            }


        case ALL_CHECK_LIST_IS_SELETED:
            const datalist = [...state.CheckList1]
            if (datalist.includes(action.payload.id)) {
                return {
                    ...state,
                    CheckList1: datalist.filter(item => item !== action.payload.id),

                };  //remove
            } else {
                datalist.push(action.payload.id)
                return {
                    ...state,
                    CheckList1: datalist,

                };  // add

            }





        default:
            return state;
    }
};