// screens/ExercisesScreen.js

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { addExercise } from '../reducers/slice';

const categories = ['Biceps', 'Triceps', 'Legs', 'Back', 'Chest', 'Shoulders', 'Abs'];

const ExercisesScreen = ({ exercises, addExercise }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleAddExercise = () => {
    if (selectedCategory && exercise && sets && reps) {
      addExercise({ category: selectedCategory, exercise, sets, reps });
      setExercise('');
      setSets('');
      setReps('');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Category:</Text>
      <RNPickerSelect
        onValueChange={value => setSelectedCategory(value)}
        items={categories.map(category => ({ label: category, value: category }))}
      />
      <TextInput placeholder="Exercise" value={exercise} onChangeText={setExercise} />
      <TextInput placeholder="Sets" value={sets} onChangeText={setSets} keyboardType="numeric" />
      <TextInput placeholder="Reps" value={reps} onChangeText={setReps} keyboardType="numeric" />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Text>Your Exercises:</Text>
      {Object.entries(exercises).map(([category, exercise]) => (
        <Text key={category}>{`${category}: ${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`}</Text>
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
});

const mapDispatchToProps = {
  addExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen);
