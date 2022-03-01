import { createServer, Model } from "miragejs"
import { endpoints } from './consts';

export const createServerFunc = () => {
  createServer({
    routes() {
      this.namespace = ""

      this.get(endpoints.objectNoRules.url, () => {
        // @ts-ignore
        return { data: endpoints.objectNoRules.mockup, pagination: { totalElements: endpoints.objectNoRules.mockup.data.length } }
      })
    },
  });
}
