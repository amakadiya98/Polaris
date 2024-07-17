import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RightTopArrow from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { formatCurrency, formatNumbers } from '../utils/currency';
import moment from 'moment';

function determineGranularity(data) {
  console.log(data, '<=== data in determineGranularity')
  const startDate = new Date(data[0]?.name?.split(" - ")[0]);
  const endDate = new Date(data[0]?.name?.split(" - ")[1]);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
      return 'hours';
  } else if (diffDays <= 90) {
      return 'days';
  } else {
      return 'months';
  }
}

function fillMissingDatesWithZeros(data, from, to) {
  // Create a map to store data by date
  const dataMap = new Map();

  // Fill the map with data from the original array
  data.forEach(entry => {
      const date = moment(entry.key, 'D MMM YYYY');
      dataMap.set(date.format('YYYY-MM-DD'), entry.value);
  });

  // Get the start and end dates from parameters
  const startDate = moment(from);
  const endDate = moment(to);

  // Loop through each date between the start and end dates
  const currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
      const formattedDate = currentDate.format('MMM DD');
      // If the date is not in the map, add it with a value of 0
      if (!dataMap.has(formattedDate)) {
          dataMap.set(formattedDate, 0);
      }
      // Move to the next date
      currentDate.add(1, 'days');
  }


  // Convert the map back to an array of objects
  let filledData = Array.from(dataMap, ([key, value]) => ({ key, value }));

  // Sort the filledData array by date
  filledData.sort((a, b) => moment(a.key, 'YYYY-MM-DD').diff(moment(b.key, 'YYYY-MM-DD')));

  return filledData;
}

function fillMissingHoursWithZeros(data) {
  // if (!data || data.length === 0) {
  //     return [];
  // }

  // Create a map to store data by hour
  const dataMap = new Map();

  // Fill the map with data from the original array
  data.forEach(entry => {
      const hour = moment(entry.key, 'hh:mm A').format('hh:mm A');
      dataMap.set(hour, entry.value);
  });

  // Get the first and last hours in the data
  const firstHour = '00:00';
  const lastHour = '23:00';

  // Loop through each hour between the first and last hour
  let currentHour = moment(firstHour, 'hh:mm A');
  const lastHourMoment = moment(lastHour, 'hh:mm A');
  while (currentHour.isSameOrBefore(lastHourMoment)) {
      const formattedHour = currentHour.format('hh:mm A');
      // If the hour is not in the map, add it with a value of 0
      if (!dataMap.has(formattedHour)) {
          dataMap.set(formattedHour, 0);
      }
      // Move to the next hour
      currentHour.add(1, 'hour');
  }

  // Convert the map back to an array of objects
  let filledData = Array.from(dataMap, ([key, value]) => ({ key, value }));

  // Sort the filledData array by hour
  filledData.sort((a, b) => {
      const hourA = moment(a.key, 'hh:mm A');
      const hourB = moment(b.key, 'hh:mm A');
      return hourA.diff(hourB);
  });

  return filledData;
}

function fillMissingMonthsWithZeros(data, from, to) {
  // Convert from and to dates to moment objects
  const fromDate = moment(from);
  const toDate = moment(to);

  // Create a map from the input data for easy access
  const dataMap = new Map([]) // (data?.map(item => [moment(item.key, 'MMM YYYY').valueOf(), item.value]) || []);

  // Fill in missing months with a value of 0
  const filledData = [];
  for (let date = fromDate.clone(); date.isSameOrBefore(toDate); date.add(1, 'month')) {
      const monthName = date.format('MMM');
      const year = date.year();
      const key = `${monthName} ${year}`;
      const value = dataMap.has(date.valueOf()) ? dataMap.get(date.valueOf()) : 0;
      filledData.push({ key, value });
  }

  // Update filledData with the provided data
  data.forEach(item => {
      const key = moment(item.key, 'MMM YYYY').valueOf();
      const existingIndex = filledData.findIndex(entry => moment(entry.key, 'MMM YYYY').valueOf() === key);
      if (existingIndex !== -1) {
          filledData[existingIndex].value = item.value;
      }
  });

  return filledData;
}

const CommonCard = ({ dateRange,
  title,
  chart,
  data,
  storeConfig,
  isCurrency = true,
  showTotal = true,
  selectedDatelabel,
  total }) => {

  const datalabel =  data?.map(item => ({
    from: item.from,
    to: item.to
  }));

console.log(data, 'data heree...')


// Determine the granularity from the data
const granularity = determineGranularity(data);

const titleFormatter = (value) => {
    const date = moment.utc(value) // new Date(value);

    if (granularity === 'hours') {
        return date.format('LT')
        // return `${date.toLocaleTimeString('en-US', {
        //     hour: 'numeric',
        //     minute: '2-digit',
        // })}`;
    } else if (granularity === 'days') {
        return date.format('LL')
        // return `${date.toLocaleDateString('fr-FR', {
        //     dateStyle: 'medium',
        // })}`;
    } else {
        return date.format('MMM YYYY')
        // return `${date.toLocaleDateString('fr-FR', {
        //     month: 'long',
        // })} ${date.getFullYear()}`;
    }
}

// changing name format to fr
// console.log(data,'data in card')
// data = data.data
data = data?.map(item => item.from && item.to ? { ...item, name: selectedDatelabel } : item) // formatDateRange(item.from, item.to)
// summing up same key data for better calculations
data = data?.map(item => {
    let tempDataPoints = {}
    item.data?.map(dp => {
        if (!tempDataPoints[titleFormatter(dp.key)]) {
            tempDataPoints[titleFormatter(dp.key)] = 0
        }
        if (typeof dp.value !== 'number') {
            dp.value = parseFloat(dp.value)
        }
        tempDataPoints[titleFormatter(dp.key)] += dp.value
    })

    let tempData = Object.keys(tempDataPoints)?.map(key => ({ key, value: tempDataPoints[key] }))
    if (granularity === 'days') {
        tempData = fillMissingDatesWithZeros(tempData, item.from, item.to)
    } else if (granularity === 'hours') {
        // console.log(tempData, ' <=== tempData before')
        tempData = fillMissingHoursWithZeros(tempData)
        // console.log(tempData, ' <=== tempData after')
    } else {
        // console.log(tempData, ',.,.,. data before')
        tempData = fillMissingMonthsWithZeros(tempData, item.from, item.to)
        // console.log(tempData, ',.,.,. data after')
    }
    return {
        ...item,
        data: tempData
    }
})

console.log(granularity, '<----- granularity')

// console.log(data, '<---formated data')
const chartData = {
  labels: data?.[0]?.data?.map(item => item.key) || [],
  datasets: [
    {
      data: data?.[0]?.data?.map(item => item.value) || [],
    }
  ]
};

console.log(chartData , 'chartdata')


let sum
    if (showTotal) {
        sum = data?.[0]?.data?.reduce((total, current) => total + current?.value, 0)
    }

    let noItems = true
    if (data && data.length > 0) {
        noItems = false
    }

    let isSingle = false
    let singleData = {}
    if (data?.[0]?.data?.length == 1) {
        isSingle = true
        singleData = data?.[0]?.data?.[0]
    }

  const getChart = (chart) => {
    
    switch (chart) {
      case 'line':
        return (
          <>
            <LineChart
              // data={{
              //   labels: [],
              //   datasets: []
              // }}
              data={chartData}
              width={Dimensions.get('window').width + 50}
              height={220}
              chartConfig={chartConfig}
              withVerticalLines={false}
              withDots={false}
              bezier
              formatYLabel={(yValue) => `${isCurrency && storeConfig?.currency_alignment === 'left' ? storeConfig.currency_symbol : ''}${isCurrency ? formatCurrency(yValue) : yValue}${isCurrency && (!storeConfig?.currency_alignment || storeConfig?.currency_alignment === 'right') ? storeConfig?.currency_symbol : ''}`}
            />
          </>
        );
      default:
        return <Text>No data found for this chart</Text>;
    }
  };
  return (
    <View style={styles.salesCard}>
      <View style={styles.salesCardHeader}>
        <TouchableOpacity>
          {/* <Text style={styles.salesCardTitle}>Average Order Value</Text> */}
          <Text style={styles.salesCardTitle}>{title}</Text>
          
        </TouchableOpacity>
        <Material style={styles.salesIcon} name="text-box-search-outline" color="gray" size={20} />
      </View>
      <View style={styles.headTextContainer}>
      <Text style={styles.chartHeadText}>{isCurrency && (storeConfig?.currency_alignment === 'left') ? storeConfig.currency_symbol : ''}{formatNumbers((total ? total[0] : sum) || 0).replace('.00', '')} {isCurrency && (!storeConfig?.currency_alignment || storeConfig?.currency_alignment === 'right') ? storeConfig?.currency_symbol : ''}</Text>

        {/* <Text style={styles.chartHeadText}>€59.82 </Text>
        // <RightTopArrow name="arrow-top-right" size={18} color="#2D765A" style={{ marginTop: -12 }} />
        // <Text style={styles.percentageText}>15%</Text> */}
      </View>
      {/* <LineChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        withVerticalLines={false}
        withDots={false}
        bezier
        formatYLabel={(yValue) => `€${yValue}`}
        style={{ paddingRight: 50 }}
      /> */}
      {getChart(chart)}
      <View style={styles.labelContainer}>
        <View style={styles.dataLabel}>
          <View style={styles.gradientLine}>
            <View style={styles.gradient} />
          </View>
          <Text style={styles.dataLabelText}>
            Jul 4, 2023 - Jul 2, 2024
          </Text>
        </View>
      </View>
    </View>
  );
};

// const chartConfig = {
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => '#53B7D5',
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     borderRadius: 16,
//   },
//   propsForBackgroundLines: {
//     strokeDasharray: '',
//     stroke: 'rgba(0, 0, 0, 0.1)',
//   },
//   strokeWidth: 2,
//   fillShadowGradientFromOpacity: 0.1,
//   fillShadowGradientToOpacity: 0,
//   yAxisSuffix: '',
//   yAxisInterval: 1,
// };

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => '#53B7D5',
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: 'rgba(0, 0, 0, 0.1)',
  },
  strokeWidth: 2,
  fillShadowGradientFromOpacity: 0.1,
  fillShadowGradientToOpacity: 0,
  yAxisLabel: '', // Add this line if you want a specific label prefix/suffix
  yAxisInterval: 1, // Keep this to set interval to 1
  decimalPlaces: 2, // If you want to show 2 decimal places, adjust as needed
  propsForLabels: {
    fontSize: 12, // Adjust this to control font size of labels
  },
  yLabelsOffset: 0, // Adjust this if you want to offset the y-axis labels
};

const styles = StyleSheet.create({
  salesCard: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 18,
    minHeight: 360,
    marginBottom: 16,
    elevation: 1
  },
  salesIcon: {
    marginRight: 2
  },
  salesCardTitle: {
    fontSize: 18,
    borderBottomWidth: 1.4,
    borderStyle: "dotted",
    borderColor: "#CBCBCB",
    fontFamily: "Inter-Regular",
    fontWeight: "800"
  },
  salesCardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  percentageText: {
    fontWeight: "500",
    color: "#2D765A",
    fontFamily: "Inter-Regular",
    fontSize: 10,
    marginTop: -10
  },
  labelcontainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 20,
    alignItems: 'center'
  },
  dataLabel: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15

  },
  dataLabelText: {
    color: '#6C6B71',
    fontFamily: "Inter-Regular",
  },

  gradientLine: {
    width: 18,
    height: 2,
    overflow: 'hidden',
    marginRight: 8
  },
  gradient: {
    flex: 1,
    backgroundColor: '#53B7D5',
    backgroundImage: 'linear-gradient(to right, #64B5F6, #2196F3, #1976D2, #0D47A1)',
  },
  chartHeadText: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "black",
    fontFamily: "Roboto-Regular"
  },
})


export default CommonCard;