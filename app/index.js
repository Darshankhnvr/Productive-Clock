import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TimerScreen() {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); 


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); 
    } else {
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); 

 
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => num < 10 ? '0' + num : num;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isRunning ? "Pause" : "Start"} onPress={handleStartPause} />
        <Button title="Reset" onPress={handleReset} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  timerText: {
    fontSize: 60,
    fontWeight: '200',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
});