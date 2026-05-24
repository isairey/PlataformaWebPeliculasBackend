import BaseApi from "./BaseApi";

const endpoint = {
  base: "/people",
  search: "/people/search",
};

class PersonApi extends BaseApi {
  constructor() {
    super(endpoint);
  }

  getCredits = (id) => this.client.get(`${this.endpoint.base}/${id}/credits`);
}

export default PersonApi;
