// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} width={24} height={24} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: icon('ant-design:home-twotone'),
  },

  {
    title: 'Activity',
    path: '/dashboard/products',
    icon: icon('fluent:shifts-activity-20-filled'),
  },
  {
    title: 'Community',
    path: '/dashboard/blog',
    icon: icon('fluent:people-community-28-filled'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('mdi:user'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
