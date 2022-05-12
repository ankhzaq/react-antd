import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Layout, Select, TimePicker, Menu, Dropdown, Form } from 'antd';

import { BasicObject } from 'interfaces/common';
import 'antd/dist/antd.css';
import moment from 'moment';

const { Sider } = Layout;
const { Option } = Select;

interface FiltersProps {
  filters: any[];
  getFilters?: ({}) => void;
  setFormRef?: ({}) => void;
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
  const { filters, getFilters, mode, setFormRef } = props;

  const [form] = Form.useForm();

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    // initialize filters
    filters.forEach((filterInfo: any) => {
      const { element, key, defaultValue } = filterInfo;
      if (typeof element === 'string' && defaultValue) {
        filtersParsed[key] = defaultValue;
      }
    });
    form.setFieldsValue(filtersParsed);
    if (setFormRef) setFormRef(form);
  }, []);

  const filtersContent = filters.map((infoFilter: any) => {
    const { element, key, onChange } = infoFilter;

    if (typeof element !== "string") return element;

    const infoFilterParams = {
      ...infoFilter,
      defaultValue: null,
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
        const nextValues:BasicObject = {};
        if (element === 'DatePicker' || element === 'TimePicker') nextValues[key] = moment(value);
        else nextValues[key] = value;

        form.setFieldsValue(nextValues);

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
        <Form.Item name={key}>
          <Select
            className="marginTop width100"
            key={key}
            { ...infoFilterParams }
            defaultValue={null}
          >
            {infoFilter.options && (
              infoFilter.options.map((info: any) => (
                <Option key={`${key}-option-${info.key || info.value || info.label}`} {...info}>{info.label}</Option>
              ))
            )}
          </Select>
        </Form.Item>
      );
    }

    if (element === "DatePicker") {
      return (
        <Form.Item name={key}>
          <DatePicker
            className="marginTop width100"
            key={key}
            { ...infoFilterParams }
            defaultValue={null}
          />
        </Form.Item>
      );
    }

    if (element === "TimePicker") {
      return (
        <Form.Item name={key}>
          <TimePicker
            className="marginTop width100"
            key={key}
            { ...infoFilterParams }
            defaultValue={null}
          />
        </Form.Item>
      );
    }

    return (
      <Form.Item name={key}>
      <Input
        className="marginTop"
        key={key}
        {...infoFilterParams}
        defaultValue={null}
      />
      </Form.Item>
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
      <Form form={form} name="control-hooks">
        {filtersContent}
      </Form>
    </Sider>) : (
      <Layout className="width100 height100">
        <Form form={form} name="control-hooks">
          {filtersContent}
        </Form>
      </Layout>
    )
  );
}
