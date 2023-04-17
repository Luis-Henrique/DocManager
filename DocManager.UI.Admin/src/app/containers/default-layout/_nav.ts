import { INavData } from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name:'Modulos',
    title: true
  },
  {
    name:'Documentos',
    url:'/document',
    iconComponent: {name:'cil-Inbox'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Meus documentos',
        url:'/document/document'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
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
    iconComponent: {name:'cil-Calculator'},
    children: [
      {
        iconComponent: {name:'cil-Filter'},
        name:'Meus Tipos',
        url:'/documenttype/documenttype'
      },
      {
        iconComponent: {name:'cil-Spreadsheet'},
        name:'Novo Tipo',
        url:'/documenttype/maintenance'
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
