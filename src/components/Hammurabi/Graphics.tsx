import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import hammurabiGraphic from 'mockups/hammurabiGraphic.json';

const Graphics = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setData(hammurabiGraphic.data);
    }, 1000);
  }, []);
  return <Column data={data} isStack seriesField="storageZoneType" xField="countryId" yField="value" />;
};
export default Graphics;
