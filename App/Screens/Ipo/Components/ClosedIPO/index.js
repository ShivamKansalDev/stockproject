import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import IndexItem from '../IndexItem'
import BseAndNse from '../BseAndNse'
import DatePickerView from '../../../../Components/DatePickerView'

import Octicons from 'react-native-vector-icons/Octicons';

import moment from 'moment';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getCloseIpo } from '../../../../Action/Unlisted'

import DataLoder from '../../../../Components/Lodder/DataLoder'

import NoDataViewFlatList from '../../../../Components/NoDataViewFlatList'
import DateTimePicker from '../../../../Components/DateTimePicker';
import { getWidthnHeight, fontSizeH4, getMarginTop } from '../../../../Components/width'

// let year = `${moment().year()}`;
// let month = `${moment().month() + 1}`;
// month = (month < 10) ? `0${month}` : month;
let currentDate = moment(moment().subtract(28, 'days')).format('DD-MMM-YYYY');
// console.log("!!@@@ DATE: ", currentDate)
const currentTime = "12:00 AM";
const currentDateTime = `${(currentDate)} ${currentTime}`;
const utcTimeStamp = moment(currentDateTime, "DD-MMM-YYYY hh:mm A").utc().toDate();
const fromMinDate = moment(currentDate, "DD-MMM-YYYY").subtract(50, 'years').format('DD-MMM-YYYY');
const fromUTCTimeStamp = moment(`${(fromMinDate)} ${currentTime}`, "DD-MMM-YYYY hh:mm A").utc().toDate();

const ClosedIPO = ({ getCloseIpo }) => {
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false)
    const [loder, setloder] = useState(true)
    const [fromDate, setFromDate] = useState(currentDate);
    const [fromTimeStamp, setFromTimeStamp] = useState(moment(currentDateTime, "DD-MMM-YYYY hh:mm A").valueOf());
    const [fromTime, setFromTime] = useState('12:00 AM');
    const [fromMinDate, setFromMinDate] = useState(fromUTCTimeStamp)
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);

    const [toDate, setToDate] = useState(moment().format("DD-MMM-YYYY"));
    const [toTimeStamp, setToTimeStamp] = useState(moment().valueOf());
    const [toTime, setToTime] = useState('11:59 PM');
    // const [toMinDate, setToMinDate] = useState(utcTimeStamp)
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const startDate1 = moment(moment().subtract(28, 'days')).format('DD-MMM-YYYY')
    const endDate1 = moment(new Date()).format('DD-MMM-YYYY')


    const { CloseIpo } = useSelector(state => state.CloseIpo)

    // console.log('CloseIpo\n\n', moment(currentDateTime, "DD-MMM-YYYY hh:mm A").valueOf(), '\n', moment().valueOf())

    useEffect(() => {
        getCloseIpo(setloder, bseAndNse.toLowerCase(), fromDate, toDate)
    }, [bseAndNse])

    useEffect(() => {
        getCloseIpo(setloder, bseAndNse.toLowerCase(), fromDate, toDate)
    }, [fromDate, toDate])

    // const getDate = (val) => {

    //     setstartDate(moment(val).format('DD-MMM-YYYY'))
    // }
    // const startdatePick = () => {
    //     setDatePickerVisibility(true);

    // };
    // const getDate1 = (val) => {

    //     setEndDate(moment(val).format('DD-MMM-YYYY'))
    // }
    // const startdatePick1 = () => {
    //     setDatePickerVisibility1(true);

    // };

    // const D = moment().subtract(10, 'days')
    // console.log(D);
    // console.log(moment(moment().subtract(10, 'days')).format('DD-MMM-YYYY'))

    useEffect(() => {
        getCloseIpo(setloder, 'bse', fromDate, toDate)
    }, [])

    let toMinDate = moment(`${fromDate} ${toTime}`, "DD-MMM-YYYY hh:mm A").utc().toDate();
    const maxCompiledDate = moment().format("DD-MMM-YYYY");
    let fromMaxDate = moment(`${maxCompiledDate} ${fromTime}`, "DD-MMM-YYYY hh:mm A").utc().toDate();
    return (
        <>
            {loder ? <DataLoder /> : (
                <>
                    <View style={{ height: 20 }}></View>
                    <View style={styles.container}>

                        {/* <View style={{
                            width: '70%', flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ width: '45%', height: 50, }}>
                                <Text style={{ fontSize: 10, marginLeft: 3, fontWeight: '500', color: '#686868' }}>Start Date</Text>

                                <TouchableOpacity
                                    onPress={startdatePick} style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#FAFAFA',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderRadius: 5,
                                        height: 35,
                                        paddingHorizontal: 5
                                    }}>
                                    <Text>{fromDate}</Text>
                                    <Octicons name="triangle-down" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '45%', height: 50, }}>
                                <Text style={{ fontSize: 10, marginLeft: 3, fontWeight: '500', color: '#686868' }}>End Date</Text>

                                <TouchableOpacity
                                    onPress={startdatePick1} style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#FAFAFA',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderRadius: 5,
                                        height: 35,
                                        paddingHorizontal: 5
                                    }}>
                                    <Text>{toDate}</Text>
                                    <Octicons name="triangle-down" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View> */}
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderColor: 'red', borderWidth: 0 }]}>
                            <View style={[{ borderColor: 'red', borderWidth: 0 }]}>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={[{ fontSize: (fontSizeH4().fontSize - 3), color: '#0F9764', fontWeight: 'bold', textAlign: 'center' }, styles.boldFont]}>Start Date</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowFromDatePicker(!showFromDatePicker)}
                                >
                                    <View
                                        style={[{
                                            alignItems: 'center', justifyContent: 'center', borderRadius: 5,
                                            borderColor: '#C4C4C4', borderWidth: 0, backgroundColor: "#FFFFFF"
                                        }]}>
                                        <Text style={[{ padding: getWidthnHeight(3).width, color: '#000000', fontSize: (fontSizeH4().fontSize + 1) }]}>{fromDate || 'Select Date'}</Text>
                                    </View>
                                </TouchableOpacity>
                                {(showFromDatePicker) && (
                                    <DateTimePicker
                                        styleBox={{ flex: 1 }}
                                        date={moment(fromTimeStamp).utc().toDate()}
                                        androidMode='default'
                                        mode='date'
                                        is24Hour={false}
                                        placeholder='Select Date'
                                        format='DD-MMM-YYYY'
                                        minDate={fromMinDate}
                                        maxDate={fromMaxDate}
                                        onDateChange={(event, newDate) => {
                                            if (event.type === "dismissed") {
                                                setShowFromDatePicker(false)
                                                return;
                                            }
                                            setShowFromDatePicker(false)
                                            const fromTimeStamp = event.nativeEvent.timestamp;
                                            //console.log('From Date: ', fromTimeStamp, ">", toTimeStamp, "=", fromTimeStamp > toTimeStamp)
                                            if (fromTimeStamp > toTimeStamp) {
                                                setToDate(moment(newDate).format("DD-MMM-YYYY"))
                                                setToTimeStamp(fromTimeStamp)
                                                setShowToDatePicker(false)
                                            }
                                            setFromDate(moment(newDate).format("DD-MMM-YYYY"))
                                            setFromTimeStamp(fromTimeStamp)
                                            setShowToDatePicker(false)
                                        }}
                                    />
                                )}
                            </View>
                            <View style={{ marginHorizontal: getWidthnHeight(3).width }}>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={[{ fontSize: (fontSizeH4().fontSize - 3), color: '#0F9764', fontWeight: 'bold', textAlign: 'center' }, styles.boldFont]}>End Date</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowToDatePicker(!showToDatePicker)}
                                >
                                    <View
                                        style={[{
                                            alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: '#C4C4C4',
                                            borderWidth: 0, backgroundColor: "#FFFFFF"
                                        }]}>
                                        <Text style={[{ padding: getWidthnHeight(3).width, color: '#000000', fontSize: (fontSizeH4().fontSize + 1) }]}>{toDate || 'Select Date'}</Text>
                                    </View>
                                </TouchableOpacity>
                                {(showToDatePicker) && (
                                    <DateTimePicker
                                        styleBox={{ flex: 1 }}
                                        date={moment(toTimeStamp).utc().toDate()}
                                        // disabled={(fromDateError)? true : false}
                                        androidMode='default'
                                        mode='date'
                                        is24Hour={false}
                                        placeholder='Select Date'
                                        format='DD-MMM-YYYY'
                                        minDate={toMinDate}
                                        maxDate={fromMaxDate}
                                        onDateChange={(event, newDate) => {
                                            if (event.type === "dismissed") {
                                                setShowToDatePicker(false)
                                                return;
                                            }
                                            setShowToDatePicker(false);
                                            const toTimeStamp = event.nativeEvent.timestamp;
                                            setToDate(moment(newDate).format("DD-MMM-YYYY"))
                                            setToTimeStamp(toTimeStamp)
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={{
                            width: '30%', height: 50, alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <BseAndNse bseAndNse={bseAndNse}
                                bse={() => setbseAndNsee('BSE')}
                                nse={() => setbseAndNsee('NSE')} />
                        </View>



                    </View>
                    <FlatList

                        showsVerticalScrollIndicator={false}
                        data={CloseIpo}
                        keyExtractor={(item, i) => i.toString()}
                        renderItem={({ item }) => {

                            return (
                                <IndexItem
                                    data={item}
                                    title={item?.Lname.length > 18 ? `${item?.Lname.substring(0, 18)}...` : item?.Lname}

                                    price={item?.ISSUEPRI2}
                                    color={item?.PerChange > 0 ? "green" : "red"}
                                    volume={item.ISSUEPRICE ? item.ISSUEPRICE : item.ISSUEPRICE}
                                    volume1={item?.Allotmentprice}
                                    senSExType={`${bseAndNse}:`}



                                    percent={item?.LISTPRICE > 0 ? `+${(Number(item?.LISTPRICE.toFixed(2)))}%` : `${(Number(item?.LISTPRICE.toFixed(2)))}%`}
                                    date={item?.LISTDATE ? moment(item?.LISTDATE).format('Do MMM, h:mm') : moment(item?.LISTDATE).format('Do MMM, h:mm')}
                                />
                            )
                        }}


                        ListEmptyComponent={() => {
                            return <NoDataViewFlatList />;
                        }}
                    />



                </>
            )}
            {/* <DatePickerView getDate={getDate}
                isDatePickerVisible={isDatePickerVisible}
                setDatePickerVisibility={setDatePickerVisibility}
            /> */}
            <DatePickerView
            />
        </>
    )
}

export default connect(null, { getCloseIpo })(ClosedIPO)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingBottom: 10
    },
    forDate: {
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        //alignSelf: 'center', 
        borderColor: 'black',
        borderWidth: 0,
        marginTop: getMarginTop(-1).marginTop,
        width: 50,
        height: 16,
        marginLeft: 10,
    }
})