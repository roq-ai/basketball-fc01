import { CustomerInterface } from 'interfaces/customer';
import { PlayerInterface } from 'interfaces/player';
import { RefereeInterface } from 'interfaces/referee';
import { TeamManagerInterface } from 'interfaces/team-manager';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;
  created_at: string;
  updated_at: string;

  customer: CustomerInterface[];
  player: PlayerInterface[];
  referee: RefereeInterface[];
  team_manager: TeamManagerInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}
