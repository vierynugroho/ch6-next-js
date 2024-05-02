import SQLite from 'better-sqlite3';

const database = SQLite('meals.db');

export const getMeals = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	// throw new Error('Failed Loading Your Meals...');
	return database.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug) => {
	// await new Promise((resolve) => setTimeout(resolve, 3000));

	// throw new Error('Failed Loading Your Meals...');
	return database.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
};
