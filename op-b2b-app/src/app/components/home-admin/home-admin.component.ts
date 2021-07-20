import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { AccessValidate } from 'src/utils/accessvalidate';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent extends AccessValidate implements OnInit {

  menuArr = [
    // { label: 'Home', link: '/home' },
    { label: 'Usuários', link: '/home-admin/users', icon: 'po-icon-user', shortLabel: 'Usuários' },
    { label: 'Logout', action: this.logout.bind(this), icon: 'po-icon-exit', shortLabel: 'Logout' }
  ];

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=ADM',
    subtitle: 'administrator',
    title: 'Admin'
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Configurações' },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: () => this.router.navigate(['']) }
  ];

  constructor(

    private router: Router
  ) {
    super()
  }

  ngOnInit() {

    // if (this.validateUser() === 'user') {
    //   this.router.navigateByUrl('')
    // }
  }

  public logout() {
    localStorage.setItem('current_user', '')
    this.router.navigateByUrl('')

  }
}

