import { createServer, Model } from "miragejs"
import { endpoints } from './consts';

export const createServerFunc = () => {
  createServer({
    routes() {
      this.namespace = ""

      Object.keys(endpoints).forEach((endpointKey: string) => {
        this.get(endpoints[endpointKey].url, () => {
          return endpoints[endpointKey].mockup;
        });
      });
    },
  });
}
