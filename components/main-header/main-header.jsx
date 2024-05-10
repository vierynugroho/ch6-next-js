import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import { cookies } from 'next/headers';

export default function MainHeader() {
	const user = cookies().get('_token');
	console.log(user);
	return (
		<header className={classes.header}>
			<Link
				className={classes.logo}
				href='/'>
				<img
					src={logoImg.src}
					alt='A plate with food on it'
				/>
				Nextlevel Food
			</Link>

			<nav className={classes.nav}>
				<ul>
					<li>
						<Link href='/meals'>Browse Meals</Link>
					</li>
					<li>
						<Link href='/community'>Foodies Community</Link>
					</li>
					<li>{!user ? <Link href='/login'>Login</Link> : <Link href='/users'>Manage User</Link>}</li>
				</ul>
			</nav>
		</header>
	);
}
