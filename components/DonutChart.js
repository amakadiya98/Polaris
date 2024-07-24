import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';

export default function DonutChartComponent({ data }) {
  const screenWidth = Dimensions.get('window').width;

  console.log( JSON.stringify(data), "data in donut chart component")

  // Check if data is valid
  const isEmpty = !data || (Array.isArray(data) && data.length === 0) || (Array.isArray(data) && data.every(item => !item.data || item.data.length === 0));

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available for this donut chart</Text>
      </View>
    );
  }

  const Colors = ['#7B58EC', '#169FDB', '#5E82EE', '#D75FB7'];

  const chartData = data[0]?.data.map((item, index) => ({
    name: item.name,
    population: parseFloat(item.value), 
    color: Colors[index % Colors.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  })) || [];


  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        paddingRight="15"
        absolute
      />
      <Svg
        width={screenWidth}
        height={220}
        style={styles.donutOverlay}
      >
        <Circle
          cx={screenWidth / 2}
          cy={110}
          r={45}
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutOverlay: {
    position: 'absolute',
    top: '4%',
    right: '19%',
  },
  noDataText: {
    fontSize: 16,
    color: '#7F7F7F',
    textAlign: 'center',
  },
});

