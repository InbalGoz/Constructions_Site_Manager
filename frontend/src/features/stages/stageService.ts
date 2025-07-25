import axios from "axios";
import type { Stage } from "../../models/stage";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/stages";

export async function fetchAllStages(): Promise<Stage[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  return response.data.success
    ? (response.data.data as Stage[])
    : Promise.reject(response.data.error);
}
