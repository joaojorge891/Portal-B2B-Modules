import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

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

  canActivate(route: ActivatedRouteSnapshot): boolean {

    window.location.href = route.data['externalUrl'];
    return true;

}

  ngOnInit(): void {
  }

}
