import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Administrativa',
    group: true,
  },
  {
    title: 'PQR',
    icon: 'layout-outline',
    children: [
      {
        title: 'Registrar',
        link: '/pages/layout/stepper',
      },
      {
        title: 'Consultar',
        link: '/pages/layout/list',
      }
    ],
  }
];
