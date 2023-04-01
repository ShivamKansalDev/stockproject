import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import {
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryChart,
  Background,
  VictoryGroup,
  VictoryLine,
  VictoryPie,
  VictoryLabel
} from 'victory-native';
import { useSelector, useDispatch } from 'react-redux';
import { COMPANY_FINANCIALS_SELECTED } from '../../../../../../ActionType/CompanyDetails';

const Finance = () => {
  const dispatch=useDispatch()
  const { data } = useSelector(state => state.Financials)
  // const { volume2 } = useSelector(state => state.PriceVolume)
  const { name } = useSelector(state => state.Financials)
  // const { val } = useSelector(state => state.PriceVolume)
  const [seteted,setSelected]=useState('sale')


  const getData=(id,text)=>{
    
    dispatch({
      type:COMPANY_FINANCIALS_SELECTED,
      id:id
    })
    setSelected(text);

  }
  return (
    <>


      <VictoryChart>
        <VictoryBar
          style={{ data: { fill: "#0F9764", width: 35 } }}
          data={data}
        />
        <VictoryAxis />
        {
          name.map((d, i) => {
            return (
              <VictoryAxis


                key={i}
                offsetY={5}


                style={{
                  tickLabels: { fill: "green" },
                  axis: { stroke: 'none' },
                  ticks: { stroke: "red", size: 0 },
                }}
                axisValue={d}
              />
            );
          })
        }
      </VictoryChart>
      {/* ================ */}
      <View style={{
        marginTop:10,
        width: "100%", flexDirection: 'row', borderTopColor: "#a5a5b0",
        borderTopWidth: .5
      }}>

        
        
        <TouchableOpacity
        onPress={()=>{getData(2, 'sale')}}
        style={styles.bottomLeft}>
          <Text style={{color:seteted==='sale'?'#0F9764':'black'}}>NET Sales</Text>
        </TouchableOpacity>
        <View style={styles.bottomMiddle}>
        <Text style={{color:seteted==='profit'?'#0F9764':'black'}}>Operating Profit</Text>
        </View>
        <TouchableOpacity
        onPress={()=>{getData(28,'pbt')}} style={styles.bottomMiddle}>
        <Text style={{color:seteted==='pbt'?'#0F9764':'black'}}>PBT</Text>
        </TouchableOpacity>
     

      </View>
{/* ===================== */}
      {/* ================ */}
      <View style={{
        width: "100%", flexDirection: 'row', borderTopColor: "#a5a5b0",
        borderTopWidth: .5,
        borderBottomColor:"#a5a5b0",
        borderBottomWidth:.5
      }}>

        
        
<TouchableOpacity
        onPress={()=>{getData(35,'pat')}} style={styles.bottomLeft}>
         <Text style={{color:seteted==='pat'?'#0F9764':'black'}}>PAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{getData(43,'equity')}} style={styles.bottomMiddle}>
         <Text style={{color:seteted==='equity'?'#0F9764':'black'}}>Equity</Text>
        </TouchableOpacity>
        <View style={styles.bottomMiddle}>
          <Text>Debt</Text>
        </View>
     

      </View>
{/* ===================== */}
<View style={{
        width: "100%", flexDirection: 'row', borderTopColor: "#a5a5b0",
        borderTopWidth: .5
      }}>

        
        

        
<View style={styles.bottomLeft1}>
  <Text>Net block</Text>
</View>

      </View>

      {/* ================== */}
      
    </>
  )
}

export default Finance

const styles = StyleSheet.create({
  buttonn: {
    padding: 10, backgroundColor: '#a5a5b0', marginLeft: 5
    , marginBottom: 5
  },
  bottomMiddle:{ width: "40%", height: 40, borderLeftColor: '#a5a5b0',
  justifyContent:'center' ,
  alignItems:'center',
  borderLeftWidth: 1 },
  bottomLeft:{ width: "30%", height: 40,
  justifyContent:'center' ,
  alignItems:'center', },
  bottomLeft1:{ width: "30.5%", height: 40, borderRightWidth:.5, 
  justifyContent:'center' ,
  alignItems:'center',
  borderRightColor:'#a5a5b0' }
})