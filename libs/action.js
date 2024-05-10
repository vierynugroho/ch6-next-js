'use server';
import { revalidatePath } from 'next/cache';
import { getMeal, saveMeal } from './meals';
import slugify from 'slugify';

const shareMeal = async (prevState, formData) => {
	const meal = {
		creator: formData.get('name'),
		creator_email: formData.get('email'),
		title: formData.get('title'),
		summary: formData.get('summary'),
		image: formData.get('image'),
		instructions: formData.get('instructions'),
	};

	const slug = slugify(meal.title);
	const slugIsExist = await getMeal(slug);

	if (slug === slugIsExist.slug) {
		return { message: 'Your meal has been served, please add other meal' };
	}

	if (!meal.title || meal.title.trim() === '') {
		return { message: 'Meal title cannot be empty' };
	}

	if (!meal.creator_email || !meal.creator_email.includes('@')) {
		return { message: 'Meal creator email cannot be empty or format email is invalid' };
	}

	await saveMeal(meal);
	revalidatePath('/meals');
};

export { shareMeal };
