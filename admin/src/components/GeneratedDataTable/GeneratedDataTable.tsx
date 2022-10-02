import React, { useState, useEffect } from 'react';

import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { PageLink, Pagination } from '@strapi/design-system/v2/Pagination';
import { Typography } from '@strapi/design-system/Typography';
import MediaCell from './MediaCell';
import { AttributeType } from '../../pages/HomePage/types';

interface Props {
	data: any[];
	attributes: any;
	checkedAttributes: string[];
}

const COUNT_PAGINATION_ROWS = 25;

const GeneratedDataTable = ({ data, attributes, checkedAttributes }: Props) => {
	const [activePage, setActivePage] = useState<number>(1);

	useEffect(() => {
		setActivePage(1);
	}, [data.length]);

	const handleChangePagination = (page: number) => () => {
		setActivePage(page);
	};

	const pageCount = Math.floor(data.length / COUNT_PAGINATION_ROWS);

	const headKeys = Object.keys(data[0]).filter((key) =>
		checkedAttributes.includes(key)
	);

	const renderCell = (item: any, index: number) => {
		if (attributes[headKeys[index]].type === AttributeType.Media) {
			return <MediaCell data={item} />;
		}

		if (attributes[headKeys[index]].type === AttributeType.JSON) {
			return (
				<pre style={{ maxHeight: 200, overflowY: 'auto' }}>
					{JSON.stringify(item, undefined, 2)}
				</pre>
			);
		}

		return <Typography>{item.toString()}</Typography>;
	};

	return (
		<Table
			footer={
				<Pagination activePage={activePage} pageCount={pageCount}>
					{new Array(pageCount).fill(null).map((item, index) => (
						<PageLink
							number={index + 1}
							onClick={handleChangePagination(index + 1)}>
							Go to page {index + 1}
						</PageLink>
					))}
				</Pagination>
			}>
			<Thead>
				<Tr>
					<Th>
						<Typography textColor='neutral600' variant='sigma'>
							ROW
						</Typography>
					</Th>
					{headKeys.map((key) => (
						<Th>
							<Typography textColor='neutral600' variant='sigma'>
								{attributes[key].type === AttributeType.Relation
									? `${key} (ID)`
									: key}
							</Typography>
						</Th>
					))}
				</Tr>
			</Thead>
			<Tbody>
				{data
					.slice(
						(activePage - 1) * COUNT_PAGINATION_ROWS,
						COUNT_PAGINATION_ROWS * activePage
					)
					.map((item, index) => (
						<Tr>
							<Td>
								{index +
									1 +
									(activePage - 1) * COUNT_PAGINATION_ROWS}
							</Td>
							{Object.keys(item).map((key, i) => (
								<Td key={key}>{renderCell(item[key], i)}</Td>
							))}
						</Tr>
					))}
			</Tbody>
		</Table>
	);
};

export default GeneratedDataTable;
