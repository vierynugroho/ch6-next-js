'use client';

import React, { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
	const [pickedImage, setPickedImage] = useState();
	const imageRef = useRef();

	const handlePickImage = () => {
		imageRef.current.click(); // choose an image
	};

	const handleImageChange = () => {
		const file = event.target.files[0];

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setPickedImage(fileReader.result);
		};

		fileReader.readAsDataURL(file);
	};

	return (
		<div className={classes.picker}>
			<label htmlFor='image'>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!pickedImage && <p>No Image Picked Yet</p>}
					{pickedImage && (
						<Image
							src={pickedImage}
							name={name}
							alt='The image selected by user'
							fill
						/>
					)}
				</div>
				<input
					className={classes.input}
					type='file'
					name={name}
					id={name}
					accept='image/png, image/jpeg, image/jpg'
					ref={imageRef}
					onChange={handleImageChange}
				/>
				<button
					className={classes.button}
					type='button'
					onClick={handlePickImage}>
					Pick an Image
				</button>
			</div>
		</div>
	);
}
