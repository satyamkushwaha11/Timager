import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const ClockWithHand = () => {
    const [currentTime, setCurrentTime] = useState(0);
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1 ); // Increment by 10 milliseconds
      }); // Update every 100 milliseconds
  
      return () => clearInterval(intervalId);
    }, []);
  
    const memoizedHandPositions = useMemo(() => {
      const hourDeg = ((currentTime % 43200000) / 43200000) * 360; // 43200000 milliseconds = 12 hours
      const minuteDeg = ((currentTime % 3600000) / 3600000) * 360; // 3600000 milliseconds = 1 hour
      const secondDeg = ((currentTime % 60000) / 60000) * 360; // 60000 milliseconds = 1 minute
      const miliSecondDeg = ((currentTime % 1000) / 1000) * 360; // 1000 milliseconds = 1 second
      return { hourDeg, minuteDeg, secondDeg, miliSecondDeg };
    }, [currentTime]);
  
  
  
  
    //   const intervalId = setInterval(() => {
    //     setCurrentTime(prevTime => prevTime + 1);
    //   }, 1000);
  
    //   return () => clearInterval(intervalId);
    // }, []);
  
    // const hourDeg = ((currentTime % 43200) / 43200) * 360; // 43200 seconds = 12 hours
    // const minuteDeg = ((currentTime % 3600) / 3600) * 360; // 3600 seconds = 1 hour
    // const secondDeg = ((currentTime % 60) / 60) * 360; // 60 seconds = 1 minute
    // const miliSecondDeg = ((currentTime % 100) / 100) * 360; // 1 seconds = 100 miliseconds
  
  
    return (
      <View style={styles1.container}>
        <View style={styles1.clock}>
          {[...Array(12)].map((_, index) => {
            const number = ((index + 11) % 12) + 1; // Start from 12 and wrap around to 1
            return (
              <Text
                key={index}
                style={[
                  styles1.number,
                  {
                    left: `${46 + 44 * Math.sin((index * 30 * Math.PI) / 180)}%`,
                    top: `${43 - 43 * Math.cos((index * 30 * Math.PI) / 180)}%`,
                  },
                ]}>
                {number}
              </Text>
            );
          })}
  
          <View
            style={[
              styles1.number,
              {
                height: 15,
                width: 15,
                backgroundColor: 'red',
                border: 2,
                borderRadius: 50,
              },
            ]}
          />
  
          <View
            style={[
              styles1.hand,
              {
                width: '25%',
                height: 4,
                transform: [{rotate: `${memoizedHandPositions.hourDeg - 90}deg`}],
              },
            ]}
          />
          <View
            style={[
              styles1.hand,
              {
                width: '32%',
                height: 3,
                transform: [{rotate: `${memoizedHandPositions.minuteDeg - 90}deg`}],
              },
            ]}
          />
          <View
            style={[
              styles1.hand,
              {
                width: '40%',
                height: 2,
                transform: [{rotate: `${memoizedHandPositions.secondDeg - 90}deg`}],
              },
            ]}
          />
           <View
            style={[
              styles1.hand,
              {
                width: '45%',
                height: 1,
                backgroundColor:'red',
                transform: [{rotate: `${memoizedHandPositions.miliSecondDeg - 90}deg`}],
              },
            ]}
          />
          
        </View>
      </View>
    );
  };
  



const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clock: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    number: {
      position: 'absolute',
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      zIndex: 11,
      // transform: [{ translateY: -90 }, { translateX: -8 }],
    },
    division: {
      position: 'absolute',
      backgroundColor: 'black',
      width: 2,
      height: 6,
      transform: [{translateY: -100}],
    },
    hand: {
      position: 'absolute',
      backgroundColor: 'black',
      height: 2,
      width: '45%',
      top: '50%',
      left: '50%',
      transformOrigin: 'left',
    },
  });

  export default ClockWithHand