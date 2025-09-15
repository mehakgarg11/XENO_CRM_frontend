import api from "../lib/api";

export async function getOverview() {
  
  const { data } = await api.get("/analytics/overview");
  return data;
}

export async function getCampaignPerformance({ range = "7d", campaign = "all" } = {}) {
  
  const { data } = await api.get(`/analytics/campaign-performance`, {
    params: { range, campaign },
  });
  return data;
}