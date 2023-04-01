import {COMPANY_DETAILS_PRICE_VOLUME } from "../../../ActionType/CompanyDetails";

import moment from 'moment';
  const initialState = {
    PriceVolume: [],
    data: [],
    volume1: [],
    volume2: [],
    name: [],
    val: [],
  
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case COMPANY_DETAILS_PRICE_VOLUME:
            // console.log(action.data,'pre');

        let data=[]
        let volume1=[]
        let volume2=[]
        let name=[]
        let val=[]
        const slicedArray = action.data.slice(0, 5);

      let pp=  slicedArray.map((item,i)=>{
      
          const  dat={x:i+1,y:item.Volume}
        const  dat1={x:i+1,y:item.Del_Vol}
        const va=i+1
           data.push(item.Close)
           volume1.push(dat)
           volume2.push(dat1)
           name.push(moment(item?.date).format('D MMM'))
           
           val.push(va)
          
      
        
        })
        // console.log(volume1,'volume1');
        
        return {
          ...state,
          PriceVolume:action.data,
          data:data,
          volume1:volume1,
          volume2:volume2,
          name:name,
          val:val
        };
     
  
      default:
        return state;
    }
  };
  