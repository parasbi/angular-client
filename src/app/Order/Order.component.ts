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
import { OrderService } from './Order.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  orderID = new FormControl('', Validators.required);
  room = new FormControl('', Validators.required);
  from = new FormControl('', Validators.required);
  to = new FormControl('', Validators.required);
  client = new FormControl('', Validators.required);
  no_of_days = new FormControl('', Validators.required);

  constructor(private serviceOrder: OrderService, fb: FormBuilder) {
    this.myForm = fb.group({
      orderID: this.orderID,
      room: this.room,
      from: this.from,
      to: this.to,
      client: this.client,
      no_of_days: this.no_of_days
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOrder.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.hotelbooking.Order',
      'orderID': this.orderID.value,
      'room': this.room.value,
      'from': this.from.value,
      'to': this.to.value,
      'client': this.client.value,
      'no_of_days': this.no_of_days.value
    };

    this.myForm.setValue({
      'orderID': null,
      'room': null,
      'from': null,
      'to': null,
      'client': null,
      'no_of_days': null
    });

    return this.serviceOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'orderID': null,
        'room': null,
        'from': null,
        'to': null,
        'client': null,
        'no_of_days': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.hotelbooking.Order',
      'room': this.room.value,
      'from': this.from.value,
      'to': this.to.value,
      'client': this.client.value,
      'no_of_days': this.no_of_days.value
    };

    return this.serviceOrder.updateAsset(form.get('orderID').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceOrder.deleteAsset(this.currentId)
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

    return this.serviceOrder.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'orderID': null,
        'room': null,
        'from': null,
        'to': null,
        'client': null,
        'no_of_days': null
      };

      if (result.orderID) {
        formObject.orderID = result.orderID;
      } else {
        formObject.orderID = null;
      }

      if (result.room) {
        formObject.room = result.room;
      } else {
        formObject.room = null;
      }

      if (result.from) {
        formObject.from = result.from;
      } else {
        formObject.from = null;
      }

      if (result.to) {
        formObject.to = result.to;
      } else {
        formObject.to = null;
      }

      if (result.client) {
        formObject.client = result.client;
      } else {
        formObject.client = null;
      }

      if (result.no_of_days) {
        formObject.no_of_days = result.no_of_days;
      } else {
        formObject.no_of_days = null;
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
      'orderID': null,
      'room': null,
      'from': null,
      'to': null,
      'client': null,
      'no_of_days': null
      });
  }

}
