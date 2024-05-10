import Link from 'next/link';
import Image from 'next/image';

import classes from './user-item.module.css';

export default function UserItem({ name, slug, image, summary, price, creator }) {
	return (
		<article className={classes.meal}>
			<header>
				<div className={classes.image}>
					<Image
						src={image}
						alt={name}
						fill
					/>
				</div>
				<div className={classes.headerText}>
					<h2>{name}</h2>
					<p>Rp. {price}</p>
				</div>
			</header>
			<div className={classes.content}>
				<p className={classes.summary}>{summary}</p>
				<div className={classes.actions}>
					<Link href={`/meals/${slug}`}>View Details</Link>
				</div>
			</div>
		</article>
	);
}
