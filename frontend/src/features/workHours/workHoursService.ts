import axios from "axios";
import type { WorkHours, NewWorkHour } from "../../models/workHours";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/workHours";

export async function fetchAllWorkHours(): Promise<WorkHours[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  return response.data.success
    ? (response.data.data as WorkHours[])
    : Promise.reject(response.data.error);
}

export async function fetchFilteredWorkHours(
  employeeId: number,
  siteId: number,
  month: string
): Promise<WorkHours[]> {
  const response: Res = await axios.get(`${BASE_URL}`, {
    params: { employeeId, siteId, month },
  });
  return response.data.success
    ? (response.data.data as WorkHours[])
    : Promise.reject(response.data.error);
}

export async function createWorkHour(
  workHourData: NewWorkHour
): Promise<WorkHours> {
  const response: Res = await axios.post(`${BASE_URL}`, workHourData); //send data to the body of the req
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as WorkHours)
    : Promise.reject(response.data.error);
}

export async function updateWorkHour(
  workHoursId: number,
  workHourData: WorkHours
): Promise<WorkHours> {
  const response: Res = await axios.put(`${BASE_URL}`, workHourData, {
    params: { workHoursId },
  });
  // const response: Res = await axios.put(`${BASE_URL}/${workHoursId}`, workHourData); //send data to the body of the req
  return response.data.success
    ? (response.data.data as WorkHours)
    : Promise.reject(response.data.error);
}

export async function deleteWorkHour(workHoursId: number): Promise<WorkHours> {
  const response: Res = await axios.delete(`${BASE_URL}/${workHoursId}`); //send id in the url of the req
  return response.data.success
    ? (response.data.data as WorkHours)
    : Promise.reject(response.data.error);
}
