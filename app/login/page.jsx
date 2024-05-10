'use client';

import { useFormState } from 'react-dom';
import classes from './page.module.css';
import { signInAction } from '@/libs/action';
import { LoginFormSubmit } from '@/components/login/login-form-submit';
import { redirect } from 'next/navigation';

export default function LoginPage() {
	const [state, formAction] = useFormState(signInAction, { message: null });

	if (state.status === 'Success') {
		redirect('/');
	}

	return (
		<>
			<header className={classes.header}>
				<h1>
					Login with <span className={classes.highlight}>your account </span>
				</h1>
				<p>Start exploring to this meal area!</p>
			</header>
			<main className={classes.main}>
				<form
					className={classes.form}
					action={formAction}>
					<div className={classes.row}>
						<p>
							<label htmlFor='email'>Your email</label>
							<input
								type='email'
								id='email'
								name='email'
								required
							/>
						</p>
					</div>
					<p>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							required
						/>
					</p>

					{state.message && (
						<p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
							<span style={{ color: 'green' }}>Yohoo! </span> {state.message}
						</p>
					)}

					<p className={classes.actions}>
						<LoginFormSubmit type={'submit'} />
					</p>
				</form>
			</main>
		</>
	);
}
