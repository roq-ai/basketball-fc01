import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'team_manager.create': {
    roles: ['league-owner'],
    key: 'team-manager-joined',
    tenantPath: ['organization', 'team_manager'],
    userPath: [],
  },
  'player.create': {
    roles: ['league-owner', 'team-manager'],
    key: 'player-joined',
    tenantPath: ['organization', 'player'],
    userPath: [],
  },
  'referee.create': {
    roles: ['league-owner', 'team-manager'],
    key: 'referee-joined',
    tenantPath: ['organization', 'referee'],
    userPath: [],
  },
  'customer.create': {
    roles: ['league-owner'],
    key: 'customer-followed',
    tenantPath: ['organization', 'customer'],
    userPath: [],
  },
  'team_manager.delete': {
    roles: ['league-owner'],
    key: 'team-manager-removed',
    tenantPath: ['organization', 'team_manager'],
    userPath: [],
  },
  'player.delete': {
    roles: ['league-owner', 'team-manager'],
    key: 'player-removed',
    tenantPath: ['organization', 'player'],
    userPath: [],
  },
  'referee.delete': {
    roles: ['league-owner', 'team-manager'],
    key: 'referee-removed',
    tenantPath: ['organization', 'referee'],
    userPath: [],
  },
  'customer.delete': {
    roles: ['league-owner'],
    key: 'customer-unfollowed',
    tenantPath: ['organization', 'customer'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['league-owner'];
const customerRoles: string[] = ['customer'];
const tenantRoles: string[] = ['league-owner', 'team-manager', 'player', 'referee'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.organization.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
