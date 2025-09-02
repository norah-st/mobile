import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Order({ children, id, title, description }: PropsWithChildren & { id: string, title: string, description: string }) {
	return (
		<View style={styles.container}>
			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'white' : '#f9c2ff',
					},
					styles.item
				]}
				onPress={() => router.navigate(`/details/${id}`)}>
				<Text style={styles.title}>{title}</Text>
				<Text>{description}</Text>
			</Pressable>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 8,
		marginHorizontal: 16
	},
	item: {
		flex: 1,
		padding: 20,
		borderRadius: 24
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20
	},
});