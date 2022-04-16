import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { connect, useSelector } from 'react-redux';

interface GraphicStorageZonesProps {
  getData: () => void;
}

const config: any = {
  appendPadding: 10,
  angleField: 'numJobs',
  colorField: 'storageZoneType',
  radius: 1,
  innerRadius: 0.6,
  label: {
    autoRotate: false,
    type: 'inner',
    offset: '-50%',
    style: {
      textAlign: 'center',
      fontSize: 14,
    },
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
  statistic: {
    title: false,
    content: {
      style: {
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      content: 'AntV\nG2Plot',
    },
  },
};

const GraphicStorageZones = (props: GraphicStorageZonesProps) => {

  const { getData } = props;

  const { drilldown } = useSelector((state: any) => state);
  const { graphicStorageZones: { data } } = drilldown;

  useEffect(() => {
    getData();
  }, []);
  if (data && data.data) {
    config.data = data.data;
  }

  return (
    data && data.data ? (
        <Pie
          {...config}
        />
      ) : null

  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getData: () => dispatch({
    type: 'drilldown_graphicStorageZones_requested',
    payload: {}
  })
});

export default connect(null, mapDispatchToProps)(GraphicStorageZones);
