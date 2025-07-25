import axios from "axios";
import type { SiteStage } from "../../models/siteStage";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/site";

export async function fetchAllSiteStage(siteId: number): Promise<SiteStage[]> {
  const response: Res = await axios.get(`${BASE_URL}/${siteId}/siteStages`);
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as SiteStage[])
    : Promise.reject(response.data.error);
}

export async function createSiteStage(
  //siteId: number,
  //stageId: number,
  siteStageData: SiteStage
): Promise<SiteStage> {
  const response: Res = await axios.post(
    `${BASE_URL}/${siteStageData.siteId}/siteStages`,
    siteStageData
  ); //send data to the body of the req
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as SiteStage)
    : Promise.reject(response.data.error);
}

export async function updateSiteStage(
  //siteId: number,
  // siteStageId: number,
  siteStageData: SiteStage
): Promise<SiteStage> {
  const response: Res = await axios.put(
    `${BASE_URL}/${siteStageData.siteId}/siteStages`,
    siteStageData
  ); //send data to the body of the req
  return response.data.success
    ? (response.data.data as SiteStage)
    : Promise.reject(response.data.error);
}

export async function deleteSiteStage(
  siteId: number,
  siteStageId: number
): Promise<SiteStage> {
  const response: Res = await axios.delete(
    `${BASE_URL}/${siteId}/siteStages/${siteStageId}`
  );
  /* , {
    params: { siteStageId },
  }); */ //send id in the url of the req
  return response.data.success
    ? (response.data.data as SiteStage)
    : Promise.reject(response.data.error);
}
