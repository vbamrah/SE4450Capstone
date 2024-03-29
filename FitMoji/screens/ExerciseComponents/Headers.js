import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Badge from './Badge';

const Headers = _ => (
  <React.Fragment>
    <View style={styles.icons}>
    </View>
    <View>
      <Text style={styles.headerText}>Conquer Your</Text>
      <Text style={styles.headerText}>
        <Text style={styles.pinkText}>Fitness</Text> Journey
      </Text>
      <View style={styles.badges}>
        <Badge name="Exercises" style={styles.firstBadge}/>
        <Badge name="Exercise History"  style={styles.badge} />
      </View>
    </View>
  </React.Fragment>
);

const styles = StyleSheet.create({
  icons: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 90,
    marginTop: -130
  }, rightBtns: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: "grey"
  },
  pinkText: {
    color: "#4da6ff",
  },
  exercise: {
    marginRight: 20,
  },
  badges: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: -65,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  }
  });

export default Headers;
