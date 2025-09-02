import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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

            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                    styles.pressable
                ]}
                onPress={() => console.log("Create")}>
                <Text style={styles.pressableText}>Create</Text>
            </Pressable>
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
    },
    pressable: {
        marginTop: 10,
        marginBottom: 36,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20
    },
    pressableText: {
        fontWeight: 'bold',
        fontSize: 20
    },
});
