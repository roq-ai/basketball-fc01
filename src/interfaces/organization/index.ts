import { CustomerInterface } from 'interfaces/customer';
import { PlayerInterface } from 'interfaces/player';
import { RefereeInterface } from 'interfaces/referee';
import { TeamManagerInterface } from 'interfaces/team-manager';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  customer?: CustomerInterface[];
  player?: PlayerInterface[];
  referee?: RefereeInterface[];
  team_manager?: TeamManagerInterface[];
  user?: UserInterface;
  _count?: {
    customer?: number;
    player?: number;
    referee?: number;
    team_manager?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
