import type { Employee } from '../types/Employee';
import { apiGet, apiPost , apiDelete} from './apiClient';


const BASE_PATH = '/api/employee';


export async function getAllEmployees(): Promise<Employee[]> {
  return apiGet<Employee[]>(BASE_PATH);
}
/**
* @param id the EmployeeById
* @returns
*/
export async function getEmployeeById(employeeID: string): Promise<Employee> {
  return apiGet<Employee>(`${BASE_PATH}/${employeeID}`);
}
/**
* @param employee
* @returns
*/
export async function createEmployee(employee: Omit<Employee, 'employeeID'>): Promise<Employee> {
  return apiPost<Employee>(BASE_PATH, employee);
  }


export async function deleteEmployee(id: string): Promise<void>  {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}