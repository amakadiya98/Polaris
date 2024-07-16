

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/Foundation';
import Inbox from 'react-native-vector-icons/FontAwesome6';
import Tag from 'react-native-vector-icons/Ionicons';
import Menu from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CreateOrderScreen from './screens/CreateOrderScreen';
import OptionScreen from './screens/OptionScreen';
import AddProductScreen from './screens/AddProductScreen';

const Tab = createBottomTabNavigator();






export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <HomeIcon name="home" color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen name="CreateOrderScreen" component={CreateOrderScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Inbox name="inbox" color={color} size={20} />
            ),
          }} />
        <Tab.Screen name="Add" component={AddProductScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Tag name="pricetag-outline" color={color} size={25} />
            ),
          }} />
        <Tab.Screen name="Option" component={OptionScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Menu name="menu" color={color} size={22} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
































// import React, { useState, useRef } from 'react';
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

// const CustomModal = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };
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
//           }).start(()=> toggleModal());
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
//         <Tab.Screen name="Option" component={CustomModal}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Menu name="menu" color={color} size={22} />
//             ),
//           }}>

//         </Tab.Screen>
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
//     elevation: 5
//   },
// });




