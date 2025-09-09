import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
	const { id } = useLocalSearchParams();

	if (Number.isNaN(Number(id))) return (
		<View><Text>Not a valid ID</Text></View>
	)

	const [item, setItem] = useState<typeof schema.ordersTable.$inferSelect | null | undefined>(null);

	const db = useSQLiteContext();
	const drizzleDb = drizzle(db, { schema })

	useEffect(() => {
		(async () => {
			const res = await drizzleDb.query.ordersTable.findFirst({
				where: eq(schema.ordersTable.id, Number(id))
			})
			setItem(res);
		})();
	})

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: `${id}`
				}} />
			<Text>Details for {id}</Text>
			<Text>Database fetch info</Text>
			<Text>id: {item?.id}</Text>
			<Text>title: {item?.title}</Text>
			<Text>description: {item?.description}</Text>

			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgba(255, 27, 2, 1)' : 'rgba(255, 147, 135, 1)',
					},
					styles.pressable
				]}
				onPress={async () => {
					await drizzleDb.delete(schema.ordersTable).where(eq(schema.ordersTable.id, Number(id))).then(() => router.back())
					}}>
				<Text style={styles.pressableText}>Delete</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
});
