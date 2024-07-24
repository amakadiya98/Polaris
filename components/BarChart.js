import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

export default function BarChartComponent({ data }) {

  console.log(JSON.stringify(data), "data in barchart component");

  if (!data || !data[0] || !data[0].data || data[0].data.length == 0 ) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>There was no data found for this date range.</Text>
      </View>
    );
  }

  const labels = data[0].data.map(item => item.key);
    const values = data[0].data.map(item => item.value);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
            },
        ],
    };


  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
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
    barPercentage: 2,
    // propsForBackgroundLines: {
    //   strokeDasharray: "", 
    //   strokeWidth: 0.5, 
    // },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(0, 0, 0, 0.1)',
  },
    // propsForBackgroundLines: {
    //   strokeWidth: 0, // Hide horizontal lines
    // },
    // propsForHorizontalLabels: {
    //   fontSize: 0, // Hide x-axis labels
    //   fill: 'transparent', // Hide x-axis labels
    // },
    // propsForVerticalLabels: {
    //   fontSize: 0, // Hide y-axis labels
    //   fill: 'transparent', // Hide y-axis labels
    // },
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.chartRotation}>
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width-30}
            height={Dimensions.get('window').width-170}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            horizontalLabelRotation={0}
            yLabelsOffset={15}
            withHorizontalLabels={true}
            style={{
              paddingTop: 20,
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
    // transform: [{ rotate: '90deg' }],
  },
  noDataText: {
    fontSize: 16,
    color: '#7F7F7F',
    textAlign: 'center',
  },
});
