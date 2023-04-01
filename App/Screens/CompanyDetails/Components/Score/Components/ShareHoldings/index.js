import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {VictoryPie, VictoryLabel} from 'victory-native';
import {Svg, Circle} from 'react-native-svg';
import axios from 'axios';
import {fontSizeH4} from '../../../../../../Components/width';

const {width, height} = Dimensions.get('window');

const ShareHoldings = ({shareHolding}) => {
  const allState = useSelector(state => state);
  // console.log('$$$### ALL STATE: ', JSON.stringify(allState.CompanyDetails));

  const [yrcData, setYrcData] = React.useState([]);
  const [currentSelection, setCurrentSelection] = useState(shareHolding[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDoughnut, setSelectedDoughnut] = useState([]);
  const [colorScale, setColorScale] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);

  useEffect(() => {
    const yrc = shareHolding.map((item, index) => ({
      custom: moment(item.YRC, 'YYYYMM').format('MMM YYYY'),
      date: item.YRC,
      id: index,
    }));
    // console.log('GFHJ#$%^&: ', shareHolding, yrc);
    setYrcData(yrc);
    createDoughnutData();
  }, [shareHolding, createDoughnutData]);

  const PPMSUBTOT = 'PPMSUBTOT';
  const PPFSUBTOT = 'PPFSUBTOT';
  const PPISUBTOT = 'PPISUBTOT';
  const PPSUBTOT = 'PPSUBTOT';
  const PCUSTOTH = 'PCUSTOTH';
  const PCUST = 'PCUST';
  const PADR = 'PADR';
  const PGDR = 'PGDR';

  const createDoughnutData = useCallback(() => {
    const searchData = [
      {
        title: PPMSUBTOT,
        fill: 'rgb(207, 234, 224)',
        name: 'Promoters/Indian',
      },
      {
        title: PPFSUBTOT,
        fill: 'rgb(90, 231, 179)',
        name: 'Promoters/Foreign',
      },
      {
        title: PPISUBTOT,
        fill: 'rgb(38, 185, 124)',
        name: 'Non-Promoters/DIIS',
      },
      {
        title: PPSUBTOT,
        fill: 'rgb(51, 160, 100)',
        name: 'Non-Promoters/Public',
      },
      {
        title: PCUSTOTH,
        fill: 'rgb(19, 119, 41)',
        name: 'Depository Receipts',
      },
      {title: PCUST, fill: 'rgb(207, 234, 224)', name: 'Depository Receipts'},
      {title: PADR, fill: 'rgb(36, 114, 85)', name: 'ADR'},
      {title: PGDR, fill: 'rgb(101, 154, 132)', name: 'GDR'},
    ];
    const doughnut = [];
    const color = [];
    const newData = searchData.map(item => item);
    newData.forEach((item, index) => {
      const length = searchData.length;
      const y = Number(
        ((Number(currentSelection[item?.title]) / 100) * 10).toFixed(1),
      );
      if (y > 0 && item.title !== PCUSTOTH && item.title !== PCUST) {
        doughnut.push({
          x: index + 1,
          y: Number(
            ((Number(currentSelection[item?.title]) / 100) * 10).toFixed(1),
          ),
          text: item.title,
          label: String(Number(currentSelection[item?.title]).toFixed(0)) + '%',
          percent: Number(Number(currentSelection[item?.title]).toFixed(2)),
          name: item.name,
        });
        color.push(item.fill);
      }
      if (item.title === PCUSTOTH) {
        const nextData = searchData[index + 1];
        if (
          Number(currentSelection[item?.title]) > 0 ||
          Number(currentSelection[nextData?.title]) > 0
        ) {
          console.log('$$$$$#### NEXT DATA: ', typeof nextData, nextData);
          doughnut.push({
            x: index + 1,
            y: Number(
              (
                (Number(currentSelection[item?.title]) / 100) * 10 +
                (Number(currentSelection[nextData?.title]) / 100) * 10
              ).toFixed(1),
            ),
            text: `${item.title} + ${nextData['title']}`,
            label:
              String(
                Number(
                  Number(currentSelection[item?.title]) +
                    Number(currentSelection[nextData?.title]),
                ).toFixed(0),
              ) + '%',
            percent: Number(
              (
                Number(currentSelection[item?.title]) +
                Number(currentSelection[nextData?.title])
              ).toFixed(2),
            ),
            name: item.name,
          });
          color.push(item.fill);
        }
      }
    });
    console.log('$$$$$ SELECTED DOUGHNUT: ', doughnut);
    setSelectedDoughnut(doughnut);
    setColorScale(color);
  }, [selectedIndex, currentSelection]);

  useEffect(() => {
    createDoughnutData();
  }, [createDoughnutData]);

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 0,
      }}>
      <TouchableWithoutFeedback>
        <>
          <Svg
            style={{
              alignItems: 'center',
              borderColor: 'green',
              borderWidth: 0,
            }}
            // width={width * 0.8}
            // height={width * 0.8}
            viewBox={`0 ${width * 0.18} ${width * 0.8} ${width * 0.8}`}>
            {/* <Circle cx={150} cy={150} r={50} fill="#FFFFFF" /> */}
            <VictoryPie
              colorScale={colorScale}
              standalone={false}
              width={width * 0.8}
              height={width * 0.8}
              innerRadius={width * 0.15}
              data={selectedDoughnut}
              labelRadius={width * 0.175}
              style={{labels: {fontSize: 12, fill: 'white'}}}
              labelPlacement={'parallel'}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: 'data',
                          mutation: dataProps => {
                            console.log(
                              'item selected is',
                              JSON.stringify(dataProps),
                            );
                            setSelectedLabel(dataProps);
                            return {style: {fill: '#39B5E06F'}};
                          },
                        },
                      ];
                    },
                    onPressOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: dataProps => {
                            // console.log('item selected is', dataProps);
                            setSelectedLabel(null);
                            return null;
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            {!!selectedLabel && (
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: fontSizeH4().fontSize + 3,
                }}
                x={width * 0.4}
                y={width * 0.4}
                text={
                  selectedLabel
                    ? `${selectedLabel?.datum?.name} (${selectedLabel?.slice?.data?.percent})`
                    : ''
                }
              />
            )}
          </Svg>
          <View style={{position: 'absolute', bottom: width * 0.5}}>
            <FlatList
              data={yrcData}
              numColumns={3}
              keyExtractor={item => `${item.date}`}
              renderItem={({item, index}) => {
                if (index === selectedIndex) {
                  return (
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        width: Math.floor(width * 0.3),
                        borderColor: 'black',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderBottomColor: '#12626C',
                        borderBottomWidth: 4,
                        paddingVertical: 5,
                        marginTop: 15,
                      }}>
                      <Text>{item.custom}</Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedIndex(index);
                        setCurrentSelection(shareHolding[index]);
                      }}
                      style={{
                        width: Math.floor(width * 0.3),
                        borderColor: 'black',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        paddingVertical: 5,
                        marginTop: 15,
                      }}>
                      <Text>{item.custom}</Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ShareHoldings;
