import type { EmployeePhoneNum } from '../types/EmployeePhoneNum';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

const BASE_PATH = '/api/employee-phone-num';

export async function getAllEmployeePhoneNum(): Promise<EmployeePhoneNum[]> {
  return apiGet<EmployeePhoneNum[]>(BASE_PATH);
  }

  export async function getEmployeePhoneNumByEmployeeId(employeeId: string): Promise<EmployeePhoneNum[]> {
    return apiGet<EmployeePhoneNum[]>(`${BASE_PATH}?employeeId=${employeeId}`);
  }

export async function createEmployeePhoneNum(phoneNum: EmployeePhoneNum): Promise<EmployeePhoneNum> {
  return apiPost<EmployeePhoneNum>(BASE_PATH, phoneNum);
}

export async function deleteEmployeePhoneNum(employeeID: string, phoneNum: string): Promise<void>  {
  return apiDelete<void>(`${BASE_PATH}/${employeeID}/${encodeURIComponent(phoneNum)}`);
}