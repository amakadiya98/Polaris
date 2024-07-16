




// Directly opan Modal
// import React, { useState, useRef, useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeIcon from 'react-native-vector-icons/Foundation';
// import Inbox from 'react-native-vector-icons/FontAwesome6';
// import Tag from 'react-native-vector-icons/Ionicons';
// import Menu from 'react-native-vector-icons/SimpleLineIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './screens/HomeScreen';
// import CreateOrderScreen from './screens/CreateOrderScreen';
// import AddProductScreen from './screens/AddProductScreen';
// import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
// import Line from 'react-native-vector-icons/Ionicons';
// import Analytics from 'react-native-vector-icons/MaterialCommunityIcons';
// import Setting from 'react-native-vector-icons/Ionicons';

// const Tab = createBottomTabNavigator();

// const { height: DEVICE_HEIGHT } = Dimensions.get('window');

// const CustomModal = ({ visible }) => {
//   useEffect(alert("xfghjk"))
//   const [modalHeight, setModalHeight] = useState(0);
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         if (gestureState.dy > 0) {
//           Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(_, gestureState);
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.dy > 100) {
//           Animated.timing(pan, {
//             toValue: { x: 0, y: DEVICE_HEIGHT },
//             duration: 300,
//             useNativeDriver: false,
//           }).start();
//         } else if (gestureState.dy < -100) {
//           setModalHeight(650);
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             friction: 10,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   useEffect(() => {
//     if (visible) {
//       setModalHeight(360); // Reset modal height when modal becomes visible
//     }
//   }, [visible]);

//   return (
//     <Animated.View
//       style={[
//         styles.modalContainer,
//         { transform: [{ translateY: pan.y }], height: modalHeight || 360 },
//       ]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.optionsContainer}>
//         <View style={styles.lineStyle}><Line name="remove-outline" color="#EEEEEE" size={50} /></View>
//         <View style={styles.optionContent}>
//           <View style={styles.options}>
//             <Analytics name="google-analytics" color="black" size={22} />
//             <Text style={styles.optionsText}>Analytics</Text>
//           </View>
//           <View style={styles.options}>
//             <Setting name="settings-outline" color="black" size={22} />
//             <Text style={styles.optionsText}>Settings</Text>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// export default function Nav() {
//   const [modalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarShowLabel: false,
//           tabBarActiveTintColor: 'black',
//           tabBarInactiveTintColor: 'grey',
//           headerShown: false,
//         }}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <HomeIcon name="home" color={color} size={28} />
//             ),
//           }}
//         />
//         <Tab.Screen name="CreateOrderScreen" component={CreateOrderScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Inbox name="inbox" color={color} size={20} />
//             ),
//           }} />
//         <Tab.Screen name="Add" component={AddProductScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Tag name="pricetag-outline" color={color} size={25} />
//             ),
//           }} />
//         <Tab.Screen name="Option"
//   options={{
//     tabBarIcon: ({ color, size }) => (
//       <Menu name="menu" color={color} size={22} />
//     ),
//     tabBarButton: (props) => (
//       <TouchableOpacity
//         {...props}
//         onPress={toggleModal}
//       />
//     ),
//   }}
// >
//   {() => <CustomModal visible={modalVisible} />}
// </Tab.Screen>

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   optionsContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   optionContent: {
//     flex: 1,
//   },
//   lineStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: -12,
//   },
//   options: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   optionsText: {
//     marginLeft: 15,
//     fontSize: 17,
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     elevation: 5, // elevation for Android shadow
//   },
// });




// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeIcon from 'react-native-vector-icons/Foundation';
// import Inbox from 'react-native-vector-icons/FontAwesome6';
// import Tag from 'react-native-vector-icons/Ionicons';
// import Menu from 'react-native-vector-icons/SimpleLineIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './screens/HomeScreen';
// import CreateOrderScreen from './screens/CreateOrderScreen';
// import OptionScreen from './screens/OptionScreen';
// import AddProductScreen from './screens/AddProductScreen';

// const Tab = createBottomTabNavigator();

// export default function Nav() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarShowLabel: false,
//           tabBarActiveTintColor: 'black',
//           tabBarInactiveTintColor: 'grey',
//           headerShown: false,
//         }}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <HomeIcon name="home" color={color} size={28} />
//             ),
//           }}
//         />
//         <Tab.Screen name="CreateOrderScreen" component={CreateOrderScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Inbox name="inbox" color={color} size={20} />
//             ),
//           }} />
//         <Tab.Screen name="Add" component={AddProductScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Tag name="pricetag-outline" color={color} size={25} />
//             ),
//           }} />
//         <Tab.Screen name="Option" component={OptionScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Menu name="menu" color={color} size={22} />
//             ),
//           }} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }




/////////////////////////////////////////
// custom Modal
// import React, { useState, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
// import Line from 'react-native-vector-icons/Ionicons';
// import Analytics from 'react-native-vector-icons/MaterialCommunityIcons';
// import Setting from 'react-native-vector-icons/Ionicons';

// const { height: DEVICE_HEIGHT } = Dimensions.get('window');

// const CustomModal = ({ onClose }) => {
//   const pan = useRef(new Animated.ValueXY()).current;
//   const modalHeightAnimation = useRef(new Animated.Value(360)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         if (gestureState.dy > 0) {
//           Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(_, gestureState);
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.dy > 100) {
//           Animated.timing(pan, {
//             toValue: { x: 0, y: DEVICE_HEIGHT },
//             duration: 400,
//             useNativeDriver: false,
//           }).start(() => onClose());
//         } else if (gestureState.dy < -100) {
//           Animated.timing(modalHeightAnimation, {
//             toValue: 650,
//             duration: 400,
//             useNativeDriver: false,
//           }).start();
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             friction: 10,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <Animated.View
//       style={[
//         styles.modalContainer,
//         { transform: [{ translateY: pan.y }], height: modalHeightAnimation },
//       ]}
//       {...panResponder.panHandlers}
//     >
//       <View style={styles.optionsContainer}>
//         <View style={styles.lineStyle}><Line name="remove-outline" color="#EEEEEE" size={55} /></View>
//         <View style={styles.optionContent}>
//           <TouchableOpacity>
//             <View style={styles.options}>
//               <Analytics name="google-analytics" color="black" size={22} />
//               <Text style={styles.optionsText}>Analytics</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={styles.options}>
//               <Setting name="settings-outline" color="black" size={22} />
//               <Text style={styles.optionsText}>Settings</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleModal} style={styles.button}>
//         <Text style={styles.buttonText}>Open</Text>
//       </TouchableOpacity>
//       {modalVisible && <CustomModal onClose={toggleModal} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   optionsContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     zIndex:5
//   },
//   optionContent: {
//     flex: 1,
//   },
//   lineStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: -35,
//   },
//   options: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   optionsText: {
//     marginLeft: 15,
//     fontSize: 16,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18,
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     elevation: 5,
//   },
// });
// export default App;


//////////////////////////////////////////


// packge modal

import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import SwipeUpDown from 'react-native-swipe-up-down';
import Line from 'react-native-vector-icons/Ionicons';
import Analytics from 'react-native-vector-icons/MaterialCommunityIcons';
import Setting from 'react-native-vector-icons/Ionicons';

const ItemFull = ({ hide }) => (
  <View style={styles.optionsContainer}>
    <View style={styles.lineStyle}><Line name="remove-outline" color="#EEEEEE" size={50} /></View>
    <View style={styles.container}>
      <View style={styles.options}>
        <Analytics name="google-analytics" color="black" size={22} />
        <Text style={styles.optionsText}>Analytics</Text>
      </View>
      <View style={styles.options}>
        <Setting name="settings-outline" color="black" size={22} />
        <Text style={styles.optionsText}>Settings</Text>
      </View>
    </View>
  </View>
);

export default function OptionScreen() {
  const swipeUpDownRef = useRef(null);
  const [showOptions, setShowOptions] = useState(true);

  const handleSwipe = (swipeDirection) => {
    if (swipeDirection === 'up') {
      swipeUpDownRef.current.setSwipeHeight(0);
      setShowOptions(true);
    } else if (swipeDirection === 'down') {
      swipeUpDownRef.current.setSwipeHeight(20);
      setShowOptions(false);
    }
  };

  return (
    <View style={[styles.containerMain, showOptions ? {} : { display: 'none' }]}>
      <SwipeUpDown
        ref={swipeUpDownRef}
        itemMini={(show) => <ItemFull show={show} />}
        itemFull={(hide) => <ItemFull hide={hide} />}
        animation="easeInEaseOut"
        disableSwipeIcon
        swipeHeight={100}
        extraMarginTop={5}
        style={{ backgroundColor: '#000', borderRadius: 40 }}
        onSwipe={handleSwipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    position: 'relative',
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lineStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -12,
  },
  options: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  optionsText: {
    marginLeft: 15,
    fontSize: 17,
  },
});
