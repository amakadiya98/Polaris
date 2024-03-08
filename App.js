import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable 
} from 'react-native';


const App = () => {
  const drawer = useRef(null);
  
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.sidebarList}>
        <View style={styles.sidebarListItem}>
            <View style={styles.leftPartside}>
              <Image
                style={styles.sidebarIcon}
                source={require('./assets/sidebar/1.png')}
              />  
              <Text style={styles.sidebarText}>Orders</Text>
            </View>
        </View>
        <View style={styles.sidebarListItem}>
            <View style={styles.leftPartside}>
              <Image
                style={styles.sidebarIcon}
                source={require('./assets/sidebar/1.png')}
              />  
              <Text style={styles.sidebarText}>Products</Text>
            </View>
        </View>
        <View style={styles.sidebarListItem}>
            <View style={styles.leftPartside}>
              <Image
                style={styles.sidebarIcon}
                source={require('./assets/sidebar/1.png')}
              />  
              <Text style={styles.sidebarText}>Customers</Text>
            </View>
        </View>
      </View>
        {/* <Button
          title="Close drawer"
          onPress={() => drawer.current.closeDrawer()}
        /> */}
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={navigationView}>
      <StatusBar />
      <View style={styles.container}>
        {/* <View style={styles.headerPart}>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => drawer.current.openDrawer()}>
          <Image
            style={styles.toggleLogo}
            source={require('./assets/toggle.png')}
          />  
          </TouchableOpacity>
          <View style={styles.searchIconInput}>
            <View style={styles.searchIcon}>
              <Image
                source={require('./assets/search.png')}
              />  
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor={'#b5b5b5'}
            />
          </View>
         
          <View style={styles.dropdownPart}>
            <Image
              style={styles.tinyLogo}
              source={require('./assets/notification.png')}
            />
            <TouchableOpacity style={styles.msDropdown}>
              <Text style={styles.msText}>MS</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.mainContent}>
          <Text style={styles.pageTitle}>
            Analytics
          </Text>
          <View style={styles.listData}>
            <View style={styles.listItem}>
              <Text style={styles.listItemName}>Reports</Text>
            </View>
            <View style={{...styles.listItem,...styles.listItemLast }}>
              <Text style={{...styles.listItemName}}>Live View</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.analyticsData}>

            <Text style={styles.pageInnerTitle}>
              Analytics
            </Text>
            <View style={styles.darkContentData}>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.btnText}>Today</Text>
              </Pressable>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.btnText}>Compare to: Yesterday</Text>
              </Pressable>
            </View>
           
            <View style={styles.salesCard}>
              <Text style={styles.salesCradTitle}>Total Sales</Text>
            </View>
            <View style={styles.salesCard}>

            </View>
            <View style={styles.salesCard}>

            </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  navigationContainer: {
    backgroundColor: '#ebebeb',
    zIndex: 2,
    position:'relative',
    paddingVertical: 20,
    height: '100%'
  },
  headerPart:{
    paddingHorizontal:16,
    paddingVertical:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:16,
    width:'100%',
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    zIndex: 999,
  },
  dropdownPart:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap:14
  },
  searchInput:{
    borderWidth: 1,
    borderColor: '#616161',
    borderRadius:8,
    paddingLeft:28,
    paddingRight:4,
    paddingVertical: 4,
    flex:1,
    color:'#b5b5b5'
  },
  toggleBtn:{
    width:30,
    height:30,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  searchIconInput:{
    position:'relative',
    flex: 1,
  },
  searchIcon:{
    position:'absolute',
    top:9,
    left:5,
  },
  msDropdown:{
    backgroundColor: '#23c929',
    paddingHorizontal:6,
    paddingVertical:6,
    borderRadius: 6,
    borderWidth:1,
    borderColor: '#4a4a4a'
  },
  msText:{
    fontSize: 12,
    opacity: 0.7,
    color:'#033d05',
  },
  primaryBtn:{
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical:6,
    borderRadius: 6,
    width:'auto',
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    shadowColor: '#171717',
  },
  btnText:{
    fontWeight:'500',
    fontSize:14,
  },
  mainContent:{
    paddingTop: 20,
    paddingHorizontal:4,
  },
  pageTitle:{
    fontSize: 20,
    color: '#303030',
    fontWeight:'600',
    letterSpacing: 0.4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  pageInnerTitle:{
    color: '#2e2e2e',
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal:10,
    paddingVertical:20,
  },
  listData:{
    paddingHorizontal: 10,
  },
  listItem:{
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  listItemLast:{
    borderBottomWidth: 0
  },
  listItemName:{
    fontSize:18,
    color:'#404040'
  },
  salesCard:{
    backgroundColor:'#fff',
    paddingHorizontal: 14,
    paddingVertical: 18,
    minHeight: 360,
    height: 360,
    maxHeight: 360,
    marginBottom:16,
  },
  salesCradTitle:{
    fontSize: 12,
    borderBottomWidth:1,
    borderStyle: 'dotted',
    width:'',
    color:'#363636'
  },
  sidebarListItem:{
    marginBottom: 10
  },
  sidebarText:{
    color: '#303030',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing:0.4,
    flexDirection:'row',
    display:'flex',
    alignItems:'center',
    marginLeft: 4,
  },
  sidebarIcon:{
    marginRight: 0,
    display: 'flex'
  },
  leftPartside:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
  },
  analyticsData:{
    backgroundColor: '#f1f1f1'
  },
  darkContentData:{
    paddingHorizontal:10,
    paddingBottom:40,
    paddingTop:14,
    display: 'flex',
    flexDirection:'row',
    gap: 12
  },
});

export default App;