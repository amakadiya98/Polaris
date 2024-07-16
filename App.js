import React, { useRef, useState } from 'react';
import NavBar from './navBar';
import Dotes from 'react-native-vector-icons/Entypo';
import Support from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/Ionicons';
import Contact from 'react-native-vector-icons/Octicons';
import Store from 'react-native-vector-icons/Ionicons';
import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { PolarisVizProvider } from '@shopify/polaris-viz-native';
import BarChart from './ChartDemo';


const App = () => {
  const drawer = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.mainContent}>
        <TouchableOpacity onPress={() => setActiveItem('item1')}>
          <View style={[styles.sidebarList, activeItem === 'item1' && styles.activeSidebarList]}>
            <View style={styles.listContent}>
              <View style={styles.logoStyles}><Text style={styles.storeLogo}>MS</Text></View>
              <View style={styles.storeStyles}><Text style={styles.storeName}>My Store</Text></View>
              <TouchableOpacity><Dotes name="dots-three-vertical" color="gray" size={20} /></TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveItem('item2')}>
          <View style={[styles.sidebarList, activeItem === 'item2' && styles.activeSidebarList]}>
            <View style={styles.listContent}>
              <View style={[styles.logoStyles, styles.SelogoStyles]}><Text style={styles.storeLogo}>Se</Text></View>
              <View style={styles.storeStyles}><Text style={styles.storeName}>Sleepeeness - Dormez efin</Text></View>
              <TouchableOpacity><Dotes name="dots-three-vertical" color="gray" size={20} /></TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>




      <View style={styles.optionContent}>
        <TouchableOpacity>
          <View style={styles.options}>
            <Contact name="person" style={styles.iconsStyles} color="#31363F" size={22} />
            <Text style={styles.optionsText}>Name</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.options}>
            <Store name="storefront-outline" style={styles.iconsStyles} color="black" size={20} />
            <Text style={styles.optionsText}>Add store</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.options}>
            <Support name="questioncircleo" style={styles.iconsStyles} color="black" size={20} />
            <Text style={styles.optionsText}>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.options}>
            <Setting name="settings-outline" style={styles.iconsStyles} color="black" size={20} />
            <Text style={styles.optionsText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  // return <BarChart />

  return (

    // <PolarisVizProvider>
      <View style={{ marginTop: 10, height: '100%' }}>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          renderNavigationView={navigationView}>
          <View style={styles.container}>
            <NavBar />
          </View>
        </DrawerLayoutAndroid>
      </View>
    // </PolarisVizProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30
  },
  navigationContainer: {
    backgroundColor: 'white',
    zIndex: 2,
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: '100%',
    flexDirection: "column",
    justifyContent: "space-between"
  },
  listContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sidebarList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
  },
  activeSidebarList: {
    backgroundColor: '#F6F5F2',
    borderRadius: 16,
  },
  logoStyles: {
    backgroundColor: '#23c929',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 0,
    minWidth: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  SelogoStyles: {
    backgroundColor: '#00FFAB',
  },
  storeLogo: {
    fontSize: 13,
    fontWeight: "500"
  },
  storeStyles: {
    marginRight: 5,
    width: "70%"
  },
  storeName: {
    fontSize: 15,

  },
  optionsContainer: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 5
  },
  lineStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -35,
  },
  options: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  iconsStyles: {
    width: 22
  },
  optionsText: {
    marginLeft: 10,
    fontSize: 16,
  },
  dropdownPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#616161',
    borderRadius: 8,
    paddingLeft: 28,
    paddingRight: 4,
    paddingVertical: 4,
    flex: 1,
    color: '#b5b5b5'
  },
  toggleBtn: {
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchIconInput: {
    position: 'relative',
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    top: 9,
    left: 5,
  },
  msDropdown: {
    backgroundColor: '#23c929',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4a4a4a'
  },
  msText: {
    fontSize: 12,
    opacity: 0.7,
    color: '#033d05',
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

});

export default App;