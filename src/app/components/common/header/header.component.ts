import { Component, OnInit } from '@angular/core';
import { navLinks } from '../constants';
import { NavLinks } from '../interfaces';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public nav: NavLinks = navLinks;
    constructor() { }

    ngOnInit(): void {
    }

}
