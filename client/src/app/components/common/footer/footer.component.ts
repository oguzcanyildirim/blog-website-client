import { Component, OnInit } from '@angular/core';
import siteData from '../../../../assets/site.json';
import socials from '../../../../assets/site.json';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    currYear = 0;
    author = '';
    nav: any = {};
    socials: any = {};
    pathName = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.pathName = window.location.pathname;
        this.currYear = this.getCurrentYear();
        this.author = siteData.site.author;
        this.socials = socials;
        this.nav = siteData.site.nav;
    }

    getCurrentYear() {
        const year = new Date().getFullYear();
        return year;
    }

    backToTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

}
