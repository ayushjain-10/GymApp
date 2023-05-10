// screens/TrackScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toggleExercise } from '../reducers/slice';

const TrackScreen = ({ tracked, toggleExercise }) => {
  return (
    <View style={styles.container}>
      <Text>Your Workout:</Text>
      {tracked.map(({ exerciseData }, index) => (
        <View key={index}>
          <Text>{exerciseData.exercise}: {exerciseData.sets} sets, {exerciseData.reps} reps</Text>
          <Button 
            title={exerciseData.done ? "Done" : "Not Done"} 
            onPress={() => toggleExercise(index)} 
            color={exerciseData.done ? "green" : "red"} 
          />
        </View>
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
  tracked: state.tracked,
});

const mapDispatchToProps = {
  toggleExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackScreen);
