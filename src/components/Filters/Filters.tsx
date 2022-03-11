import 'antd/dist/antd.css';
import { DatePicker, Input, Layout, Select, TimePicker } from 'antd';
import { BasicObject } from 'interfaces/common';
interface FiltersProps {
  filters: any[];
  getFilters?: ({}) => void;
};

const defaultProps: FiltersProps = {
  filters: []
}

const filtersParsed: BasicObject = {};

interface filtersElement {
  element: string;
  key: string;
  value: string | string[];
};

const setFilters = (props: filtersElement) => {
  const { key, value } = props;
  if (value === null || value === undefined || !value.length) {
    delete filtersParsed[key];
  } else {
    filtersParsed[key] = value;
  };
}

export const Filters = (props = defaultProps) => {
  const { filters, getFilters } = props;
  return (
    <Layout className="width100 height100">
      {filters.map((infoFilter: any) => {
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
          }
        };

        if (element === "Select") {
          return (
            <Select
              { ...infoFilterParams }
            >
              {infoFilter.options && (
                infoFilter.options.map((info: any) => (
                  <Select.Option {...info}>{info.label}</Select.Option>
                ))
              )}
            </Select>
          );
        }

        if (element === "DatePicker") {
          return (
            <DatePicker
              { ...infoFilterParams }
            />
          );
        }

        if (element === "TimePicker") {
          return (
            <TimePicker
              { ...infoFilterParams }
            />
          );
        }

        return (
          <Input {...infoFilterParams} />
        );
      })}
    </Layout>
  );
}
