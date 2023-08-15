import axios from 'axios';
import queryString from 'query-string';
import { TeamManagerInterface, TeamManagerGetQueryInterface } from 'interfaces/team-manager';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTeamManagers = async (
  query?: TeamManagerGetQueryInterface,
): Promise<PaginatedInterface<TeamManagerInterface>> => {
  const response = await axios.get('/api/team-managers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTeamManager = async (teamManager: TeamManagerInterface) => {
  const response = await axios.post('/api/team-managers', teamManager);
  return response.data;
};

export const updateTeamManagerById = async (id: string, teamManager: TeamManagerInterface) => {
  const response = await axios.put(`/api/team-managers/${id}`, teamManager);
  return response.data;
};

export const getTeamManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/team-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamManagerById = async (id: string) => {
  const response = await axios.delete(`/api/team-managers/${id}`);
  return response.data;
};
