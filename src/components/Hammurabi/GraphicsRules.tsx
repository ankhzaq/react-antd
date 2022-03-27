import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import hammurabiGraphic from 'mockups/hammurabiGraphic.json';
import { connect } from 'react-redux';
import { useReducer } from 'reinspect';
import { reducer } from '../../helpers/store';
import { endpoints } from '../../helpers/consts';

interface GraphicsRulesProps {
  getData: () => void;
}

const GraphicsRules = (props: GraphicsRulesProps) => {

  const { getData } = props;

  const [state, dispatch] = useReducer(reducer, {}, state => state, "hammurabiReducer");

  const [data, setData] = useState([]);

  // graphicRules
  useEffect( () => {
    dispatch({ type: 'hammurabi_graphicRules_requested', payload: {} });
    const data = fetch(endpoints.hammurabiGraphicRules.url)
      .then(response => response.json())
      .then(response => {
        const responseParsed = response.data.map((ruleInfo: any) => {
          const { principleType, ruleType } = ruleInfo
          const data = { ...ruleInfo, rule: `${principleType}.${ruleType}`};
          return data;
        });
        setData(responseParsed);
      });
    dispatch({
      type: 'hammurabi_graphicRules_succeeded',
      payload: { data },
    });
  }, []);

  return (
    <Column
      color={({ rule }) => {
        const [ principleType ] = rule.split('.');
        if (parseInt(principleType) > 5) return 'royalblue';
        return 'darksalmon';
      }}
      data={data}
      xField="rule"
      yField="count"
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getData: () => dispatch({
    type: 'hammurabi_graphicRules_requested',
    payload: {},
  })
});

export default connect(null, mapDispatchToProps)(GraphicsRules);
