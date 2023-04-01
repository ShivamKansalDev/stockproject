import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerView = ({
  setDatePickerVisibility,
  getDate,
  isDatePickerVisible,
}) => {
  //=============Date Picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    getDate(date);
    // dispatch({
    //   type: ORDER_FILTER_BY_DATE,
    //   data: moment(date).format('MM-DD-YY'),
    // });

    hideDatePicker();
  };
  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePickerView;

const styles = StyleSheet.create({});