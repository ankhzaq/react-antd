import React, { useEffect, useState } from 'react';
import Header from "components/Header";
import { createServerFunc } from 'helpers/mockServer';
import PivotGrid from 'components/PivotGrid';


function Hammurabi() {

  useEffect(() => {
    createServerFunc();
  }, []);

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];

  const groupBy = ["id"];

  const rows = [
    { id: 0, title: 'Example' },
    { id: 0, title: 'Example 2' },
    { id: 0, title: 'Example 3' },
    { id: 1, title: 'Demo' },
    { id: 1, title: 'Demo 2' },
    { id: 1, title: 'Demo 3' },
  ];

  return (
    <>
      <Header title="Hammurabi" />
      <PivotGrid
        columns={columns}
        groupBy={groupBy}
        rows={rows}
      />
    </>
  );
}

export default Hammurabi;
