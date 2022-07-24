import React, { useState } from 'react';
import {
	CarouselInput,
	CarouselSlide,
	CarouselImage,
} from '@strapi/design-system/CarouselInput';

interface Props {
	data: string[];
}

const ImageCell = ({ data }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const handleNext = () => {
		setSelectedIndex((current) =>
			current < data.length - 1 ? current + 1 : 0
		);
	};

	const handlePrevious = () => {
		setSelectedIndex((current) =>
			current > 0 ? current - 1 : data.length - 1
		);
	};

	return (
		<CarouselInput
			selectedSlide={selectedIndex}
			label={`Carousel (${selectedIndex + 1}/${data.length})`}
			onNext={handleNext}
			onPrevious={handlePrevious}
			previousLabel='Previous slide'
			nextLabel='Next slide'>
			{data.map((url) => (
				<CarouselSlide key={url}>
					<CarouselImage src={url} alt={url} />
				</CarouselSlide>
			))}
		</CarouselInput>
	);
};

export default ImageCell;
