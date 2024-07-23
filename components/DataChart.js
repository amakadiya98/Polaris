import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';


export default function DataChartComponent({ data }) {


 
  return (
    <>
     <View style={styles.sessionCard}>
          <View style={styles.session}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Added to cart</Text>
                <Text style={styles.numSession}>{data?.[0]?.addedToCart || 0} sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>{(data?.[0]?.addedToCartPercentage || 0).toFixed(2).replace('.00', '')}%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>



          <View style={styles.session}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Reached checkout</Text>
                <Text style={styles.numSession}>{data?.[0]?.reachToCheckoutCart || 0} sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>{(data?.[0]?.reachToCheckoutCartPercentage || 0).toFixed(2).replace('.00', '')}%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>



          <View style={styles.lastSession}>
            <View style={styles.sessionContent}>
              <View style={styles.leftSession}>
                <Text style={styles.sessionText}>Session converted</Text>
                <Text style={styles.numSession}>{data?.[0]?.paidCart || 0} sessions</Text>
              </View>
              <View style={styles.rightSession}>
                <Text style={styles.sessionText}>{(data?.[0]?.paidCartPercentage || 0).toFixed(2).replace('.00', '')}%</Text>
                <Text style={{ marginLeft: 20, color: "gray" }}>—</Text>
              </View>
            </View>
          </View>

        </View>
    </>
  );
}

const styles = StyleSheet.create({
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
        minHeight: 250,
        marginBottom: 16,
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
      sessionContent: {
        paddingHorizontal: 8,
        flexDirection: "row"
      },
});

