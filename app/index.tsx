import { Order } from "@/components/Order";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
		description: 'Description',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
		description: 'Sed quis consequuntur ab iusto quia est ex. Quo ea et vitae facilis sit est dolorum. Eveniet molestias enim occaecati saepe sit inventore laudantium. Molestiae porro voluptatem aut molestias porro nihil nisi.',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d71',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-145571e29d73',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-145571e29d472',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-145571e29d752',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-145571e29443d72',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-145571e29754d72',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-243145571e29d72',
		title: 'Third Item',
		description: 'Description',
	},
		{
		id: '58694a0f-3da1-471f-bd96-123445571e29d72',
		title: 'Third Item',
		description: 'Description',
	},
];

export default function Index() {
	const router = useRouter();
	const [search, onChangeSearch] = useState('')

	return (
		<View style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={({ item }) => <Order id={item.id} title={item.title} description={item.description} />}
				keyExtractor={item => item.id}
			/>


			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
					},
					styles.pressable
				]}
				onPress={() => router.navigate('/create')}>
				<Text style={styles.pressableText}>Create new order</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ''
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
});