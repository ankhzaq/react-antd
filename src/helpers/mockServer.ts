import { createServer, Model } from "miragejs"
import { parseFilterString } from './filters';
import { endpoints } from './calls';

export const createServerFunc = () => {

  const applyFilterRSQL = (url: string, data:any) => {
    const [_, query] = url.split("search=");
    const filtersObject = parseFilterString(query);
    const dataFiltered = data.data.filter((row:any) => {
      const keysFilters = Object.keys(filtersObject);
      return keysFilters.every((keyFilter) => (row[keyFilter] === undefined) || (row[keyFilter] === filtersObject[keyFilter]));
    })
    return {
      ...data,
      data: dataFiltered,
      pagination: {
        totalElements: dataFiltered.length
      }
    }
  }

  createServer({
    routes() {
      this.namespace = ""

      Object.keys(endpoints).forEach((endpointKey: string) => {
        this.get(endpoints[endpointKey].url, (_, param: any) => {
          const { url } = param;
          const searchQueryRSQLExists = url.includes('search=');
          if (searchQueryRSQLExists) {
            return applyFilterRSQL(url, endpoints[endpointKey].mockup);
          }
          return endpoints[endpointKey].mockup;
        });
      });
    },
  });
}
