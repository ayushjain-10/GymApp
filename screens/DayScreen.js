// screens/DayScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const DayScreen = ({ route, routine }) => {
  const { day } = route.params;
  const exercises = routine[day];

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => (
        <Text key={index}>{exercise.category}:</Text>
      ))}
      {exercises.map((exercise, index) => (
        <Text key={index}>- {exercise.exercise}: {exercise.sets} sets, {exercise.reps} reps</Text>
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

export default connect(mapStateToProps)(DayScreen);
