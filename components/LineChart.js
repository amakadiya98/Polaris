import react from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
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

    if (!data || data.length === 0) {
        return (
            <View>
                <Text>No data available for this date range</Text>
            </View>
        );
    }

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

    data = data?.map(item => item.from && item.to ? { ...item, name: selectedDatelabel } : item) // formatDateRange(item.from, item.to)
    console.log(JSON.stringify(data), "<==data new")
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

    console.log(JSON.stringify(data), 'formatted data')

    // // Assuming `data` is passed as a prop to this component
    // const formattedData = data[0].data; // Extract the data array

    // // Separate non-zero and zero values
    // const nonZeroData = formattedData.filter(item => item.value !== 0);
    // const zeroData = formattedData.filter(item => item.value === 0);

    // // Ensure we get exactly 5 data points
    // let selectedData = [];
    // if (nonZeroData.length >= 5) {
    //     // If there are at least 5 non-zero values, pick the first 5
    //     selectedData = nonZeroData.slice(0, 5);
    // } else {
    //     // If there are fewer than 5 non-zero values, include them all
    //     selectedData = nonZeroData;

    //     // Fill the remaining slots with zero values
    //     const remainingSlots = 5 - nonZeroData.length;
    //     const additionalZeroData = zeroData.slice(0, remainingSlots);
    //     selectedData = [...selectedData, ...additionalZeroData];
    // }

    // // Ensure we have exactly 5 data points
    // selectedData = selectedData.slice(0, 5);

    // const labels = selectedData.map(item => item.key);
    // const values = selectedData.map(item => item.value);

    const formattedData = data[0].data;
    const nonZeroData = formattedData.filter(item => item.value !== 0);
    const zeroData = formattedData.filter(item => item.value === 0);

    let selectedData = [];
    if (nonZeroData.length < 5) {
        const totalZeros = 5 - nonZeroData.length;
        const zerosBefore = Math.floor(totalZeros / 2);
        const zerosAfter = Math.ceil(totalZeros / 2);

        // Add zero data before non-zero data
        selectedData = [...zeroData.slice(0, zerosBefore)];

        // Add non-zero data
        selectedData = [...selectedData, ...nonZeroData];

        // Add zero data after non-zero data
        selectedData = [...selectedData, ...zeroData.slice(0, zerosAfter)];
    } else {
        selectedData = nonZeroData.slice(0, 5);
    }

    // Ensure exactly 5 data points
    selectedData = selectedData.slice(0, 5);

    const labels = selectedData.map(item => item.key);
    const values = selectedData.map(item => item.value);

    console.log(granularity, '<----- granularity')


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
            <Text style={styles.chartHeadText}>{isCurrency && (storeConfig?.currency_alignment === 'left') ? storeConfig.currency_symbol : ''}{formatNumbers((total ? total[0] : sum) || 0).replace('.00', '')} {isCurrency && (!storeConfig?.currency_alignment || storeConfig?.currency_alignment === 'right') ? storeConfig?.currency_symbol : ''}</Text>

            <LineChart
                // data={{
                //   labels: [],
                //   datasets: []
                // }}
                // data={chartData}
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: values,
                        },
                    ],
                }}
                width={Dimensions.get('window').width + 30}
                height={220}
                chartConfig={chartConfig}
                withVerticalLines={false}
                withDots={false}
                bezier
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
    // style: {
    //     borderRadius: 16,
    // },
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

const styles = StyleSheet.create({
    chartHeadText: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 22,
        fontWeight: "700",
        color: "black",
        fontFamily: "Roboto-Regular"
    },
})

export default LineChartComponent;
