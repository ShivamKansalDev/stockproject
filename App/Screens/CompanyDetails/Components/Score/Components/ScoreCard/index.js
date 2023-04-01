import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Itemm from './Item'
import { listedCheck, listed_individual_score_card } from '../../../../../../Utils/listedCheck'
// import { ALL_CHECK_LIST_IS_SELETED } from '../../../../../../ActionType/CheckList'
// import { conVertText } from '../../../../../../Components/Helper'

const ScoreCard = () => {
    const { Score = [] } = useSelector(state => state.Score)
    const { CheckList = [] } = useSelector(state => state.CheckList)
    // const { CheckList1 } = useSelector(state => state.CheckList)
    console.log("#$#$#$#$# SCORE: ", Score)


    const conVertText = (data, Score) => {

        if (Score[0] && data == 'equity') {
            return Score[0].EQC;
        } else if (Score[0] && data == 'face_value') {
            return Score[0].FV;
        }
        else if (Score[0] && data == 'reserves') {
            return Score[0].RES;
        }
        else if (Score[0] && data == 'dividend') {
            return Score[0].DIV;
        }
        else if (Score[0] && data == 'sales_turnover') {
            return Score[0].STO;
        }
        else if (Score[0] && data == 'net_profit') {
            return Score[0].NP;
        }
        else if (Score[0] && data == 'full_year_cps') {
            return Score[0].CPS;
        }
        else if (Score[0] && data == 'eps') {
            return Score[0].EPS;
        }
        //top 8 //


        //middle 8 //
        else if (Score[0] && data == 't12mnth_yrc') {
            return Score[0].RLFYYRC;
        }
        else if (Score[0] && data == 't12mnth_sto') {
            return Score[0].RLFYSTO;
        }
        else if (Score[0] && data == 't12mnth_op') {
            return Score[0].RLFYOP;
        }
        else if (Score[0] && data == 't12mnth_opm') {
            return Score[0].RLFYOPM;
        }
        else if (Score[0] && data == 't12mnth_gp') {
            return Score[0].RLFYGP;
        }
        else if (Score[0] && data == 't12mnth_gpm') {
            return Score[0].RLFYGPM;
        }
        else if (Score[0] && data == 't12mnth_np') {
            return Score[0].RLFYNP;
        }
        else if (Score[0] && data == 't12mnth_npv') {
            return Score[0].RLFYNPV;
        }
        //middle 8 //
        else if (Score[0] && data == 'pv_to_bv') {
            return Score[0].PVBV;
        }
        else if (Score[0] && data == 'fy_nsv') {
            return Score[0].stovar;
        }

        else if (Score[0] && data == 'lq_opm') {
            return Score[0].LATHYOPM;
        }

        //last 3 //

        else if (Score[0] && data == 'out_standing_shares') {
            return Score[0].OutStandingShares;
        }
        else if (Score[0] && data == 'ttm_ind_pe') {
            return Score[0].IndustryPE_TTM;
        }
        else if (Score[0] && data == 'ttm_roe') {
            return Score[0].ROE_TTM;
        }
        else if (Score[0] && data == 'lq_nsv') {
            return Score[0].vstovar;
        }
        else if (Score[0] && data == 'ttm_dy') {
            return Score[0].DivYield;
        }
    }

    let resultArr = [];
    resultArr = listedCheck.filter(item => {
        return CheckList.find(i => {
            // console.log(i, " === ", item.value, " = ", i === item.value)
            return i === item.value;
        });
    });

    console.log(resultArr.length)




    return (
        <View style={{ width: '100%', height: 300 }}>
            {/* {Score && Score.map((item,i)=>{
            return(
            <View key={i}>
       <Itemm value= {item?.EQC} title='Equity'/>
        <Itemm value= {item?.EQC} title='Face Value'/>
        <Itemm value= {item?.RES} title='Reserves'/>
        <Itemm value= {item?.DIV} title='Dividend (%)'/>
        <Itemm value= {item?.STO} title='Sales turnover'/>
        <Itemm value= {item?.RLFYYRC} title='Trailing 12 months YRC
'/>
        <Itemm value= {item?.RLFYSTO} title='Trailing   months STO'/>
        <Itemm value= {item?.RLFYOP} title='Trailing 12 month OP'/>
        <Itemm value= {item?.RLFYOPM} title='Trailing 12 Months...'/>
        <Itemm value= {item?.RLFYGP} title='Trailing 12 months gp'/> 
        </View>
               
              
              // Score[0].conVertText(item?.value
               
                
            )
        })} */}

            {resultArr.length > 0 && resultArr.map((item, i) => {
                return (
                    <View key={i}>
                        <Itemm value={conVertText(item?.value, Score)} title={item?.label} />
                    </View>
                )
            })}

        </View>
    )
}

export default ScoreCard

const styles = StyleSheet.create({})