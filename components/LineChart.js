import react from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { formatCurrency, formatNumbers } from '../utils/currency';


function determineGranularity(data) {

    console.log(data, '<=== data in determineGranularity');
    const dateRange = data[0]?.name?.split(" - ");
    const startStr = dateRange[0].trim();
    const endStr = dateRange[1].trim();

    console.log(startStr, "<=== startStr in determineGranularity");
    console.log(endStr, "<=== endStr in determineGranularity");

    const startDate = moment(startStr, "MMMM D, YYYY");
    const endDate = moment(endStr, "MMMM D, YYYY");

    const diffDays = endDate.diff(startDate, 'days');
    console.log(diffDays, 'diffDays');

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

function generateYLabels(minValue, maxValue, count = 5) {
    const step = (maxValue - minValue) / (count - 1);
    const labels = [];
    for (let i = 0; i < count; i++) {
      labels.push(minValue + i * step);
    }
    return labels;
  }

const LineChartComponent = (
    {
        dateRange,
        title,
        data,
        storeConfig,
        isCurrency = true,
        showTotal = true,
        selectedDatelabel,
        total
    }
) => {

    const datalabel = data?.map(item => ({
        from: item.from,
        to: item.to
    }));

    console.log(data, 'data in line chart component')

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

    const chartData = {
        labels: data?.[0]?.data?.slice(0, 5).map(item => item.key) || [],
        datasets: [
            {
                data: data?.[0]?.data?.slice(0, 5).map(item => item.value) || [],
            }
        ]
    };

    console.log(chartData, 'chartdata')  


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


    return (
        <View>
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
                style={{ paddingRight: 50 }}
                formatYLabel={(yValue) => `${isCurrency && storeConfig?.currency_alignment === 'left' ? storeConfig.currency_symbol : ''}${isCurrency ? formatCurrency(yValue) : yValue}${isCurrency && (!storeConfig?.currency_alignment || storeConfig?.currency_alignment === 'right') ? storeConfig?.currency_symbol : ''}`}
            />
        </View>
    )
}

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
    yAxisSuffix: '',
    yAxisInterval: 1,
  };

  export default LineChartComponent;