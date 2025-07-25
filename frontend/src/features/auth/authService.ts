import axios from "axios";
import type { User, loginData, AuthPayload } from "../../models/user";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/login";

export async function loginUser(userData: loginData): Promise<AuthPayload> {
  const response: Res = await axios.post(`${BASE_URL}`, userData);
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as AuthPayload)
    : Promise.reject(response.data.error);
}

export async function getCurrentUser(token: string): Promise<AuthPayload> {
  const response: Res = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.success
    ? {
        token,
        user: response.data.data as User,
      }
    : Promise.reject(response.data.error);
}
