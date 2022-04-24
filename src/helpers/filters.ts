import { eq } from 'rsql';
import qs from 'query-string';
import decodeUri from 'decode-uri-component';

import { BasicObject } from '../interfaces/common';
import { FiltersElement } from 'components/Filters/Filters';

export const parseFilterObject = (filters: BasicObject, mode: string = 'rsql') => {
  if (mode === 'query') return qs.stringify(filters);

  let filterRSQLParsed = '';
  Object.keys(filters).forEach((keyFilter) => {
    const value = filters[keyFilter];
    if (filterRSQLParsed.length) filterRSQLParsed += ';';
    filterRSQLParsed += eq(keyFilter,value).string();
  })
  return filterRSQLParsed;
}

export const parseFilterString = (filters: string) => {
  const filterStringDecode = decodeUri(filters);
  const filtersSplited = filterStringDecode.split(';');

  const result: BasicObject = {};
  filtersSplited.forEach((filter: string) => {
    const [key, value] = filter.split("==");
    result[key] = value && value.replaceAll("'","");
  });

  return result;
}

export const setValuesCommonFilters = (filters: FiltersElement[], data: BasicObject) => {
  return filters.map((filter: FiltersElement) => {
    const { element, key } = filter;
    if (typeof element !== 'string') return element;
    return ({
      ...filter,
      value: data[key] || null
    })
  })
}
