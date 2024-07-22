import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';

export default function DonutChartComponent({ data }) {
  const screenWidth = Dimensions.get('window').width;

  // Check if data is valid
  const isEmpty = !data || (Array.isArray(data) && data.length === 0) || (Array.isArray(data) && data.every(item => !item.data || item.data.length === 0));

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available for this donut chart</Text>
      </View>
    );
  }

  // Process data if it's available
  const chartData = data.map(item => ({
    name: item?.name,
    population: parseInt(item?.value, 10), 
    color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

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
    paddingRight: 20,
  },
  donutOverlay: {
    position: 'absolute',
    top: '8%',
    right: '23%',
  },
  noDataText: {
    fontSize: 16,
    color: '#7F7F7F',
    textAlign: 'center',
  },
});


// import React from 'react';
// import { View, Dimensions, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import Svg, { Circle } from 'react-native-svg';

// export default function DonutChartComponent() {
//   const screenWidth = Dimensions.get('window').width;

//   console.log( data, "data in donut chart component")
//   const data = [
//     {
//       name: 'Seoul',
//       population: 21500000,
//       color: '#17A9E9',
//     },
//     {
//       name: 'Toronto',
//       population: 2800000,
//       color: '#7B58EC',
//     },
//     {
//       name: 'New York',
//       population: 8538000,
//       color: '#5E82EE',
//     },
//     {
//       name: 'Moscow',
//       population: 11920000,
//       color: '#D75FB7',
//     },
//   ];

//   const chartData = data.map((item, index) => ({
//     name: item.name,
//     population: item.population,
//     color: item.color,
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   }));
// // if (!data || data.length === 0) {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.noDataText}>No data available</Text>
// //       </View>
// //     );
// //   }

// // const chartData = data?.map(item => ({
// //     name: item?.name,
// //     population: parseInt(item?.value, 10), 
// //     color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
// //     legendFontColor: '#7F7F7F',
// //     legendFontSize: 15,
// //   }));
  
//   return (
//     <View style={styles.container}>
//       <PieChart
//         data={chartData}
//         width={screenWidth}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//         }}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         paddingRight="15"
//         absolute
//       />
//       <Svg
//         width={screenWidth}
//         height={220}
//         style={styles.donutOverlay}
//       >
//         <Circle
//           cx={screenWidth / 2}
//           cy={110}
//           r={45}
//           fill="#fff"
//         />
//       </Svg>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingRight:20,
//   },
//   donutOverlay: {
//     position: 'absolute',
//     top: '8%',
//     right: '23%'
//   },
// });
