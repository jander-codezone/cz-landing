export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Inicio',
    href: '/#hero',
    isActive: false
  },
  {
    label: 'Desarrollo Web',
    href: '/desarrollo-web',
    isActive: false
  },
  {
    label: 'Software a Medida',
    href: '/software-a-medida',
    isActive: false
  },
  {
    label: 'APIs',
    href: '/integracion-apis',
    isActive: false
  },
  {
    label: 'Servicios Extra',
    href: '/servicios-extra',
    isActive: false
  },
];