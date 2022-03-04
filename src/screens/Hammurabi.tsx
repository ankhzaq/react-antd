import React, { useEffect, useState } from 'react';
import Header from "components/Header";
import { createServerFunc } from 'helpers/mockServer';
import PivotGrid from 'components/PivotGrid';
import { endpoints, heights } from '../helpers/consts';
import { PivotGridProps } from 'components/PivotGrid/PivotGrid';
import { Button } from 'antd';
import 'antd/dist/antd.css';

interface Column {
  key: string;
  name: string;
}

const defaultInfoGrid: PivotGridProps = {
  rows: [],
  columns: [],
  groupBy: ['country', 'area', 'storageZone']
};

function Hammurabi() {

  const [infoGrid, setInfoGrid] = useState(defaultInfoGrid);

  const { rows, columns, groupBy } = infoGrid;

  useEffect(() => {
    createServerFunc();
    fetch(endpoints.hammurabi.url)
      .then((resp) => resp.json())
      .then((response) => {
        const firstElement = response.data[0];
        if (firstElement) {
          const columns = Object.keys(firstElement).filter((key) => key.includes('Count') || infoGrid.groupBy.includes(key));
          const columnsResponse = columns.map((key) => ({
            key,
            groupFormatter: function (props: any) {
              const { childRows, groupKey } = props;
              if (!key.includes('Count')) return <>{groupKey}</>;
              // @ts-ignore
              return <Button>{childRows.reduce((prev, value) => prev + value[key], 0)}</Button>;
            },
            name: key,
          }));

          setInfoGrid({ ...infoGrid, columns: columnsResponse, rows: response.data });
        }
      });
  }, []);

  return (
    <div className="flex">
      <div className="flex1">
        <Header title="Hammurabi" />
      </div>
      {rows && (
        <div className="flex1">
          <PivotGrid
            columns={columns}
            groupBy={groupBy}
            height={window.innerHeight - heights.header}
            rows={rows}
          />
        </div>
      )}
    </div>
  );
}

export default Hammurabi;
