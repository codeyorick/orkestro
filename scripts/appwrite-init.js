import { Client, Databases, Permission, RelationshipType, Role } from 'node-appwrite';

// Database and collection IDs
const DATABASE_ID = 'main';
const INSTRUMENTS_COLLECTION_ID = 'instruments';
const ORCHESTRAS_COLLECTION_ID = 'orchestras';
const PIECES_COLLECTION_ID = 'pieces';
const CONCERTS_COLLECTION_ID = 'concerts';

if (
	!process.env.PUBLIC_APPWRITE_ENDPOINT ||
	!process.env.PUBLIC_APPWRITE_PROJECT ||
	!process.env.APPWRITE_KEY
) {
	console.error(
		'Missing environment variables. Following are required: PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT, APPWRITE_KEY.'
	);
	process.exit(1);
}

// Initialize Appwrite client
const client = new Client()
	.setEndpoint(process.env.PUBLIC_APPWRITE_ENDPOINT)
	.setProject(process.env.PUBLIC_APPWRITE_PROJECT)
	.setKey(process.env.APPWRITE_KEY);

const databases = new Databases(client);

async function createDatabase() {
	try {
		// Check if database exists
		try {
			await databases.get(DATABASE_ID);
			console.log(`Database '${DATABASE_ID}' already exists.`);
		} catch {
			// Create database if it doesn't exist
			await databases.create(DATABASE_ID, 'Main');
			console.log(`Database '${DATABASE_ID}' created successfully.`);
		}
	} catch (error) {
		console.error('Error creating database:', error);
		throw error;
	}
}

async function createInstrumentsCollection() {
	try {
		// Check if collection exists
		try {
			await databases.getCollection(DATABASE_ID, INSTRUMENTS_COLLECTION_ID);
			console.log(`Collection '${INSTRUMENTS_COLLECTION_ID}' already exists.`);
		} catch {
			// Create collection if it doesn't exist
			await databases.createCollection(DATABASE_ID, INSTRUMENTS_COLLECTION_ID, 'Instruments', [
				Permission.read(Role.users()),
				Permission.create(Role.team('admin', 'instruments')),
				Permission.update(Role.team('admin', 'instruments')),
				Permission.delete(Role.team('admin', 'instruments'))
			]);

			// Add label attribute
			await databases.createStringAttribute(
				DATABASE_ID,
				INSTRUMENTS_COLLECTION_ID,
				'label',
				255,
				true
			);

			console.log(`Collection '${INSTRUMENTS_COLLECTION_ID}' created successfully.`);
		}
	} catch (error) {
		console.error('Error creating instruments collection:', error);
		throw error;
	}
}

async function createOrchestrasCollection() {
	try {
		// Check collection exists
		try {
			await databases.getCollection(DATABASE_ID, ORCHESTRAS_COLLECTION_ID);
			console.log(`Collection '${ORCHESTRAS_COLLECTION_ID}' already exists.`);
		} catch {
			// Create a collection if it doesn't exist
			await databases.createCollection(DATABASE_ID, ORCHESTRAS_COLLECTION_ID, "Orchestra's", [
				Permission.read(Role.users()),
				Permission.create(Role.team('admin', 'orchestras')),
				Permission.update(Role.team('admin', 'orchestras')),
				Permission.delete(Role.team('admin', 'orchestras'))
			]);

			// Add label attribute
			await databases.createStringAttribute(
				DATABASE_ID,
				ORCHESTRAS_COLLECTION_ID,
				'label',
				255,
				true
			);

			// Add relation to instruments (many-to-many)
			await databases.createRelationshipAttribute(
				DATABASE_ID,
				ORCHESTRAS_COLLECTION_ID,
				'instruments',
				RelationshipType.ManyToMany,
				false,
				'instruments'
			);

			console.log(`Collection '${ORCHESTRAS_COLLECTION_ID}' created successfully.`);
		}
	} catch (error) {
		console.error('Error creating orchestras collection:', error);
		throw error;
	}
}

async function createConcertsCollection() {
	try {
		// Check if collection exists
		try {
			await databases.getCollection(DATABASE_ID, CONCERTS_COLLECTION_ID);
			console.log(`Collection '${CONCERTS_COLLECTION_ID}' already exists.`);
		} catch {
			// Create collection if it doesn't exist
			await databases.createCollection(DATABASE_ID, CONCERTS_COLLECTION_ID, 'Concerts', [
				Permission.read(Role.users()),
				Permission.create(Role.team('admin', 'concerts')),
				Permission.update(Role.team('admin', 'concerts')),
				Permission.delete(Role.team('admin', 'concerts'))
			]);

			// Add label attribute
			await databases.createStringAttribute(
				DATABASE_ID,
				CONCERTS_COLLECTION_ID,
				'label',
				255,
				true
			);

			// Add begin date attribute
			await databases.createDatetimeAttribute(
				DATABASE_ID,
				CONCERTS_COLLECTION_ID,
				'beginDate',
				true
			);

			// Add end date attribute
			await databases.createDatetimeAttribute(DATABASE_ID, CONCERTS_COLLECTION_ID, 'endDate', true);

			// Add relation to orchestras (many-to-many)
			await databases.createRelationshipAttribute(
				DATABASE_ID,
				CONCERTS_COLLECTION_ID,
				'orchestras',
				RelationshipType.ManyToMany,
				false,
				'orchestras'
			);

			console.log(`Collection '${CONCERTS_COLLECTION_ID}' created successfully.`);
		}
	} catch (error) {
		console.error('Error creating concerts collection:', error);
		throw error;
	}
}

async function createPiecesCollection() {
	try {
		// Check if collection exists
		try {
			await databases.getCollection(DATABASE_ID, PIECES_COLLECTION_ID);
			console.log(`Collection '${PIECES_COLLECTION_ID}' already exists.`);
		} catch {
			// Create collection if it doesn't exist
			await databases.createCollection(DATABASE_ID, PIECES_COLLECTION_ID, 'Pieces', [
				Permission.read(Role.users()),
				Permission.create(Role.team('admin', 'pieces')),
				Permission.update(Role.team('admin', 'pieces')),
				Permission.delete(Role.team('admin', 'pieces'))
			]);

			// Add label attribute
			await databases.createStringAttribute(DATABASE_ID, PIECES_COLLECTION_ID, 'label', 255, true);

			// Add relation to concerts (many-to-many)
			await databases.createRelationshipAttribute(
				DATABASE_ID,
				PIECES_COLLECTION_ID,
				'concerts',
				RelationshipType.ManyToMany,
				false,
				'concerts'
			);

			console.log(`Collection '${PIECES_COLLECTION_ID}' created successfully.`);
		}
	} catch (error) {
		console.error('Error creating pieces collection:', error);
		throw error;
	}
}

// Run the initialization
try {
	console.log('Starting database initialization...');

	// Create database
	await createDatabase();

	// Create collections
	await createInstrumentsCollection();
	await createOrchestrasCollection();
	await createConcertsCollection();
	await createPiecesCollection();

	console.log('Database initialization completed successfully!');
} catch (error) {
	console.error('Database initialization failed:', error);
	process.exit(1);
}
