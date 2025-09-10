import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

export const DATABASE_NAME = 'tasks';

export default function RootLayout() {

	const expoDb = openDatabaseSync(DATABASE_NAME);
	const db = drizzle(expoDb);
	const { success, error } = useMigrations(db, migrations);

	return (
		<Suspense fallback={<ActivityIndicator size="large" />}>
			<SQLiteProvider
				databaseName={DATABASE_NAME}
				options={{ enableChangeListener: true }}
				useSuspense>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: '#7a2ab7ff'
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold'
						},
					}}>
					<Stack.Screen name="index" options={{ title: 'Bienvenida' }} />
					<Stack.Screen name="main" options={{ title: 'Página principal' }} />
					<Stack.Screen name="create" options={{ title: 'Crear nueva orden' }} />
					<Stack.Screen name="details/[id]" options={{ title: 'Detalles de orden' }} />
				</Stack>
			</SQLiteProvider>
		</Suspense>
	);
}
