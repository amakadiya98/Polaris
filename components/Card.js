import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RightTopArrow from 'react-native-vector-icons/MaterialCommunityIcons';
import LineChart from './LineChart'
import Barchart from './BarChart'
import { formatCurrency, formatNumbers } from '../utils/currency';
import moment from 'moment';
import DonutChart from './DonutChart';
import DataChart from './DataChart';

const CommonCard = ({
  dateRange,
  title,
  chart,
  data,
  storeConfig,
  isCurrency = true,
  showTotal = true,
  selectedDatelabel,
  total }) => {

  console.log(data, 'data heree...')


  const getChart = (chart) => {

    switch (chart) {

      case 'line':
        return (
          <LineChart dateRange={dateRange} data={data} storeConfig={storeConfig} isCurrency={isCurrency} selectedDatelabel={selectedDatelabel} />
        );
      case 'bar':
        return (
          <Barchart data={data} />
        )
      case 'donut':
        return (
          <DonutChart data={data} />
        )
      case 'data':
        return (
          <DataChart data={data} />
        )
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
      </View>

      {getChart(chart)}
      
      {/* <View style={styles.labelContainer}>
        <View style={styles.dataLabel}>
          <View style={styles.gradientLine}>
            <View style={styles.gradient} />
          </View>
          <Text style={styles.dataLabelText}>
            {selectedDatelabel.start} - {selectedDatelabel.end}
          </Text>
        </View>
      </View> */}
      <View style={styles.labelcontainer}>
            <View style={styles.dataLabel}>
              <View style={styles.gradientLine}>
                <View style={styles.gradient} />
              </View>
              <Text style={styles.dataLabelText}>
              {selectedDatelabel.start} - {selectedDatelabel.end}
              </Text>
            </View>
          </View>
    </View>
  );
};

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
    marginRight: 5

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