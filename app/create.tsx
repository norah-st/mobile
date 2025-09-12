import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router } from "expo-router";
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';


export default function CreateScreen() {
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('')

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear nueva orden</Text>
            <Text style={styles.label}>Titulo</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Titulo de la nueva orden"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Descripción de la nueva orden"
            />

            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                    styles.pressable
                ]}
                onPress={async () => {
                    if (title === '' || description === '') {
                        ToastAndroid.show('Campos Vacios', ToastAndroid.SHORT)
                        return;
                    }
                    await drizzleDb.insert(schema.ordersTable).values({
                        title,
                        description
                    }).then(() => {
                        router.back()
                    })
                }}>
                <Text style={styles.pressableText}>Crear</Text>
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
