import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Layout, Select, TimePicker, Menu, Dropdown } from 'antd';

import { BasicObject } from 'interfaces/common';
import 'antd/dist/antd.css';

const { Sider } = Layout;
const { Option } = Select;

interface FiltersProps {
  filters: any[];
  getFilters?: ({}) => void;
  mode?: 'sider' | 'dropdown';
};

const defaultProps: FiltersProps = {
  filters: [],
  mode: 'sider'
}

const filtersParsed: BasicObject = {};

export interface FiltersElement {
  element: string;
  key: string;
  value: string | string[];
};

const setFilters = (props: FiltersElement) => {
  const { key, value } = props;
  if (value === null || value === undefined || !value.length) {
    delete filtersParsed[key]
  } else {
    filtersParsed[key] = value;
  };
}

export const Filters = (props = defaultProps) => {
  const { filters, getFilters, mode } = props;

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    // initialize filters
    filters.forEach((filterInfo: any) => {
      const { element, key, defaultValue } = filterInfo;
      if (typeof element === 'string' && defaultValue) {
        filtersParsed[key] = defaultValue;
      }
    });
  }, []);

  const filtersContent = filters.map((infoFilter: any) => {
    const { element, key, onChange } = infoFilter;

    if (typeof element !== "string") return element;

    const infoFilterParams = {
      ...infoFilter,
      onChange: (param1: any, param2: any) => {
        let value;
        switch (element) {
          case 'Input': value = param1.target.value; break;
          case 'DatePicker':
          case 'TimePicker':
            value = param2;
            break;
          default: value = param1;
        }

        setFilters({ element, key, value });
        if (onChange) onChange(value);
        if (getFilters) {
          getFilters(filtersParsed);
        }

        // add filter in the url
        // window.history.pushState('', '', `?search=${parseFilterObject(filtersParsed)}`);
      }
    };

    if (element === "Select") {
      return (
        <Select
          className="marginTop width100"
          key={key}
          { ...infoFilterParams }
        >
          {infoFilter.options && (
            infoFilter.options.map((info: any) => (
              <Option key={`${key}-option-${info.key || info.value || info.label}`} {...info}>{info.label}</Option>
            ))
          )}
        </Select>
      );
    }

    if (element === "DatePicker") {
      return (
        <DatePicker
          className="marginTop width100"
          key={key}
          { ...infoFilterParams }
        />
      );
    }

    if (element === "TimePicker") {
      return (
        <TimePicker
          className="marginTop width100"
          key={key}
          { ...infoFilterParams }
        />
      );
    }

    return (
      <Input
        className="marginTop"
        key={key}
        {...infoFilterParams}
      />
    );
  });

  return (
    mode  === 'dropdown' ? (
        <Dropdown overlay={
          <Menu>
            {filtersContent}
          </Menu>
        } placement="bottom" arrow visible={showFilterMenu}>
          <Button onClick={() => setShowFilterMenu(!showFilterMenu)}>bottom</Button>
        </Dropdown>
      ) : mode  === 'sider' ?
    (<Sider className="site-layout-background height100 width100">
      {filtersContent}
    </Sider>) : <Layout className="width100 height100">
    {filtersContent}
  </Layout>
  );
}
