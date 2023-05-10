// screens/RoutineScreen.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Checkbox } from 'react-native-paper';

import { addToRoutine, addToTracked } from '../reducers/slice';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const categories = ['Biceps', 'Triceps', 'Legs', 'Back', 'Chest', 'Shoulders', 'Abs'];

const RoutineScreen = ({ exercises, routine, addToRoutine, addToTracked }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleAddToRoutine = () => {
        if (selectedDay && selectedCategory && selectedExercises.length > 0) {
            selectedExercises.forEach(exercise => {
                const exerciseData = exercises[selectedCategory].find(e => e.exercise === exercise);
                addToRoutine({ day: selectedDay, exercise: exerciseData });
                // add to tracked
                addToTracked({ exerciseData });
            });
            setSelectedDay(null);
            setSelectedCategory(null);
            setSelectedExercises([]);

        } else {
            alert('Please select day, category, and exercises');
        }
    };

    const toggleExerciseSelection = (exercise) => {
        if (selectedExercises.includes(exercise)) {
            setSelectedExercises(selectedExercises.filter(e => e !== exercise));
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
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
            {selectedCategory && (
                <>
                    <Text>Select Exercise:</Text>
                    <FlatList
                        data={exercises[selectedCategory]}
                        keyExtractor={item => item.exercise}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    status={selectedExercises.includes(item.exercise) ? 'checked' : 'unchecked'}
                                    onPress={() => toggleExerciseSelection(item.exercise)}
                                />
                                <Text>{item.exercise}</Text>
                            </View>
                        )}
                    />
                </>
            )}
            <Button title="Add to Routine" onPress={handleAddToRoutine} />
            <Text>Your Routine:</Text>
            {Object.entries(routine).map(([day, exercises]) => (
                <View key={day}>
                    {exercises.map((exercise, index) => (
                        <View key={index}>
                            <Text>{day}: {exercise.category}</Text>
                            <Text>- {exercise.exercise}</Text>
                            {/* <Text>Sets: {exercise.sets}</Text>
                            <Text>Reps: {exercise.reps}</Text> */}
                        </View>
                    ))}
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
    exercises: state.exercises,
    routine: state.routine,
});

const mapDispatchToProps = {
    addToRoutine,
    addToTracked,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);
