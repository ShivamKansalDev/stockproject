import { combineReducers } from 'redux';
import User from './User';
import Ipo from './Ipo';
import SenSexRoute from './SenSexRoute';
import CompanyName from './CompanyName';
import BottoSheetDataList from './BottoSheetDataList';
import ListedNiftySensex from './ListedNiftySensex';
import Deal from './ListedCompanyList/Deal';
//
import BseChart from './ListedLineChart/Bse.js';
import GroupMasterForDomesticIndex from './GroupMasterForDomesticIndex';

import WeekHigh52 from './ListedCompanyList/WeekHigh52';
import DomesticIndex from './ListedCompanyList/DomesticIndex';
import InternationalIndex from './ListedCompanyList/InternationalIndex';
import Sector from './ListedCompanyList/Sector';
import WeekLow52 from './ListedCompanyList/WeekLow52';
import AllHigh from './ListedCompanyList/AllHigh';
import AllLow from './ListedCompanyList/AllLow';
import TopLoser from './ListedCompanyList/TopLoser';
import TopGainer from './ListedCompanyList/TopGainer';

import LowPriceHighVolu from './ListedCompanyList/LowPriceHighVolu';
import FiiDiiActivity from './ListedCompanyList/FiiDiiActivity';
import DomesticIndexLayerTwo from './ListedCompanyList/DomesticIndexLayerTwo';
import DealSeleted from './Seleted/DealSeleted';
import SectorLayerTwo from './ListedCompanyList/LayerTwo/SectorLayerTwo';
import TopLoserDayType from './ListedCompanyList/TopLoser/TopLoserDayType';
import TopLoserGroupType from './ListedCompanyList/TopLoser/TopLoserGroupType';
import TopGainerDayType from './ListedCompanyList/TopGainer/TopGainerDayType';
import TopGainerGroupType from './ListedCompanyList/TopGainer/TopGainerGroupType';
import WeekLow52GroupType from './ListedCompanyList/WeekLow52/WeekLow52GroupType';
import WeekHigh52GroupType from './ListedCompanyList/WeekHigh52/WeekHigh52GroupType';
import AllTimeHigh from './ListedCompanyList/AllHigh/AllTimeHigh';
import AllTimeLow from './ListedCompanyList/AllLow/AllTimeLow';
import ActiveCompanies from './ListedCompanyList/ActiveCompanies';

import FiiDiiActivityType from './ListedCompanyList/FiiDiiActivity/FiiDiiActivityType';
import ExchangeHolidays from './ListedCompanyList/ExchangeHolidays';
//==
import AdvanceDecline from './ListedCompanyList/AdvanceDecline';
import AdvanceDeclineGroupType from './ListedCompanyList/AdvanceDecline/AdvanceDeclineGroupType';
import AdvanceDeclineType from './ListedCompanyList/AdvanceDecline/AdvanceDeclineType';
import LowPriceHighVoluGroup from './ListedCompanyList/LowPriceHighVolu/LowPriceHighVoluGroup';
import LowPriceHighVoluType from './ListedCompanyList/LowPriceHighVolu/LowPriceHighVoluType';
import ActiveCompaniesGroup from './ListedCompanyList/ActiveCompanies/ActiveCompaniesGroup';
import ActiveCompaniesType from './ListedCompanyList/ActiveCompanies/ActiveCompaniesType';

import OutUnderPerform from './ListedCompanyList/OutUnderPerform';
import ForthComing from './Unlisted/ForthComing';
//
import OutUnderPerformType from './ListedCompanyList/OutUnderPerform/OutUnderPerformType';
import OutUnderPerformGroup from './ListedCompanyList/OutUnderPerform/OutUnderPerformGroup';
import OutUnder from './ListedCompanyList/OutUnderPerform/OutUnder';

//
import BestPerformingIPO from './Unlisted/BestPerformingIPO';
import OpenIPO from './Unlisted/OpenIPO';
import NewListing from './Unlisted/NewListing';
import CloseIpo from './Unlisted/CloseIpo';
import UnlistedCompanies from './Unlisted/UnlistedCompanies';

//=========
import IpoRouteNameForFilter from './IpoRouteNameForFilter';

//company details
import CompanyDetails from './CompanyDetails';
import PriceVolume from './CompanyDetails/PriceVolume';
import Score from './CompanyDetails/Score';
import Event from './CompanyDetails/Event';
import CheckList from './CompanyDetails/CheckList';
import Financials from './CompanyDetails/Financials';
import SearchedDetails from './ListedSearch';
import UnlistedDetails from './UnlistedSearch';
import AllTimeHighGroup from './ListedCompanyList/AllHigh/AllTimeHighGroup';
import AllTimeLowGroup from './ListedCompanyList/AllLow/AllTimeLowGroup';
import WatchList from './WatchList';
import ChannelDetails from './Channel';

//

const rootReducer = combineReducers({
    BseChart,
    User,
    Ipo,
    SenSexRoute,
    CompanyName,
    ForthComing,
    BottoSheetDataList,
    ListedNiftySensex,
    Deal,
    OutUnderPerform,
    WeekHigh52,
    DomesticIndex,
    InternationalIndex,
    Sector,
    WeekLow52,
    AllHigh,
    AllLow,
    TopLoser,
    TopGainer,
    LowPriceHighVolu,
    GroupMasterForDomesticIndex,
    FiiDiiActivity,
    ActiveCompanies,
    //============
    DomesticIndexLayerTwo,
    DealSeleted,
    SectorLayerTwo,
    TopLoserDayType,
    TopLoserGroupType,
    TopGainerDayType,
    TopGainerGroupType,
    //====
    WeekLow52GroupType,
    WeekHigh52GroupType,
    AllTimeHigh,
    AllTimeHighGroup,
    AllTimeLow,
    AllTimeLowGroup,
    FiiDiiActivityType,
    ExchangeHolidays,
    ActiveCompaniesGroup,
    ActiveCompaniesType,
    //=====
    AdvanceDecline,

    // ==
    AdvanceDeclineGroupType,
    AdvanceDeclineType,
    LowPriceHighVoluGroup,
    LowPriceHighVoluType,
    // ==
    IpoRouteNameForFilter,

    //======
    BestPerformingIPO,
    OpenIPO,
    NewListing,
    CloseIpo,
    //
    OutUnderPerformType,
    OutUnderPerformGroup,
    OutUnder,
    UnlistedCompanies,
    //
    CompanyDetails,
    PriceVolume,
    Score,
    Event,
    CheckList,
    Financials,
    SearchedDetails,
    UnlistedDetails,
    WatchList,
    ChannelDetails
});
export default rootReducer;
