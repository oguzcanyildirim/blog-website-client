import { Component, OnInit } from '@angular/core';
import { navLinks } from '../constants';
import { NavLinks } from '../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public nav: NavLinks = navLinks;
    public menuOpen = false;

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

    toggleMenu(): void {
      this.menuOpen = !this.menuOpen;
    }

}
