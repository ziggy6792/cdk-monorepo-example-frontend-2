/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import MUIDataTable, { MUIDataTableProps, MUIDataTableColumn } from 'mui-datatables';

import _ from 'lodash';
import { IDataTableRow } from './types';

// interface IRowMeta {
//     id: string;
// }

export interface IMUIDataTableProps extends Omit<MUIDataTableProps['options'], 'onRowClick'> {
    onRowClick: (tableRow: IDataTableRow) => void;
}

interface IDataTableProps extends Omit<MUIDataTableProps, 'data' | 'options'> {
    tableData: IDataTableRow[];
    options: IMUIDataTableProps;
    // myOnRowClick?: (
    //     rowData: string[],
    //     rowMeta: {
    //         dataIndex: number;
    //         rowIndex: number;
    //     }
    // ) => void;
}

const getSortRet = (value, order) => {
    const defaultSortIndex = 0;

    if (value) {
        return value;
    }
    if (order === 'asc') {
        const ret = Number.MAX_SAFE_INTEGER - defaultSortIndex;
        return ret;
    }
    if (order === 'desc') {
        const ret = Number.MIN_SAFE_INTEGER + defaultSortIndex;
        return ret;
    }
    return null;
};

const DataTable: React.FC<IDataTableProps> = props => {
    const { tableData: tableRows, ...rest } = props;

    const tableDisplayData = [];

    tableRows.forEach(({ rowData: cellData }) => {
        const cellDisplayData = {};

        Object.keys(cellData).forEach(key => {
            const value = cellData[key];

            if (typeof value === 'string') {
                cellDisplayData[key] = value;
            }
            if (typeof value === 'object' && value.displayText) {
                cellDisplayData[key] = value.displayText;
            }
        });
        tableDisplayData.push(cellDisplayData);
    });

    console.log(tableDisplayData);

    const customSort = (dataToSort: any[], colIndex: number, order: 'desc' | 'asc'): any[] => {
        const reverse = false;

        const retData = _.orderBy(
            dataToSort,
            item => {
                // console.log('index', item.index);
                // console.log('original', tableRows[item.index]);
                // const sortIndex = tableRows[item.index].cellData

                const columKey = (props.columns[colIndex] as MUIDataTableColumn).name;
                const origCellData = tableRows[item.index].rowData[columKey];

                const sortIndex = typeof origCellData === 'string' ? origCellData : origCellData.sortIndex;

                const val = getSortRet(sortIndex, order);
                return val;
            },
            order
        );
        return reverse ? retData.reverse() : retData;
    };

    props.options.customSort = customSort;

    return (
        <MUIDataTable
            {...props}
            options={{
                ...props.options,
                onRowClick: (rowData, rowMeta) => {
                    const { dataIndex } = rowMeta;
                    // console.log(`internal clicked`, tableRows[dataIndex].rowMetaData);
                    props.options.onRowClick(tableRows[dataIndex]);
                },
            }}
            data={tableDisplayData}
        />
    );
};

export default DataTable;
