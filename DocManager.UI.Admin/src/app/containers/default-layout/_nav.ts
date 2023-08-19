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
    name:'Relatórios',
    url:'/report',
    iconComponent: {name:'cilSpeedometer'},
    children: [
      {
        iconComponent: {name:'cilCloudDownload'},
        name:'Exportar Relatório',
        url:'/report/report'
      },
    ]
  },
  {
    name:'Gestão de usuários',
    title: true
  },
  {
    name:'Usuários',
    url:'/user',
    iconComponent: {name:'cilPeople'},
    children: [
      {
        iconComponent: {name:'cilList'},
        name:'Usuários',
        url:'/user/user'
      },
    ]
  },
  {
    name:'Grupos de usuários',
    url:'/groupautorization',
    iconComponent: {name:'cilNotes'},
    children: [
      {
        iconComponent: {name:'cilList'},
        name:'Meus Grupos',
        url:'/groupautorization/groupautorization'
      },
      {
        iconComponent: {name:'cilPlus'},
        name:'Novo Grupo',
        url:'/groupautorization/maintenance'
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
