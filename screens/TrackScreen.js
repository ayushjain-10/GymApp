// screens/TrackScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const TrackScreen = ({ navigation, routine }) => {
  const daysWithRoutines = Object.keys(routine);

  return (
    <View style={styles.container}>
      <Text>Your Workout:</Text>
      <FlatList
        data={daysWithRoutines}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Day', { day: item })}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
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

export default connect(mapStateToProps)(TrackScreen);
