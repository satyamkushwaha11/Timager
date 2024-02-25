import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

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

  const formatTime = timeInMilliseconds => {
    const milliseconds = timeInMilliseconds % 1000;
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}h:${minutes
      .toString()
      .padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s:${Math.floor(
      milliseconds / 10,
    )
      .toString()
      .padStart(2, '0')}ms`;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Stopwatch</Text>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
        <View style={styles.buttonContainer}>
          {running ? (
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={pauseStopwatch}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={startStopwatch}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={resetStopwatch}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </>
          )}
          {!running && (
            <TouchableOpacity
              style={[styles.button, styles.resumeButton]}
              onPress={resumeStopwatch}>
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.lapButton]}
            onPress={lapStopwatch}>
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
        </View>
        <View>
          {laps.map((lap, index) => (
            <Text key={index} style={styles.lapText}>{`Lap ${
              index + 1
            }: ${formatTime(lap)}`}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 30,
    color: 'green',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 28,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  lapText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default StopwatchScreen;
