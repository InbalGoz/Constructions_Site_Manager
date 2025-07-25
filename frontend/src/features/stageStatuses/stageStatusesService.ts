import axios from "axios";
import type { stageStatuses } from "../../models/stageStatuses";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/stageStatuses";

export async function fetchAllstageStatuses(): Promise<stageStatuses[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  return response.data.success
    ? (response.data.data as stageStatuses[])
    : Promise.reject(response.data.error);
}
