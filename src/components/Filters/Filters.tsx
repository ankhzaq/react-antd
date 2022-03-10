import 'antd/dist/antd.css';
import { Input, Layout, Select } from 'antd';

interface FiltersProps {
  filters: any[]
};

const defaultProps: FiltersProps = {
  filters: []
}

export const Filters = (props = defaultProps) => {
  const { filters } = props;
  return (
    <Layout className="width100 height100">
      {filters.map((infoFilter: any) => {
        const { element } = infoFilter;
        if (element === "select") {
          return (
            <Select
              { ...infoFilter }
            >
              {infoFilter.options && (
                infoFilter.options.map((info: any) => (
                  <Select.Option {...info}>{info.label}</Select.Option>
                ))
              )}
            </Select>
          );
        }
        return (
          <Input {...infoFilter} />
        );
      })}
    </Layout>
  );
}
