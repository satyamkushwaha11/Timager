import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const TimerScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const startTimer = () => {
    startTimeRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 100);
    setRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  const resumeTimer = () => {
    startTimeRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 100);
    setRunning(true);
  };

  const formatTime = timeInMilliseconds => {
    const milliseconds = timeInMilliseconds % 1000;
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, '0')}m:${seconds
      .toString()
      .padStart(2, '0')}s:${milliseconds.toString().padStart(3, '0')}mm`;
  };

  return (
    <>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <HourSelectorScreen  type='H'/>
        <HourSelectorScreen  type='M'/>
        <HourSelectorScreen  type='S'/>
      </View>

      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Timer</Text>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
          <View style={styles.buttonContainer}>
            {running ? (
              <TouchableOpacity
                style={[styles.button, styles.pauseButton]}
                onPress={pauseTimer}>
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.startButton]}
                  onPress={startTimer}>
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.resetButton]}
                  onPress={resetTimer}>
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </>
            )}
            {!running && (
              <TouchableOpacity
                style={[styles.button, styles.resumeButton]}
                onPress={resumeTimer}>
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

// import { View, FlatList, Text, StyleSheet } from 'react-native';

const HourSelectorScreen = ({type}) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const renderItem = ({ item, index }) => {
    const isMiddle = index * 50 <= scrollPosition && (index + 1) * 50 >= scrollPosition + 300;
    return (
      <Text
        style={[
          styles.hourText,
          selectedHour === item && styles.selectedHourText,
          isMiddle && styles.middleHourText,
        ]}
        onPress={() => setSelectedHour(item)}
      >
        {item < 10 ? `0${item}` : `${item}`}
      </Text>
    );
  };

  const handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y)
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };
  // const [selectedHour, setSelectedHour] = useState(null);
  // const hours = Array.from({length: 24}, (_, i) => i);

  // const renderItem = ({item}) => (
  //   <Text
  //     style={[
  //       styles.hourText,
  //       selectedHour === item && styles.selectedHourText,
  //       styles.middleHourText
  //     ]}
  //     onPress={() => setSelectedHour(item)}>
  //     {item < 10 ? `0${item}` : `${item}`}

  //     {/* {item < 10 ? `0${item}:00` : `${item}:00`} */}
  //   </Text>
  // );

  return (
    <View style={styles.container1}>
      <Text style={{position: 'absolute', right: 20, fontSize: 20,top:"48%",color:'blue' }}>{type}</Text>
      <FlatList
        data={hours}
        renderItem={renderItem}
        keyExtractor={item => item.toString()+type}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: 'green',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: '#2ecc71',
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: '#f39c12',
  },
  resumeButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    maxHeight: 190,
  },
  hourText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  selectedHourText: {
    backgroundColor: 'blue', // or any color you want to indicate selection
    color: '#fff',
  },
  middleHourText: {
    color: 'red',
  },
});

export default TimerScreen;
