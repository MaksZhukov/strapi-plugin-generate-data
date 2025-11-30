import { useState, useEffect } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
	Button,
	Flex,
	Pagination,
	Typography
} from '@strapi/design-system';
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

	const pageCount = Math.ceil(data.length / COUNT_PAGINATION_ROWS);

	const headKeys = Object.keys(data[0]).filter((key) => checkedAttributes.includes(key));

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
			colCount={headKeys.length + 1}
			rowCount={data.length}
			footer={
				<Flex justifyContent="center" padding={[2, 2]}>
					<Pagination activePage={activePage} pageCount={pageCount}>
						{new Array(pageCount).fill(null).map((item, index) => (
							<Button
								key={index}
								onClick={handleChangePagination(index + 1)}
								variant="tertiary"
							>
								{index + 1}
							</Button>
						))}
					</Pagination>
				</Flex>
			}
		>
			<Thead>
				<Tr>
					<Th>
						<Typography textColor="neutral600" variant="sigma">
							ROW
						</Typography>
					</Th>
					{headKeys.map((key) => (
						<Th key={key}>
							<Typography textColor="neutral600" variant="sigma">
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
						<Tr key={index}>
							<Td>{index + 1 + (activePage - 1) * COUNT_PAGINATION_ROWS}</Td>
							{headKeys.map((key, i) => (
								<Td key={key}>{renderCell(item[key], i)}</Td>
							))}
						</Tr>
					))}
			</Tbody>
		</Table>
	);
};

export default GeneratedDataTable;
