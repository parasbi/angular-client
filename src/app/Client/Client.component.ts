/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from './Client.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-client',
  templateUrl: './Client.component.html',
  styleUrls: ['./Client.component.css'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  ID = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  balance = new FormControl('', Validators.required);
  phone_no = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  birthdetails = new FormControl('', Validators.required);


  constructor(private serviceClient: ClientService, fb: FormBuilder) {
    this.myForm = fb.group({
      ID: this.ID,
      firstname: this.firstname,
      lastname: this.lastname,
      balance: this.balance,
      phone_no: this.phone_no,
      address: this.address,
      birthdetails: this.birthdetails
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceClient.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.acme.hotelbooking.Client',
      'ID': this.ID.value,
      'firstname': this.firstname.value,
      'lastname': this.lastname.value,
      'balance': this.balance.value,
      'phone_no': this.phone_no.value,
      'address': this.address.value,
      'birthdetails': this.birthdetails.value
    };

    this.myForm.setValue({
      'ID': null,
      'firstname': null,
      'lastname': null,
      'balance': null,
      'phone_no': null,
      'address': null,
      'birthdetails': null
    });

    return this.serviceClient.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'ID': null,
        'firstname': null,
        'lastname': null,
        'balance': null,
        'phone_no': null,
        'address': null,
        'birthdetails': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.acme.hotelbooking.Client',
      'firstname': this.firstname.value,
      'lastname': this.lastname.value,
      'balance': this.balance.value,
      'phone_no': this.phone_no.value,
      'address': this.address.value,
      'birthdetails': this.birthdetails.value
    };

    return this.serviceClient.updateParticipant(form.get('ID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceClient.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceClient.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'ID': null,
        'firstname': null,
        'lastname': null,
        'balance': null,
        'phone_no': null,
        'address': null,
        'birthdetails': null
      };

      if (result.ID) {
        formObject.ID = result.ID;
      } else {
        formObject.ID = null;
      }

      if (result.firstname) {
        formObject.firstname = result.firstname;
      } else {
        formObject.firstname = null;
      }

      if (result.lastname) {
        formObject.lastname = result.lastname;
      } else {
        formObject.lastname = null;
      }

      if (result.balance) {
        formObject.balance = result.balance;
      } else {
        formObject.balance = null;
      }

      if (result.phone_no) {
        formObject.phone_no = result.phone_no;
      } else {
        formObject.phone_no = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.birthdetails) {
        formObject.birthdetails = result.birthdetails;
      } else {
        formObject.birthdetails = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'ID': null,
      'firstname': null,
      'lastname': null,
      'balance': null,
      'phone_no': null,
      'address': null,
      'birthdetails': null
    });
  }
}
