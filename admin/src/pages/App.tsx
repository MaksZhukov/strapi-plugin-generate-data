import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { useEffect, useRef } from 'react';

const App = () => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		let parentNode = ref.current?.parentNode;
		if (parentNode) {
			(parentNode as HTMLDivElement).style.overflow = 'hidden';
		}
	}, []);
	return (
		<div ref={ref}>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="*" element={<Page.Error />} />
			</Routes>
		</div>
	);
};

export { App };
