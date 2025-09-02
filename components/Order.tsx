import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Order({ children, title, description }: PropsWithChildren & { title: string, description: string }) {
	return (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
			<Text>{description}</Text>
		</View>
	);
}


const styles = StyleSheet.create({
	item: {
		flex: 1,
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 24
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20
	}
});