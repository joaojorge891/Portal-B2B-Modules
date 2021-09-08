import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoDialogService, PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuArr: Array<PoMenuItem> = [
    { label: 'OEMP', action: this.onOemp.bind(this), icon: 'po-icon po-icon-company', shortLabel: 'Controle' },
    { label: 'Dashboard', action: this.onDashboard.bind(this), icon: 'po-icon po-icon-chart-columns', shortLabel: 'Dashboard' },
    { label: 'Exportar', action: this.onExport.bind(this), icon: 'po-icon po-icon-doc-xls', shortLabel: 'Exportar' },
    { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-exit', shortLabel: 'Logout' },
  ]


  profile: PoToolbarProfile = {
    avatar: './assets/user-icon.png',
    subtitle: 'Usuário',
    title: 'Usuário',
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Configurações' },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: () => this.router.navigate(['portal']) }
  ];

  toolBarTitle: string = ''

  constructor(

    private router: Router,
    public poDialog: PoDialogService
  ) {

  }

  ngOnInit() {

    this.router.navigate(['/home/oemp'])
    this.toolBarTitle = 'PORTAL DE OPERAÇÕES B2B - ÁREA DE CONTROLE OEMP'
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
  }

  public logout() {
    localStorage.setItem('current_user', '')
    this.router.navigate(['portal'])


  }

  public onDashboard() {
    this.poDialog.alert({ title: 'Portal de Operações B2B', message: 'Feature em desenvolvimento. Será disponibilizado em breve.' })
    //this.toolBarTitle = 'PORTAL DE OPERAÇÕES B2B - DASHBOARD'
  }

  public onExport() {
    this.router.navigate(['home/oemp/exports'])
  }

  public onOemp() {
    this.router.navigate(['home/oemp'])
    this.toolBarTitle = 'PORTAL DE OPERAÇÕES B2B - ÁREA DE CONTROLE OEMP'
  }

}
