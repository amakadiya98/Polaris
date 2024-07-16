import React, {useState } from 'react';
import TabToday from "../calendarTabs/TabToday";
import TabYesterday from '../calendarTabs/TabYesterday';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native';

export default function CreateOrderScreen() {
  const [showTab, setShowTab] = useState(false);
  const [showTabYesterday, setShowTabYesterday] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

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

          {showTab && <TabToday />}
          {showTabYesterday && <TabYesterday />}
          {/* tab end */}
          {/* Sales by channel */}
          <View style={styles.salesCard}>
            <View style={styles.salesCardHeader}><Text style={styles.salesCradTitle}>Total Sales</Text>
              <Material style={styles.salesIcon} name="text-box-search-outline" color="gray" size={20} /></View>
            <Text style={styles.chartHeadText}>₹0.00 –</Text>
            {/* <Chart/> */}
          </View>
          <View style={styles.salesCard}>
            <View style={styles.salesCardHeader}><Text style={styles.salesCradTitle}>Sales by channel</Text>
              <Material name="text-box-search-outline" style={styles.salesIcon} color="gray" size={20} /></View>
            <View style={styles.noData}>
              <Text style={{ color: "gray" }}>There was no data found for this date range.</Text>
            </View>
          </View>
          <View style={styles.salesCard}>
            <View style={styles.salesCardHeader}><Text style={styles.salesCradTitle}>Sales by channel</Text>
              <Material name="text-box-search-outline" style={styles.salesIcon} color="gray" size={20} /></View>
            <View style={styles.noData}>
              <Text style={{ color: "gray" }}>There was no data found for this date range.</Text>
            </View>
          </View>
          <View style={styles.salesCard}>
            <View style={styles.salesCardHeader}><Text style={styles.salesCradTitle}>Sales by channel</Text>
              <Material name="text-box-search-outline" style={styles.salesIcon} color="gray" size={20} /></View>
            <View style={styles.noData}>
              <Text style={{ color: "gray" }}>There was no data found for this date range.</Text>
            </View>
          </View>
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
}

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
    alignItems:"center",
    borderColor: '#f2f2f2',
    flexDirection: "row"
  },
  listItemLast: {
    borderBottomWidth: 0
  },
  listItemName: {
    fontSize: 17,
    color: '#404040',
    marginLeft:5
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
  salesIcon:{
    marginRight:2
  },
  salesCradTitle: {
    fontSize: 12,
    borderBottomWidth: 1.4,
    borderStyle: "dotted",
    borderColor: "grey",
    fontFamily: "Inter-Regular",
    fontWeight: "600"
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
    fontFamily: "Inter-Regular"
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
  footer:{
    backgroundColor: '#f1f1f1',
    padding:20,
    flexDirection:"row",
    justifyContent:"center"
  },
  footerText:{
    fontSize:15
  },
  footerLink:{
    fontSize:15,
    marginLeft:10,
    color:"#0039a6",
    textDecorationLine:"underline",
  }
});