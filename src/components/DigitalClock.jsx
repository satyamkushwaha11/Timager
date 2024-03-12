import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DigitalClock = () => {
  return (
    <View style={styles.container}>
      <View style={styles.clock}>

        <View style={styles.timerWrapper}>
            <View>
                <Text style={styles.timeDigitText}>00:</Text>
                {/* <Text> h </Text> */}
            </View>
            <View>
                <Text style={styles.timeDigitText}>00:</Text>
                {/* <Text> m</Text> */}
            </View>
            <View>
                <Text style={styles.timeDigitText}>00.32</Text>
                {/* <Text> s</Text> */}
            </View>
        </View>
      </View>
      
    </View>
  );
};

export default DigitalClock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock: {
    width: 380,
    height: 200,
    borderRadius: 140,
    borderWidth: 6,
    borderColor: '#3A0C75',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
   
  },
  timerWrapper:{
    flexDirection:'row',
    // gap:12
  },
  timeDigitText:{
    fontSize:50,
    fontWeight:'bold'
  }
});
