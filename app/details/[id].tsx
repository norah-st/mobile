import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DetailsScreen() {
	const { id } = useLocalSearchParams();

	if (Number.isNaN(Number(id))) return (
		<View><Text>Not a valid ID</Text></View>
	)

	const [item, setItem] = useState<typeof schema.ordersTable.$inferSelect | null | undefined>(null);
	const [description, setDescription] = useState('')

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
			<Text>Details for {id}</Text>
			<Text>Database fetch info</Text>
			<Text>id: {item?.id}</Text>
			<Text>title: {item?.title}</Text>
			<Text>description: {item?.description}</Text>
			<TextInput
				value={description}
				onChangeText={setDescription}
				style={styles.input}
				placeholder="Actualizar descripción"
			/>

			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgba(212, 206, 255, 1)' : 'rgba(48, 153, 238, 1)',
					},
					styles.pressable
				]}
				onPress={async () => {
					await drizzleDb.update(schema.ordersTable).set({ description: description }).where(eq(schema.ordersTable.id, Number(id))).then(() => router.back())
				}}>
				<Text style={styles.pressableText}>Actualizar</Text>
			</Pressable>

			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgba(255, 27, 2, 1)' : 'rgba(255, 147, 135, 1)',
					},
					styles.pressable
				]}
				onPress={() => {
					Alert.alert('Eliminar este reporte?', `Se eliminará el reporte "${item?.title}" con ID: ${item?.id}`, [
						{
							text: 'Cancelar',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{
							text: 'OK', onPress: async () => await drizzleDb.delete(schema.ordersTable).where(eq(schema.ordersTable.id, Number(id))).then(() => router.back())
						},
					])
				}
				}
			>

			<Text style={styles.pressableText}>Eliminar</Text>
		</Pressable>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pressable: {
		marginTop: 20,
		alignItems: 'center',
		padding: 20,
		borderRadius: 20
	},
	pressableText: {
		fontWeight: 'bold',
		fontSize: 24
	},
	input: {
		height: 40,
		marginTop: 6,
		borderWidth: 1,
		padding: 10,
		width: 200
	},
});
