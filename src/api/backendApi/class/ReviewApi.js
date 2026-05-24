import axiosClient from "../axiosClient";

const endpoint = {
  base: "/reviews",
  top: "top",
  sentimentOverview: "sentiment_overview",
};

class ReviewApi {
  constructor() {
    this.client = axiosClient;
    this.endpoint = endpoint;
  }

  getTopReviews = (mediaId, limit = 5) =>
    this.client.get(`${this.endpoint.base}/${this.endpoint.top}`, {
      params: { mediaId, limit },
    });

  getSentimentOverview = (mediaId) =>
    this.client.get(
      `${this.endpoint.base}/${this.endpoint.sentimentOverview}`,
      {
        params: { mediaId },
      }
    );
}

export default ReviewApi;
