import { INavData } from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cilHome' },
    badge: {
      color: 'dark',
      text: 'Análises'
    }
  },
  {
    name:'Modulos',
    title: true
  },
  {
    name:'Documentos',
    url:'/document',
    iconComponent: {name:'cilFile'},
    children: [
      {
        iconComponent: {name:'cilList'},
        name:'Meus documentos',
        url:'/document/document'
      },
      {
        iconComponent: {name:'cilPlus'},
        name:'Novo documento',
        url:'/document/maintenance'
      },
    ]
  },
  {
    name:'Cadastros Auxiliares',
    title: true
  },
  {
    name:'Tipo do documento',
    url:'/documenttype',
    iconComponent: {name:'cilNotes'},
    children: [
      {
        iconComponent: {name:'cilList'},
        name:'Meus Tipos',
        url:'/documenttype/documenttype'
      },
      {
        iconComponent: {name:'cilPlus'},
        name:'Novo Tipo',
        url:'/documenttype/maintenance'
      },
    ]
  },
  {
    name:'Parceiros',
    url:'/documentpartners',
    iconComponent: {name:'cilNotes'},
    children: [
      {
        iconComponent: {name:'cilList'},
        name:'Meus Tipos',
        url:'/documentpartners/documentpartners'
      },
      {
        iconComponent: {name:'cilPlus'},
        name:'Novo Tipo',
        url:'/documentpartners/maintenance'
      },
    ]
  },
  {
    name:'Logout',
    title: true
  },
  {
    name: 'Sair',
    url: '/login',
    iconComponent: {name:'cil-AccountLogout'} 
  }

];
