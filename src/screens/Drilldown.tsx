import React, { useEffect, useState } from 'react';
import Header from "components/Header";
import Grid from 'components/Grid';
import { createServerFunc } from 'helpers/mockServer';
import { endpoints } from 'helpers/consts';
import { ResponseObjectNoRules } from 'interfaces/ObjectNoRules';
import Toolbar from 'components/Toolbar';
import { connect, useSelector } from 'react-redux';
import { setSessionStorage } from '../helpers/sessionStorage';
import { useReducer } from 'reinspect';
import { reducer } from '../helpers/store';

interface PropsDrilldown {
  getData: () => void,
}


let totalElementsGrid: number = 0;
function Drilldown(props: PropsDrilldown) {
  const { getData } = props;

  const { drilldown = { gridMetrics: { data: {} } } } = useSelector((state: any) => state);
  const { gridMetrics: { data } } = drilldown;

  useEffect(() => {
    // createServerFunc();
    getData();
  }, []);

  // @ts-ignore

  const columns = (data && data.data) ? Object.keys(data.data[0]) : [];
  return (
    <>
      <Header title="Drilldown" />
      <Toolbar>
        Search results |
      </Toolbar>
      <Grid
        gridOptions={{
          columnDefs: columns.map((columnKey) => ({
            headerName: columnKey,
            field: columnKey,
            filter: true,
            flex: 1,
            sortable: true,
          })),
          onGridReady: (params: any) => {
            fetch(endpoints.drilldownGridMetrics.url)
              .then((resp) => resp.json())
              .then((response) => {
                const dataSource = {
                  rowCount: null,
                  getRows: function (params: any) {
                    setTimeout( function() {
                      if (!totalElementsGrid || params.startRow < totalElementsGrid) {
                        params.successCallback(response.data);
                      }
                    }, 500);
                  }
                };
                params.api.setDatasource(dataSource);
              });
          }
        }}
        height={`${window.innerHeight * 0.9}px`}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  getData: () => dispatch({
    type: 'drilldown_gridMetrics_requested',
    payload: {}
  })
});

export default connect(null, mapDispatchToProps)(Drilldown);
