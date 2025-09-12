import { Order } from "@/components/Order";
import * as schema from '@/db/schema';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
	const router = useRouter();
	const [search, onChangeSearch] = useState('')
	const [items, setItems] = useState<typeof schema.ordersTable.$inferSelect[] | null>(null);

	const db = useSQLiteContext();
	const drizzleDb = drizzle(db, { schema })

	useEffect(() => {
		(async () => {
			const res = await drizzleDb.select().from(schema.ordersTable)
			setItems(res);
		})();
	})
	
	const DATA_FILTERED = items?.filter(post =>
		post.title.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<View style={styles.container}>
			<TextInput
				value={search}
				onChangeText={onChangeSearch}
				style={styles.input}
				placeholder="Buscar"
			/>

			<FlatList
				data={DATA_FILTERED}
				renderItem={({ item }) => <Order id={item.id} title={item.title} description={item.description} />}
				keyExtractor={item => item.id.toString()}
			/>


			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
					},
					styles.pressable
				]}
				onPress={() => router.navigate('/create')}>
				<Text style={styles.pressableText}>Crear nueva orden</Text>
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
	input: {
		height: 40,
		marginTop: 6,
		borderWidth: 1,
		padding: 10,
	},
});