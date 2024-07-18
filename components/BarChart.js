import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function BarChartComponent() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: '#53B7D5',
    fillShadowGradientOpacity: 1,
    strokeWidth: 0, 
    style: {
      borderRadius: 16,
    },
    propsForHorizontalLabels: {
      fontSize: 12,
    },
    barPercentage: 1.3,
    // propsForBackgroundLines: {
    //   strokeDasharray: "", // solid line
    //   strokeWidth: 0, // this will make the lines transparent
    // },
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.chartContainer}>
        <View style={styles.chartRotation}>
          <BarChart
            data={data}
            width={Dimensions.get('window').width - 16} 
            height={Dimensions.get('window').width}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            horizontalLabelRotation={0}
            yLabelsOffset={30}
            withInnerLines={true}
            withHorizontalLabels={true}
            style={{
                paddingTop:30
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  chartRotation: {
    transform: [{ rotate: '90deg' }],
  },
});
