
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapsText, setLapsText] = useState([]);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);


  useEffect(() => {
    getLastLapTime();
  }, [laps]);

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 100);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setLaps([]);
    setLapsText([]);
  };

  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 100);
    setRunning(true);
  };

  const lapStopwatch = () => {
    const lapTime = Date.now() - startTimeRef.current;
    setLaps(prevLaps => [...prevLaps, lapTime]);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    return endTime - startTime;
  };

  const getLastLapTime = () => {
    if (laps.length === 0) return; // No laps recorded yet

    const lastLapTime = laps.length > 1 ? laps[laps.length - 2] : 0;
    const currentTime = laps[laps.length - 1];
    const difference = calculateTimeDifference(lastLapTime, currentTime);
    const nLT = formatTimeLap(difference);
    setLapsText(preLapsText => [...preLapsText, nLT]);
  };

  const formatTimeLap = timeInMilliseconds => {
    const milliseconds = timeInMilliseconds % 1000;
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}h:${minutes
      .toString()
      .padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s.${Math.floor(
      milliseconds / 10,
    )
      .toString()
      .padStart(2, '0')}ms`;
  };

  const formatTime = timeInMilliseconds => {
    const milliseconds = timeInMilliseconds % 1000;
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: Math.floor(milliseconds / 10)
        .toString()
        .padStart(2, '0'),
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.clockSection}>
        <View style={styles.timerWrapper}>
          <View>
            <Text style={styles.timeDigitText}>
              {formatTime(time).hours || '00'}:
            </Text>
          </View>
          <View>
            <Text style={styles.timeDigitText}>
              {formatTime(time).minutes || '00'}:
            </Text>
          </View>
          <View>
            <Text style={styles.timeDigitText}>
              {formatTime(time).seconds || '00'}.
              {formatTime(time).milliseconds || '00'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {running ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={pauseStopwatch}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.lapButton]}
              onPress={lapStopwatch}>
              <Text style={styles.buttonText}>Lap</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {time == 0 ? (
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={startStopwatch}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.resumeButton]}
                onPress={resumeStopwatch}>
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <LapsTable
        laps={laps}
        lapsText={lapsText}
        formatTimeLap={formatTimeLap}
      />
    </View>
  );
};

const LapsTable = ({laps, lapsText, formatTimeLap}) => {
  return (
    <View style={styles.lapSection}>
      {laps && laps.length > 0 && (
        <>
          <View style={[styles.table, styles.tbHead]}>
            <View style={[styles.tbCol]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lap No.</Text>
            </View>
            <View style={[styles.tbCol]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lap Time</Text>
            </View>
            <View style={[styles.tbCol]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ref Time</Text>
            </View>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
            {laps
              .slice()
              .reverse()
              .map((lap, index) => (
                <View style={[styles.tbRow]} key={index}>
                  <View style={[styles.tbCol]}>
                    <Text style={{fontSize: 15}}>{laps.length - index}</Text>
                  </View>
                  <View style={[styles.tbCol]}>
                    <Text style={{fontSize: 15}}>
                      {lapsText[laps.length - index - 1]}
                    </Text>
                  </View>
                  <View style={[styles.tbCol]}>
                    <Text style={{fontSize: 15}}>{formatTimeLap(lap)}</Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockSection: {
    height: height * 0.2,
    flex: 20,
    justifyContent: 'center',
  },
  timerWrapper: {
    flexDirection: 'row',
  },
  timeDigitText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonContainer: {
    height: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  resumeButton: {
    backgroundColor: '#2196F3',
  },
  lapButton: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  lapSection: {
    flex: 60,
    justifyContent: 'center',
    marginTop: 20,
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#3A0C75',
    paddingVertical: 15,
  },
  tbRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#3A0C75',
    paddingVertical: 15,
  },
  tbCol: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StopwatchScreen;
