import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import siteData from '../../../assets/site.json';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    contactForm: any;
    contact: any;
    cName: any;
    cEmail: any;
    cMessage: any;
    myEmail: string = siteData.site.email;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.contactForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            message: new FormControl('', Validators.required)
        });
        this.cName = this.name;
        this.cEmail = this.email;
        this.cMessage = this.message;
    }

    submit() {
    // update `myEmail` in site.json with your current email
        window.location.href = `mailto:${this.myEmail}?body=${this.contactForm.value.message}`;
        this.contactForm.reset();
        this.contactForm.markAsPristine();
        const controls = this.contactForm.controls;
        for (const control in controls) {
            if (this.contactForm.controls[control].errors !== null) {
                this.contactForm.controls[control].setErrors(null);
            }
        }
    }

    get name() {
        return this.contactForm.get('name');
    }

    get email() {
        return this.contactForm.get('email');
    }

    get message() {
        return this.contactForm.get('message');
    }

}
