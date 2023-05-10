// screens/RoutineScreen.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { addToRoutine } from '../reducers/slice';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const categories = ['Biceps', 'Triceps', 'Legs', 'Back', 'Chest', 'Shoulders', 'Abs'];

const RoutineScreen = ({ routine, addToRoutine }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddToRoutine = () => {
    if (selectedDay && selectedCategory) {
      addToRoutine({ day: selectedDay, category: selectedCategory });
      setSelectedDay(null);
      setSelectedCategory(null);
    } else {
      alert('Please select both day and category');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Day:</Text>
      <RNPickerSelect
        onValueChange={value => setSelectedDay(value)}
        items={days.map(day => ({ label: day, value: day }))}
      />
      <Text>Select Category:</Text>
      <RNPickerSelect
        onValueChange={value => setSelectedCategory(value)}
        items={categories.map(category => ({ label: category, value: category }))}
      />
      <Button title="Add to Routine" onPress={handleAddToRoutine} />
      <Text>Your Routine:</Text>
      {Object.entries(routine).map(([day, category]) => (
        <Text key={day}>{`${day}: ${category}`}</Text>
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
  routine: state.routine,
});

const mapDispatchToProps = {
  addToRoutine,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);
