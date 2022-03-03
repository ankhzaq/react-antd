import { createServer, Model } from "miragejs"
import { endpoints } from './consts';

export const createServerFunc = () => {
  createServer({
    routes() {
      this.namespace = ""

      this.get(endpoints.objectNoRules.url, () => {
        return endpoints.objectNoRules.mockup;
      });
      this.get(endpoints.hammurabi.url, () => {
        return endpoints.hammurabi.mockup;
      });
    },
  });
}
