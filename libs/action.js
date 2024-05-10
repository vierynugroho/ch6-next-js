'use server';
import { saveMeal } from './meals';

const shareMeal = async (formData) => {
	const meal = {
		creator: formData.get('name'),
		creator_email: formData.get('email'),
		title: formData.get('title'),
		summary: formData.get('summary'),
		image: formData.get('image'),
		instructions: formData.get('instructions'),
	};

	if (!meal.title || meal.title.trim() === '') {
		throw new Error('Meal title cannot be empty');
	}

	if (!meal.creator_email || !meal.creator_email.includes('@')) {
		throw new Error('Meal creator email cannot be empty or format email is invalid');
	}

	await saveMeal(meal);
};

export { shareMeal };
