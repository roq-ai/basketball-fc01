const mapping: Record<string, string> = {
  customers: 'customer',
  organizations: 'organization',
  players: 'player',
  referees: 'referee',
  'team-managers': 'team_manager',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
