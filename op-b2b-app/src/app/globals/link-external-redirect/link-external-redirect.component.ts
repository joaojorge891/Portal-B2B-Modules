import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-link-external-redirect',
  templateUrl: './link-external-redirect.component.html',
  styleUrls: ['./link-external-redirect.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LinkExternalRedirectComponent implements CanActivate {

  constructor() { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    window.location.assign('http://10.61.81.95/op_b2b/index.php')
    return true

  }

  ngOnInit(): void {
  }

}
