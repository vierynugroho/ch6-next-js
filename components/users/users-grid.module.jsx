import classes from './users-grid.module.css';
import UserItem from './user-item';

export default function UserGrid({ users }) {
	return (
		<ul className={classes.meals}>
			{users.map((user) => (
				<li key={user.id}>
					<UserItem {...user} />
				</li>
			))}
		</ul>
	);
}
