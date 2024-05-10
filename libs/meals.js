import SQLite from 'better-sqlite3';
import fs from 'fs';
import slugify from 'slugify';
import { redirect } from 'next/navigation';
import xss from 'xss';

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
	const extension = meal.image.name.split('.').pop();
	const fileName = `${meal.title}.${extension}`;

	const buffer = await meal.image.arrayBuffer();
	try {
		await fs.promises.writeFile(`public/images/${fileName}`, Buffer.from(buffer));
	} catch (error) {
		throw new Error('Saving Image Failed!');
	}

	meal.slug = slugify(meal.title, {
		lower: true,
	});

	meal.instructions = xss(meal.instructions);
	meal.image = `/images/${fileName}`;

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
		.run(meal);

	redirect('/meals');
};
