import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
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
      <Text style={styles.input}>Select Category:</Text>
      <RNPickerSelect
        style={styles.chooseCategory}
        onValueChange={(value) => setSelectedCategory(value)}
        items={categories.map((category) => ({ label: category, value: category }))}
      />
      <Text style={styles.input}>Add Exercise:</Text>
      <TextInput
        style={styles.inputholder}
        placeholder="Exercise"
        value={exercise}
        onChangeText={setExercise}
      />
      <Text style={styles.input}>Add Number of Sets:</Text>
      <TextInput
        style={styles.inputholder}
        placeholder="Sets"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />
      <Text style={styles.input}>Add Number of Reps:</Text>
      <TextInput
        style={styles.inputholder}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Text style={styles.input}>Your Exercises:</Text>
      <ScrollView style={styles.scrollView}>
        {Object.entries(exercises).map(([category, exerciseList]) => (
          <View key={category}>
            {exerciseList.map((exerciseItem) => (
              <View key={exerciseItem.exercise} style={styles.exerciseItem}>
                {/* Display the category just once */}
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.exerciseName}>{exerciseItem.exercise}</Text>
                <Text style={styles.setsReps}>
                  Sets: {exerciseItem.sets} Reps: {exerciseItem.reps}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseCategory: {
        inputIOS: { // iOS style
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,
            textAlign: 'center' // to ensure the text is not cut off
        }
    },
    input: {
        padding: 10
    },
    inputholder: {
        padding: 10,
        height: 40,
        width: 200,
        borderColor: 'gray',
        textAlign: 'center',

    },
    exercises: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5
    }
});

const mapStateToProps = state => ({
    exercises: state.exercises,
});

const mapDispatchToProps = {
    addExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen);
