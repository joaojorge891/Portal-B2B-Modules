import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuArr = [
    // { label: 'Home', link: '/home' },
    { label: 'OEMP', link: '/home/oemp', icon: 'po-icon po-icon-company', shortLabel: 'Controle' },
    { label: 'Dashboard', action: this.onDashboard.bind(this), icon: 'po-icon po-icon-chart-columns', shortLabel: 'Dashboard' },
    { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-exit', shortLabel: 'Logout' },
    // { label: 'Logout', link: 'http://10.61.81.95/op_b2b/index.php', icon: 'po-icon-exit', shortLabel: 'Logout' }
  ]


  profile: PoToolbarProfile = {
    avatar: './assets/user-icon.png',
    subtitle: 'Usuário',
    title: 'Usuário',
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Configurações' },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: () => this.router.navigate(['']) }
  ];

  constructor(

    private router: Router,
    public poDialog: PoDialogService
  ) {

  }

  ngOnInit() {

    this.router.navigate(['/home/oemp'])
    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
  }

  public logout() {
    localStorage.setItem('current_user', '')
    this.router.navigate(['/portal/'])
    

  }

  public onDashboard(){
    this.poDialog.alert({ title: 'Aviso', message: 'Feature em desenvolvimento. Será disponibilizado em breve.' })
  }

}
