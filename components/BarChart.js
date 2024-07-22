// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// export default function BarChartComponent({data}) {

//   console.log(data, "data in barchart component")

//   if (data[0].data && data[0].data.length <= 0) {
//     return <View style={{alignItems:'center', justifyContent:'center'}}>
//         <Text>There was no data found for this date range.</Text>
//     </View>
// }
//   // const data = {
//   //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//   //   datasets: [
//   //     {
//   //       data: [20, 45, 28, 80, 99, 43],
//   //     },
//   //   ],
//   // };

//   const generateChartData = (inputData) => {
//     const labels = inputData.map(item => item.name);
//     const dataValues = inputData.map(item => item.data.length > 0 ? item.data.reduce((acc, val) => acc + val, 0) : 0); // Summing up values if data array has elements
  
//     return {
//       labels,
//       datasets: [
//         {
//           data: dataValues,
//         },
//       ],
//     };
//   };
  
//   const chartData = generateChartData(data);

//   const chartConfig = {
//     backgroundColor: '#ffffff',
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     decimalPlaces: 2, // optional, defaults to 2dp
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     fillShadowGradient: '#53B7D5',
//     fillShadowGradientOpacity: 1,
//     strokeWidth: 0, 
//     style: {
//       borderRadius: 16,
//     },
//     propsForHorizontalLabels: {
//       fontSize: 12,
//     },
//     barPercentage: 1.3,
//     // propsForBackgroundLines: {
//     //   strokeDasharray: "", // solid line
//     //   strokeWidth: 0, // this will make the lines transparent
//     // },
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="auto" />
//       <View style={styles.chartContainer}>
//         <View style={styles.chartRotation}>
//           <BarChart
//             data={data}
//             width={Dimensions.get('window').width - 16} 
//             height={Dimensions.get('window').width}
//             fromZero={true}
//             showValuesOnTopOfBars={true}
//             chartConfig={chartConfig}
//             verticalLabelRotation={0}
//             horizontalLabelRotation={0}
//             yLabelsOffset={30}
//             withInnerLines={true}
//             withHorizontalLabels={true}
//             style={{
//                 paddingTop:30
//             }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chartContainer: {
//     alignItems: 'center',
//   },
//   chartTitle: {
//     fontSize: 18,
//     marginBottom: 16,
//   },
//   chartRotation: {
//     transform: [{ rotate: '90deg' }],
//   },
// });


import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

export default function BarChartComponent({ data }) {

  console.log(data, "data in barchart component");

  // Check if data is empty or undefined
  if (!data || !data[0] || !data[0].data ) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>There was no data found for this date range.</Text>
      </View>
    );
  }

  // Function to generate chart data dynamically
  const generateChartData = (inputData) => {
    const labels = inputData.map(item => item.name);
    const dataValues = inputData.map(item => item.data.length > 0 ? item.data.reduce((acc, val) => acc + val, 0) : 0);

    return {
      labels,
      datasets: [
        {
          data: dataValues,
        },
      ],
    };
  };

  const chartData = generateChartData(data);

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
    propsForBackgroundLines: {
      strokeDasharray: "", 
      strokeWidth: 0, 
    },
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
      <StatusBar style="auto" />
      <View style={styles.chartContainer}>
        <View style={styles.chartRotation}>
          <BarChart
            data={chartData}
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
              paddingTop: 30,
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
  noDataText: {
    fontSize: 16,
    color: '#7F7F7F',
    textAlign: 'center',
  },
});

