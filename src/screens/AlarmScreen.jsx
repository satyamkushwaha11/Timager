import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');

  const addAlarm = () => {
    if (newAlarm) {
      setAlarms(prevAlarms => [...prevAlarms, newAlarm]);
      setNewAlarm('');
    }
  };

  const deleteAlarm = index => {
    setAlarms(prevAlarms => prevAlarms.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarms</Text>
      <FlatList
        data={alarms}
        renderItem={({ item, index }) => (
          <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>{item}</Text>
            <Button title="Delete" onPress={() => deleteAlarm(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newAlarm}
          onChangeText={text => setNewAlarm(text)}
          placeholder="Enter new alarm"
        />
        <Button title="Add Alarm" onPress={addAlarm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  alarmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  alarmText: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    paddingHorizontal: 8,
  },
});

export default AlarmScreen;
