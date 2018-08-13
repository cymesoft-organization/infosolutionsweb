import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FreeTrial } from './../User';
import { FormArray } from '@angular/forms/src/model';
import { ApiService} from './../api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-free-trail',
  templateUrl: './free-trail.component.html',
  styleUrls: ['./free-trail.component.css']
})
export class FreeTrailComponent implements OnInit {
  freeTrailForm: FormGroup; 
  private user:FreeTrial; 
  constructor(private fb:FormBuilder, private _location: Location, private ApiService: ApiService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.freeTrailForm  = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['', [Validators.required]]          
          
  })
}
get email() { return this.freeTrailForm.get('email'); }  
get phone() { return this.freeTrailForm.get('phone'); }
get first_name() { return this.freeTrailForm.get('first_name'); }
get last_name() { return this.freeTrailForm.get('last_name'); }

public onFormSubmit() {
 if(this.freeTrailForm.valid) {   
     this.user = this.freeTrailForm.value;
     console.log(this.user);
     /* Any API call logic via services goes here */
     this.ApiService.requestFreeTrail(this.user)
     .subscribe(
     data => {
       console.log(data);
       if (data['status'] === 'success') {        
         this._flashMessagesService.show(data['message'], { cssClass: 'alert-success' });          
         
       } else {
         this._flashMessagesService.show(data['message'], { cssClass: 'alert-danger' });
       }
     },
     error => {
       this._flashMessagesService.show('Error in the Data/Server', { cssClass: 'alert-danger' });
     });
 }
}
}
