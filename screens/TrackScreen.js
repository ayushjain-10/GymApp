// screens/TrackScreen.js

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { trackExercise } from '../reducers/slice';

const TrackScreen = ({ exercises, tracked, trackExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [setsDone, setSetsDone] = useState('');
  const [repsDone, setRepsDone] = useState('');

  const handleTrackExercise = () => {
    trackExercise({ exercise: selectedExercise, setsDone, repsDone });
    setSelectedExercise('');
    setSetsDone('');
    setRepsDone('');
  };

  return (
    <View style={styles.container}>
      <Text>Select Exercise:</Text>
      {Object.entries(exercises).map(([category, exercise]) => (
        <Button key={exercise.exercise} title={exercise.exercise} onPress={() => setSelectedExercise(exercise.exercise)} />
      ))}
      <TextInput placeholder="Sets Done" value={setsDone} onChangeText={setSetsDone} keyboardType="numeric" />
      <TextInput placeholder="Reps Done" value={repsDone} onChangeText={setRepsDone} keyboardType="numeric" />
      <Button title="Track Exercise" onPress={handleTrackExercise} />
      <Text>Your Tracked Exercises:</Text>
      {Object.entries(tracked).map(([exercise, track]) => (
        <Text key={exercise}>{`${exercise}: Sets Done: ${track.setsDone}, Reps Done: ${track.repsDone}`}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  exercises: state.exercises,
  tracked: state.tracked,
});

const mapDispatchToProps = {
  trackExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackScreen);
