import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/libs/meals';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function MealsDetailPage({ params }) {
	const meal = await getMeal(params.mealSlug);

	if (!meal) {
		notFound();
	}

	meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

	const Meal = () => {
		return (
			<>
				<header className={classes.header}>
					<div className={classes.image}>
						<Image
							src={meal.image}
							fill
						/>
					</div>
					<div className={classes.headerText}>
						<h1>{meal.title}</h1>
						<p className={classes.creator}>
							by <a href={`mailto:viery15102002@gmail.com`}>{meal.creator}</a>
						</p>
						<p className={classes.summary}>{meal.summary}</p>
						<p
							className={classes.instructions}
							dangerouslySetInnerHTML={{ __html: meal.instructions }}
						></p>
					</div>
				</header>
				<main></main>
			</>
		);
	};
	return (
		<>
			<Suspense fallback={<p className={classes.loading}>Loading Your Meal...</p>}>
				<Meal />
			</Suspense>
		</>
	);
}
