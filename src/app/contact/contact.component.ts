import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../../services/data.service';
import {ContactModel} from '../../models/contact.model';
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  companyForm: FormGroup;
  indivisualForm: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private restService: DataService) {
  }

  get f() {
    return this.contactForm.controls;
  }

  get d() {
    return this.indivisualForm.controls;
  }

  get c() {
    return this.companyForm.controls;
  }

  prepareForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      details: ['', Validators.required],
      name: ['', Validators.required],
      type: ['']
    });

    this.companyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      details: ['', Validators.required],
      name: ['', Validators.required],
      type: [''],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9][0-9]*$/)]],
    });

    this.indivisualForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      details: ['', Validators.required],
      name: ['', Validators.required],
      type: [''],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9][0-9]*$/)]],


    });
  }

  contactus(type) {
    let contactModel: ContactModel;

    if (type === 3) {
      this.f.type.setValue(type);
      contactModel = this.contactForm.value as ContactModel;

    } else if (type === 2) {
      this.d.type.setValue(type);
      contactModel = this.indivisualForm.value as ContactModel;

    } else {
      this.c.type.setValue(type);
      contactModel = this.companyForm.value as ContactModel;

    }

    this.restService.sendMessage(contactModel).then((res) => {
      this.toastr.success(res.message, '');
      this.contactForm.reset();
      this.indivisualForm.reset();
      this.companyForm.reset();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }


  ngOnInit(): void {
    window.scroll(0 ,0);
    this.fuseSplashScreenService.hide();
    this.prepareForm();
  }

}
