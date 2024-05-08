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

	await saveMeal(meal);
};

export { shareMeal };
