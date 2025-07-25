import axios from "axios";
import type { Employee, NewEmployee } from "../../models/employee";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/employees";

export async function fetchAllEmployees(): Promise<Employee[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  return response.data.success
    ? (response.data.data as Employee[])
    : Promise.reject(response.data.error);
}

export async function fetchEmployeeById(employeeId: number): Promise<Employee> {
  const response: Res = await axios.get(`${BASE_URL}`, {
    params: { employeeId },
  });
  return response.data.success
    ? (response.data.data as Employee)
    : Promise.reject(response.data.error);
}

export async function createEmployee(
  employeeData: NewEmployee
): Promise<Employee> {
  const response: Res = await axios.post(`${BASE_URL}`, employeeData);
  console.log(response.data.success);
  return response.data.success
    ? (response.data.data as Employee)
    : Promise.reject(response.data.error);
}

export async function updateEmployee(
  employeeId: number,
  employeeData: Employee
): Promise<Employee> {
  const response: Res = await axios.put(`${BASE_URL}`, employeeData, {
    params: { employeeId },
  });
  return response.data.success
    ? (response.data.data as Employee)
    : Promise.reject(response.data.error);
}

export async function deleteEmployee(employeeId: number): Promise<Employee> {
  const response: Res = await axios.delete(`${BASE_URL}/${employeeId}`); //send id in the url of the req
  return response.data.success
    ? (response.data.data as Employee)
    : Promise.reject(response.data.error);
}
