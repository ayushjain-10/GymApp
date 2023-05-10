// screens/TrackScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

const TrackScreen = ({ navigation, routine }) => {
  const daysWithRoutines = Object.keys(routine);

  return (
    <View style={styles.container}>
      <FlatList
        data={daysWithRoutines}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={() => navigation.navigate('Day', { day: item })}>
            <Text style={styles.press}>{item}</Text>
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
  press: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    },
});

const mapStateToProps = state => ({
  routine: state.routine,
});

export default connect(mapStateToProps)(TrackScreen);
