import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() { 
    const router = useRouter();  
    return (
        <View style={styles.container}>
            <Text style= {styles.text}>Bienvenido!</Text>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                    styles.pressable
                ]}
                onPress={() => router.navigate('/main')}>
                <Text style={styles.pressableText}>Seguir</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '',
        alignContent: 'center',
        justifyContent: 'center'
    },
    pressable: {
        marginBottom: 36,
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 80,
        borderRadius: 20
    },
    pressableText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    title: {
        fontSize: 32,
    },
    input: {
        height: 40,
        marginTop: 6,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontSize: 32,
        alignItems: 'center',
        marginHorizontal: 127
    }
});