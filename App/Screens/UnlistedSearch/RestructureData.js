import {
  equityPaidUp,
  capitalEmployed,
  totalDebt,
  netSales,
  ebta,
  ebt,
  pat,
  eps,
  sgrth1,
  sgrth4,
  opm,
  patmrgn,
  intrcvrg,
} from './types';

export const RestructureStandAloneData = (standaloneData, callBack) => {
  let modifyStandaloneData = [];
  standaloneData.forEach((item, index) => {
    if (item.has_data) {
      if (!!item?.show_balance_sheet) {
        modifyStandaloneData.push({
          balanceSheet: item.balance_sheet,
        });
      }
      if (!!item?.show_profit_and_loss) {
        modifyStandaloneData.push({
          profitLoss: item.profit_and_loss,
        });
      }
      if (!!item?.show_ratios) {
        modifyStandaloneData.push({
          ratios: item.ratios,
        });
      }
    }
  });
  const newStandAlone = modifyStandaloneData.map(item => item);
  const updateData = assignTitleValues(newStandAlone);
  callBack(updateData);
};

export const RestructureConsolidatedData = (consolidatedData, callBack) => {
  let modifyConsolidatedData = [];
  consolidatedData.forEach((item, index) => {
    // console.log('#@#@ FOR: ', index);
    if (item.has_data) {
      if (!!item?.show_balance_sheet) {
        modifyConsolidatedData.push({
          balanceSheet: item.balance_sheet,
        });
      }
      if (!!item?.show_profit_and_loss) {
        modifyConsolidatedData.push({
          profitLoss: item.profit_and_loss,
        });
      }
      if (!!item?.show_ratios) {
        modifyConsolidatedData.push({
          ratios: item.ratios,
        });
      }
    }
  });
  const newConsolidatedData = modifyConsolidatedData.map(item => item);
  const updateData = assignTitleValues(newConsolidatedData);
  callBack(updateData);
};

function assignTitleValues(modifyData) {
  return modifyData.map((item, index) => {
    let balanceSheet = !!item?.balanceSheet;
    let profitLoss = !!item.profitLoss;
    let ratios = !!item.ratios;
    let balanceSheetData = null;
    let profitLossData = null;
    let ratiosData = null;
    if (balanceSheet) {
      balanceSheetData = item.balanceSheet;
      if (balanceSheetData?.equity_share_capital) {
        balanceSheetData.equity_share_capital = {
          ...balanceSheetData.equity_share_capital,
          title: equityPaidUp,
        };
      }
      if (balanceSheetData?.capital_employed) {
        balanceSheetData.capital_employed = {
          ...balanceSheetData.capital_employed,
          title: capitalEmployed,
        };
      }
      if (balanceSheetData?.total_debt) {
        balanceSheetData.total_debt = {
          ...balanceSheetData.total_debt,
          title: totalDebt,
        };
      }
      return {
        balanceSheet: balanceSheetData,
        id: `${index + 1}`,
        name: 'Balance Sheet',
      };
    } else if (profitLoss) {
      profitLossData = item.profitLoss;
      if (profitLossData?.revenue_from_operation) {
        profitLossData.revenue_from_operation = {
          ...profitLossData.revenue_from_operation,
          title: netSales,
        };
      }
      if (profitLossData?.ebitda) {
        profitLossData.ebitda = {
          ...profitLossData.ebitda,
          title: ebta,
        };
      }
      if (profitLossData?.operating_profit) {
        profitLossData.operating_profit = {
          ...profitLossData.operating_profit,
          title: ebt,
        };
      }
      if (profitLossData?.pat) {
        profitLossData.pat = {
          ...profitLossData.pat,
          title: pat,
        };
      }
      if (profitLossData?.eps) {
        profitLossData.eps = {
          ...profitLossData.eps,
          title: eps,
        };
      }
      return {
        profitLoss: profitLossData,
        id: `${index + 1}`,
        name: 'Profit And Loss',
      };
    } else if (ratios) {
      ratiosData = item.ratios;
      if (ratiosData?.growth_percentage_1) {
        ratiosData.growth_percentage_1 = {
          ...ratiosData.growth_percentage_1,
          title: sgrth1,
        };
      }
      if (ratiosData?.growth_percentage_4) {
        ratiosData.growth_percentage_4 = {
          ...ratiosData.growth_percentage_4,
          title: sgrth4,
        };
      }
      if (ratiosData?.opm_percentage) {
        ratiosData.opm_percentage = {
          ...ratiosData.opm_percentage,
          title: opm,
        };
      }
      if (ratiosData?.pat_margin) {
        ratiosData.pat_margin = {
          ...ratiosData.pat_margin,
          title: patmrgn,
        };
      }
      if (ratiosData?.interest_coverage_ratio) {
        ratiosData.interest_coverage_ratio = {
          ...ratiosData.interest_coverage_ratio,
          title: intrcvrg,
        };
      }
      return {
        ratios: ratiosData,
        id: `${index + 1}`,
        name: 'Ratios',
      };
    }
  });
}
