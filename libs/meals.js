import SQLite from 'better-sqlite3';
import { promises } from 'dns';
import fs from 'fs';
import { redirect } from 'next/navigation';
import slugify from 'slugify';

const database = SQLite('meals.db');

export const getMeals = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	// throw new Error('Failed Loading Your Meals...');
	return database.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug) => {
	await new Promise((resolve) => setTimeout(resolve, 5000));

	// throw new Error('Failed Loading Your Meals...');
	return database.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
};

export const saveMeal = async (meal) => {
	meal.slug = slugify(meal.title, {
		lower: true,
	});

	const extension = meal.image.name.split('.').pop();
	const fileName = `${meal.title}.${extension}`;

	const buffer = await meal.image.arrayBuffer();
	await fs.promises.writeFile(`public/images/${fileName}`, Buffer.from(buffer));

	database
		.prepare(
			`
    INSERT INTO meals
    (title, slug, summary, instructions, creator, creator_email, image) VALUES (
      @title,
      @slug,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image
    )
    `
		)
		.run({
			title: meal.title,
			slug: slugify(meal.title),
			summary: meal.summary,
			instructions: meal.instructions,
			creator: meal.creator,
			creator_email: meal.creator_email,
			image: `/images/${fileName}`,
		});

	redirect('/meals');
};
