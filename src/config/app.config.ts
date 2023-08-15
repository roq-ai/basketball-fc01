interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['League Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['League Owner', 'Team Manager', 'Player', 'Referee'],
  tenantName: 'Organization',
  applicationName: 'Basketball ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
