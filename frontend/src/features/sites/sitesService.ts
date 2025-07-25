/*ביצוע בקשות לשרת*/
import axios from "axios";
import type { Site } from "../../models/site";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/sites";

export async function fetchAllSites(): Promise<Site[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  return response.data.success
    ? (response.data.data as Site[])
    : Promise.reject(response.data.error);
}

export async function fetchSiteById(siteId: number): Promise<Site> {
  const response: Res = await axios.get(`${BASE_URL}/${siteId}`);
  return response.data.success
    ? (response.data.data as Site)
    : Promise.reject(response.data.error);
}

export async function createSite(siteData: Site): Promise<Site> {
  const response: Res = await axios.post(`${BASE_URL}`, siteData); //send data to the body of the req
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as Site)
    : Promise.reject(response.data.error);
}

export async function updateSite(
  siteId: number,
  siteData: Site
): Promise<Site> {
  const response: Res = await axios.put(`${BASE_URL}/${siteId}`, siteData); //send data to the body of the req
  return response.data.success
    ? (response.data.data as Site)
    : Promise.reject(response.data.error);
}

export async function deleteSite(siteId: number): Promise<Site> {
  const response: Res = await axios.delete(`${BASE_URL}/${siteId}`); //send id in the url of the req
  return response.data.success
    ? (response.data.data as Site)
    : Promise.reject(response.data.error);
}
