import { useState, useEffect } from "react";

import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import {
    Dots,
    NextLink,
    PageLink,
    Pagination,
    PreviousLink,
} from "@strapi/design-system/v2/Pagination";

interface Props {
    data: any[];
}

const COUNT_PAGINATION_ROWS = 25;

const GeneratedDataTable = ({ data }: Props) => {
    const [activePage, setActivePage] = useState<number>(1);

    useEffect(() => {
        setActivePage(1);
    }, [data.length]);

    const handleChangePagination = (page: number) => () => {
        setActivePage(page);
    };

    const pageCount = Math.floor(data.length / COUNT_PAGINATION_ROWS);
    return (
        <Table
            footer={
                <Pagination
                    activePage={activePage}
                    pageCount={pageCount}
                    className="hello"
                >
                    {new Array(pageCount).fill(null).map((item, index) => (
                        <PageLink
                            number={index + 1}
                            onClick={handleChangePagination(index + 1)}
                        >
                            Go to page {index + 1}
                        </PageLink>
                    ))}
                </Pagination>
            }
        >
            <Thead>
                <Tr>
                    <Th>row</Th>
                    {Object.keys(data[0]).map((key) => (
                        <Th>{key}</Th>
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
                            {Object.keys(item).map((key) => (
                                <Td>{item[key]}</Td>
                            ))}
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default GeneratedDataTable;
