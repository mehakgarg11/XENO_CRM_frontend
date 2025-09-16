import api from "../lib/api";


export async function getAllCustomers() {
  
  const { data } = await api.get("/customers/all");
  return data.obj || []; 
}
