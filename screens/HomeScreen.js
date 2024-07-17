import React, { useState, useEffect } from 'react';
import TabToday from "../calendarTabs/TabToday";
import TabYesterday from '../calendarTabs/TabYesterday';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RightTopArrow from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { LineChart } from 'react-native-chart-kit';
import Card from '../components/Card';
import moment from 'moment';
import axios from 'axios';
import {urls} from '../config/url';
import {baseUrl} from '../config/url'
import RNSVGSvgView from 'react-native-svg'

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions
} from 'react-native';

export default function HomeScreen() {
  const [showTab, setShowTab] = useState(false);
  const [showTabYesterday, setShowTabYesterday] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dateRange, setDateRange] = useState({ start: today, end: today })
  const [compareDateRange, setCompareDateRange] = useState({ start: today, end: today })
  const [selectedDatelabel, setSelectedDateLabel] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    totalSales: [],
    averageOrderAmount: [],
    conversionRates: [],
    onlineStoreSessions: [],
    totalOrders: [],
    totalSalesByChannel: [],
  })

  
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf')
  });

  useEffect(() => {
    fetchData();
  }, [dateRange, compareDateRange])

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(JSON.stringify({
        dateRange: {
          start: moment.utc(dateRange.start).startOf('day').toDate(),
          end: moment.utc(dateRange.end).endOf('day').toDate(),
        },
        compareDateRange: compareDateRange && compareDateRange.start
          ? {
            start: moment.utc(compareDateRange.start).startOf('day').toDate(),
            end: moment.utc(compareDateRange.end).endOf('day').toDate(),
          }
          : null,
      }), ' <=== request body..')

      const response = await fetch(`${baseUrl}${urls.analytics()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRange: {
            start: moment.utc(dateRange.start).startOf('day').toDate(),
            end: moment.utc(dateRange.end).endOf('day').toDate(),
          },
          compareDateRange: compareDateRange && compareDateRange.start
            ? {
              start: moment.utc(compareDateRange.start).startOf('day').toDate(),
              end: moment.utc(compareDateRange.end).endOf('day').toDate(),
            }
            : null,
        }),
      });
  
      const data = await response.json();
      setData(data);
      console.log('Response Data:', data);
      console.log(data.totalSales, 'totalsales')
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const lastYear = new Date(
    new Date(new Date().setDate(today.getDate() - 365)).setHours(0, 0, 0, 0)
  )

  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
  );


  // console.log(data, "data")
  // 
  function generateRandomNumberFromRange(min, max, decimalPlaces) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  
    // return Math.random() * (max - min) + min;
  }
  
  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  const toggleTab = () => {
    setShowTab((prev) => !prev);
    if (showTabYesterday) setShowTabYesterday(false);
  };

  const toggleTabYesterday = () => {
    setShowTabYesterday((prev) => !prev);
    if (showTab) setShowTab(false);
  };

  // const data = [
  //   { key: 'Jul 2023', value: 60 },
  //   { key: 'Nov 2023', value: 20 },
  //   { key: 'Mar 2023', value: 0 },
  //   { key: 'Apr 2023', value: 0 },
  //   { key: 'May 2023', value: 0 },
  // ];

  // Data for the chart, ensuring 3 items on the x-axis and 5 items on the y-axis
  const labels = ['Jul 2023', 'Nov 2023', 'Mar 2023']; // Only 3 items on x-axis
  const chartDataa = {
    labels: labels,
    datasets: [
      {
        data: [0, 20, 40, 60, 0] // Static values corresponding to the x-axis labels
      },
      // {
      //   data: [0, 60, 30, 10, 12] // Static values corresponding to the x-axis labels
      // }
    ],
  };

  const ranges = [
    {
      title: "Today",
      alias: "today",
      period: {
        since: today,
        until: today,
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: yesterday,
        until: today,
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 30 days",
      alias: "last30days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 30)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 90 days",
      alias: "last90days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 90)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 365 days",
      alias: "last365days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 365)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last month",
      alias: "lastmonth",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Last 12 months",
      alias: "last12months",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Last year",
      alias: "lastyear",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Week to date",
      alias: "weektodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Month to date",
      alias: "monthtodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Quater to date",
      alias: "quatertodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Year to date",
      alias: "yeartodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },

  ];

  const compareRanges = [
    {
      title: "No comparison",
      alias: "nocomparison",
      period: null,
    },

    {
      title: "Today",
      alias: "today",
      period: {
        since: today,
        until: today,
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: yesterday,
        until: today,
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 30 days",
      alias: "last30days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 30)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 90 days",
      alias: "last90days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 90)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last 365 days",
      alias: "last365days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 365)).setHours(
            0,
            0,
            0,
            0
          )
        ),
        until: yesterday,
      },
    },
    {
      title: "Last month",
      alias: "lastmonth",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Last 12 months",
      alias: "last12months",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Last year",
      alias: "lastyear",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Week to date",
      alias: "weektodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Month to date",
      alias: "monthtodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Quater to date",
      alias: "quatertodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },
    {
      title: "Year to date",
      alias: "yeartodate",
      period: {
        since: moment().startOf('month').subtract(1, 'month').startOf('month').startOf('day').toDate(),
        until: moment().startOf('month').subtract(1, 'month').endOf('month').endOf('day').toDate(),
      },
    },

  ];

  const onDateRangeChange = (range) => {
    setDateRange(range)
  }

  const onCompareDateRangeChange = (range) => {
    setCompareDateRange(range)
  }

  // console.log(selectedDatelabel, 'selectedDatelabel')

  const totalOrders = data?.totalOrders?.[0]?.data?.reduce((total, current) => total + current.value, 0) || 0
  const totalSales = data?.totalSales?.[0]?.data?.reduce((total, current) => total + current.value, 0)

  // console.log(data, ' <== data being passed everywhere')

  return (

    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.pageTitle}>
          Analytics
        </Text>
        <View style={styles.listData}>
          <View style={styles.listItem}>
            <View style={styles.listItemIcon}><Material name="text-box-search-outline" color="#404040" size={20} /></View>
            <Text style={styles.listItemName}>Reports</Text>
          </View>
          <View style={{ ...styles.listItem, ...styles.listItemLast }}>
            <View style={styles.listItemIcon}><Material name="access-point-network" color="#404040" size={20} /></View>
            <Text style={styles.listItemName}>Live View</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.analyticsData}>
        <Text style={styles.pageInnerTitle}>
          Analytics
        </Text>
        {/* tab */}
        <View style={styles.darkContentData}>
          <Pressable style={styles.primaryBtn} onPress={toggleTab}>
            <Text style={styles.btnText}><Icon name="calendar" color="black" size={15} />Today</Text>
          </Pressable>
          <Pressable style={styles.primaryBtn} onPress={toggleTabYesterday}>
            <Text style={styles.btnText}>Compare to: Yesterday</Text>
          </Pressable>
        </View>
        <TouchableOpacity style={styles.checkbox} onPress={handlePress}>
          <View style={[styles.checkboxContainer, isChecked && styles.checked]}>
            {isChecked && <Text style={styles.checkIcon}>✓</Text>}
          </View>
          <Text style={styles.label}>Auto-refresh</Text>
        </TouchableOpacity>

        {showTab && <TabToday onChange={onDateRangeChange} value={dateRange} ranges={ranges} setSelectedDateLabel={setSelectedDateLabel} setDateRange={setDateRange} dateRange={dateRange} setShowTab={setShowTab}/>}
        {showTabYesterday && <TabYesterday onChange={onCompareDateRangeChange} value={compareDateRange} label='Compare: ' ranges={compareRanges} setSelectedDateLabel={setSelectedDateLabel} setCompareDateRange={setCompareDateRange} compareDateRange={compareDateRange} setShowTabYesterday={setShowTabYesterday}/>}
        <View style={styles.salesCard}>
          <View style={styles.salesCardHeader}>
            <TouchableOpacity><Text style={styles.salesCradTitle}>Average Order Value</Text></TouchableOpacity>
            <Material style={styles.salesIcon} name="text-box-search-outline" color="gray" size={20} /></View>
          <View style={styles.headTextContainer}>
            <Text style={styles.chartHeadText}>€59.82 </Text>
            <RightTopArrow name="arrow-top-right" size={18} color="#2D765A" style={{ marginTop: -12 }} />
            <Text style={styles.percentageText}>15%</Text>
          </View>
          <LineChart
            data={chartDataa}
            width={Dimensions.get('window').width + 50} // Use the increased width
            height={220}
            chartConfig={chartConfig}
            withVerticalLines={false}
            withDots={false}
            bezier
            formatYLabel={(yValue) => `€${yValue}`}
            style={{
              paddingRight: 50, // Add padding to the right
            }}
          />
          <View style={styles.labelcontainer}>
            <View style={styles.dataLabel}>
              <View style={styles.gradientLine}>
                <View style={styles.gradient} />
              </View>
              <Text style={styles.dataLabelText}>
                Jul 4, 2023- Jul 2, 2024
              </Text>
            </View>
          </View>
        </View>
        <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Total sales"
          chart="line"
          data={data.totalSales}
          selectedDatelabel={selectedDatelabel}
        /> 

        <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Sales by channel"
          chart="bar"
          data={data.totalSalesByChannel || []}
          selectedDatelabel={selectedDatelabel}
          showTotal={false}

        /> 

        {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Online store sessions"
          chart="line"
          data={data.onlineStoreSessions || []}
          isCurrency={false}
          selectedDatelabel={selectedDatelabel}
          showTotal={true}
        /> */}
        {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Online store conversion rate"
          chart="data"
          data={data.conversionRates || []}
          isCurrency={false}
          selectedDatelabel={selectedDatelabel}
          showTotal={true}
        />   */}
       {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Total orders"
          chart="line"
          data={data.totalOrders || []}
          isCurrency={false}
          selectedDatelabel={selectedDatelabel}
          showTotal={true}
        />  */}
         {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Average order value"
          chart="line"
          data={data.averageOrderAmount || []}
          isCurrency={true}
          selectedDatelabel={selectedDatelabel}
          total={[
            (totalSales / (totalOrders || 1)) * (totalOrders > 10 && totalOrders <= 20 ? generateRandomNumberFromRange(0.97, 0.98, 2) : totalOrders > 20 ? generateRandomNumberFromRange(0.94, 0.96, 2) : 1),
          ]}
          showTotal={true}
        /> */}

        {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Retail sales by staff at register"
          chart="bar"
          data={[]} //{data.totalSalesBySource}
          selectedDatelabel={selectedDatelabel}
        />  */}
        {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Sessions by device type"
          chart="donut"
          data={[{...data.visitorsByDevice}] || []}
          isCurrency={false}
          selectedDatelabel={selectedDatelabel}
          showTotal={true}
        />   */}
        {/* <Card
          dateRange={dateRange}
          storeConfig={data.storeConfig}
          title="Retail Sales by POS location"
          chart="bar"
          data={[]} //{data.totalSessionsBySource || []}
          isCurrency={false}
          selectedDatelabel={selectedDatelabel}
          showTotal={true}c
        />  */}

        <View style={styles.sessionCard}>
          <View style={styles.sassionCardHeader}><Text style={styles.salesCradTitle}>Online store conversion rate</Text>
            <Material name="text-box-search-outline" style={styles.salesIcon} color="gray" size={20} /></View>
          <View style={{ flexDirection: "row" }}><Text style={styles.sessionHeadText}>0% <View><Text style={{ color: "gray" }} >—</Text></View> </Text></View>

          <View style={styles.session}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Added to cart</Text>
                <Text style={styles.numSession}>0 sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>0.00%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>



          <View style={styles.session}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Reached checkout</Text>
                <Text style={styles.numSession}>0 sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>0.00%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>



          <View style={styles.lastSession}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Session converted</Text>
                <Text style={styles.numSession}>0 sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>0.00%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>

        </View>


        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Learn more about
          </Text>
          <TouchableOpacity><Text style={styles.footerLink}>overview dashboard</Text></TouchableOpacity>

        </View>




      </ScrollView>
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
  yAxisSuffix: '',
  yAxisInterval: 1,
};

const styles = StyleSheet.create({


  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  primaryBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    width: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    shadowColor: '#171717',
  },
  btnText: {
    fontSize: 13,
    elevation: 5,
    fontWeight: "500"
  },
  mainContent: {
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 19,
    color: '#303030',
    fontWeight: '600',
    letterSpacing: 0.4,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  pageInnerTitle: {
    color: '#2e2e2e',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontFamily: "Inter-Regular"
  },
  listItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: '#f2f2f2',
    flexDirection: "row"
  },
  listItemLast: {
    borderBottomWidth: 0
  },
  listItemName: {
    fontSize: 17,
    color: '#404040',
    marginLeft: 5
  },
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
  salesCradTitle: {
    fontSize: 18,
    borderBottomWidth: 1.4,
    borderStyle: "dotted",
    borderColor: "#CBCBCB",
    fontFamily: "Inter-Regular",
    fontWeight: "800"
  },
  sidebarListItem: {
    marginBottom: 10
  },
  sidebarText: {
    color: '#303030',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.4,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 4,
  },
  sidebarIcon: {
    marginRight: 0,
    display: 'flex'
  },
  leftPartside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  analyticsData: {
    backgroundColor: '#f1f1f1'
  },
  darkContentData: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 12
  },
  salesCardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconStyle: {
    fontWeight: "400",
    fontSize: 10
  },
  noData: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chartHeadText: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "black",
    fontFamily: "Roboto-Regular"
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
  moreText: {
    fontFamily: "Inter-Regular",
    color: '#6C6B71',
    marginRight: 10
  },
  sessionHeadText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "black",
    fontFamily: "Inter-Regular",
    paddingHorizontal: 14
  },
  sessionContent: {
    paddingHorizontal: 14,
    flexDirection: "row"
  },
  listItemIcon: {
    marginLeft: 15,
    marginRight: 10
  },
  sassionCardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14
  },
  sessionCard: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 18,
    minHeight: 360,
    marginBottom: 16,
    elevation: 1
  },
  session: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: '#f2f2f2',
  },
  lastSession: {
    paddingBottom: 15,
    marginTop: 10,
  },
  leftSession: {
    flex: 1.5,
    flexDirection: "column",
  },
  sessionText: {
    fontFamily: "Inter-Regular",
    fontWeight: "600",
  },
  numSession: {
    marginTop: 2,
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
    fontFamily: "Inter-Regular"
  },
  rightSession: {
    alignItems: "center",
    flex: 0.5,
    flexDirection: "row"
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 30,
    marginTop: 5
  },
  checkboxContainer: {
    width: 17,
    height: 17,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: 'black',
  },
  checkIcon: {
    color: 'white',
    fontSize: 10,
  },
  label: {
    fontSize: 12,
    borderBottomWidth: 1.4,
    borderStyle: "dotted",
    borderColor: "grey",
    fontFamily: "Inter-Regular",
    fontWeight: "600"
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  footerText: {
    fontSize: 15
  },
  footerLink: {
    fontSize: 15,
    marginLeft: 10,
    color: "#0039a6",
    textDecorationLine: "underline",
  }
});