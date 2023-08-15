import axios from 'axios';
import queryString from 'query-string';
import { RefereeInterface, RefereeGetQueryInterface } from 'interfaces/referee';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReferees = async (query?: RefereeGetQueryInterface): Promise<PaginatedInterface<RefereeInterface>> => {
  const response = await axios.get('/api/referees', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createReferee = async (referee: RefereeInterface) => {
  const response = await axios.post('/api/referees', referee);
  return response.data;
};

export const updateRefereeById = async (id: string, referee: RefereeInterface) => {
  const response = await axios.put(`/api/referees/${id}`, referee);
  return response.data;
};

export const getRefereeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/referees/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRefereeById = async (id: string) => {
  const response = await axios.delete(`/api/referees/${id}`);
  return response.data;
};
