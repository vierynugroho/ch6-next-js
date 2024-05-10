'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { useFormStatus } from 'react-dom';

export const LoginFormSubmit = ({ type }) => {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			type={type}>
			{pending ? 'Submitting...' : 'Login'}
		</button>
	);
};
