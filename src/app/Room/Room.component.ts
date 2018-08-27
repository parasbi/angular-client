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
import { RoomService } from './Room.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-room',
  templateUrl: './Room.component.html',
  styleUrls: ['./Room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  iD = new FormControl('', Validators.required);
  number = new FormControl('', Validators.required);
  hotel = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  cost = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);

  constructor(private serviceRoom: RoomService, fb: FormBuilder) {
    this.myForm = fb.group({
      iD: this.iD,
      number: this.number,
      hotel: this.hotel,
      status: this.status,
      cost: this.cost,
      type: this.type
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRoom.getAll()
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
      $class: 'org.acme.hotelbooking.Room',
      'iD': this.iD.value,
      'number': this.number.value,
      'hotel': this.hotel.value,
      'status': this.status.value,
      'cost': this.cost.value,
      'type': this.type.value
    };

    this.myForm.setValue({
      'iD': null,
      'number': null,
      'hotel': null,
      'status': null,
      'cost': null,
      'type': null
    });

    return this.serviceRoom.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'iD': null,
        'number': null,
        'hotel': null,
        'status': null,
        'cost': null,
        'type': null
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
      $class: 'org.acme.hotelbooking.Room',
      'number': this.number.value,
      'hotel': this.hotel.value,
      'status': this.status.value,
      'cost': this.cost.value,
      'type': this.type.value
    };

    return this.serviceRoom.updateAsset(form.get('iD').value, this.asset)
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

    return this.serviceRoom.deleteAsset(this.currentId)
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

    return this.serviceRoom.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'iD': null,
        'number': null,
        'hotel': null,
        'status': null,
        'cost': null,
        'type': null
      };

      if (result.iD) {
        formObject.iD = result.iD;
      } else {
        formObject.iD = null;
      }

      if (result.number) {
        formObject.number = result.number;
      } else {
        formObject.number = null;
      }

      if (result.hotel) {
        formObject.hotel = result.hotel;
      } else {
        formObject.hotel = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.cost) {
        formObject.cost = result.cost;
      } else {
        formObject.cost = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
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
      'iD': null,
      'number': null,
      'hotel': null,
      'status': null,
      'cost': null,
      'type': null
      });
  }

}
