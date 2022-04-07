import { eq } from 'rsql';
import qs from 'query-string';
import decodeUri from 'decode-uri-component';

import { BasicObject } from '../interfaces/common';

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
