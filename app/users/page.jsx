import Link from 'next/link';
import classes from './page.module.css';
import { Suspense } from 'react';
import UserGrid from '@/components/users/users-grid.module';
import { getUsers } from '@/libs/action';

export default async function UsersPage() {
	const Meals = async () => {
		const users = await getUsers();
		return <UserGrid users={users} />;
	};

	return (
		<>
			<header className={classes.header}>
				<h1>
					Our Team, managed <span className={classes.highlight}>by you</span>
				</h1>
				<p>Add your member!</p>
				<p className={classes.cta}>
					<Link href='/meals/share'>Add New Member</Link>
				</p>
			</header>
			<main className={classes.main}>
				<Suspense fallback={<p className={classes.loading}>Loading Your Meals...</p>}>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}
