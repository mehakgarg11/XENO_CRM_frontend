import api from "./axios";


const BASE = "/campaigns";

export async function previewAudience(rule) {
  const { data } = await api.post(`${BASE}/preview`, { rule });
  return data;             
}

export async function createCampaign(payload) {
  const { data } = await api.post(`${BASE}/create`, payload);
  return data;              
}

export async function getCampaignHistory() {
  const { data } = await api.get(`${BASE}/history`);
  return data;              
}

export async function getCampaigns() {
  const { data } = await api.get(`${BASE}/all`);
  return data;              
}
