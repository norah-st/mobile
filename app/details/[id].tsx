import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: `${id}`
				}} />
			<Text>Details for {id}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
