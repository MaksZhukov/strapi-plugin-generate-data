import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { useEffect, useRef } from 'react';
import { Box, DesignSystemProvider } from '@strapi/design-system';
const App = () => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		let parentNode = ref.current?.parentNode;
		if (parentNode) {
			(parentNode as HTMLDivElement).style.overflow = 'hidden';
		}
	}, []);
	return (
		<DesignSystemProvider>
			<Box height="100%" overflow="auto" ref={ref}>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="*" element={<Page.Error />} />
				</Routes>
			</Box>
		</DesignSystemProvider>
	);
};

export { App };
