import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import BrandImage from '../../Components/BrandImage';
import CompanyBanner from './CompanyBanner';
import {getWidthnHeight} from '../../Components/width';
import {ButtonSelection} from '../../Components/Buttons';

const ListedSearch = ({navigation}) => {
  const {SearchedDetails} = useSelector(state => state.SearchedDetails);
  useEffect(() => {
    console.log('##$#$#$$ LISTED SEARCH SCREEN ', SearchedDetails);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <ProfileHeader />
      <BrandImage />
      <CompanyBanner CompanyDetails={SearchedDetails} />
      <ButtonSelection />
    </SafeAreaView>
  );
};

export default ListedSearch;
