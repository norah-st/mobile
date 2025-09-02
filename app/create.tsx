import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function CreateScreen() {
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create new order</Text>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Title for the new order"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Description of the order"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    label: {
        fontSize: 20,
        marginTop: 20
    },
    input: {
        height: 40,
        marginTop: 6,
        borderWidth: 1,
        padding: 10,
    }
});
