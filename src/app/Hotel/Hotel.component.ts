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
import { HotelService } from './Hotel.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotel',
  templateUrl: './Hotel.component.html',
  styleUrls: ['./Hotel.component.css'],
  providers: [HotelService]
})
export class HotelComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  name = new FormControl('', Validators.required);
  no_of_rooms = new FormControl('', Validators.required);
  balance = new FormControl('', Validators.required);
  Swimming_pool = new FormControl('', Validators.required);
  valet_car_parking = new FormControl('', Validators.required);
  wi_fiHigh_speed_internet = new FormControl('', Validators.required);
  Fitness_center = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);
  Doctor_on_call = new FormControl('', Validators.required);


  constructor(private serviceHotel: HotelService, fb: FormBuilder) {
    this.myForm = fb.group({
      name: this.name,
      no_of_rooms: this.no_of_rooms,
      balance: this.balance,
      Swimming_pool: this.Swimming_pool,
      valet_car_parking: this.valet_car_parking,
      wi_fiHigh_speed_internet: this.wi_fiHigh_speed_internet,
      Fitness_center: this.Fitness_center,
      rating: this.rating,
      Doctor_on_call: this.Doctor_on_call
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHotel.getAll()
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
      $class: 'org.acme.hotelbooking.Hotel',
      'name': this.name.value,
      'no_of_rooms': this.no_of_rooms.value,
      'balance': this.balance.value,
      'Swimming_pool': this.Swimming_pool.value,
      'valet_car_parking': this.valet_car_parking.value,
      'wi_fiHigh_speed_internet': this.wi_fiHigh_speed_internet.value,
      'Fitness_center': this.Fitness_center.value,
      'rating': this.rating.value,
      'Doctor_on_call': this.Doctor_on_call.value
    };

    this.myForm.setValue({
      'name': null,
      'no_of_rooms': null,
      'balance': null,
      'Swimming_pool': null,
      'valet_car_parking': null,
      'wi_fiHigh_speed_internet': null,
      'Fitness_center': null,
      'rating': null,
      'Doctor_on_call': null
    });

    return this.serviceHotel.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'name': null,
        'no_of_rooms': null,
        'balance': null,
        'Swimming_pool': null,
        'valet_car_parking': null,
        'wi_fiHigh_speed_internet': null,
        'Fitness_center': null,
        'rating': null,
        'Doctor_on_call': null
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
      $class: 'org.acme.hotelbooking.Hotel',
      'no_of_rooms': this.no_of_rooms.value,
      'balance': this.balance.value,
      'Swimming_pool': this.Swimming_pool.value,
      'valet_car_parking': this.valet_car_parking.value,
      'wi_fiHigh_speed_internet': this.wi_fiHigh_speed_internet.value,
      'Fitness_center': this.Fitness_center.value,
      'rating': this.rating.value,
      'Doctor_on_call': this.Doctor_on_call.value
    };

    return this.serviceHotel.updateParticipant(form.get('name').value, this.participant)
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

    return this.serviceHotel.deleteParticipant(this.currentId)
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

    return this.serviceHotel.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'name': null,
        'no_of_rooms': null,
        'balance': null,
        'Swimming_pool': null,
        'valet_car_parking': null,
        'wi_fiHigh_speed_internet': null,
        'Fitness_center': null,
        'rating': null,
        'Doctor_on_call': null
      };

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.no_of_rooms) {
        formObject.no_of_rooms = result.no_of_rooms;
      } else {
        formObject.no_of_rooms = null;
      }

      if (result.balance) {
        formObject.balance = result.balance;
      } else {
        formObject.balance = null;
      }

      if (result.Swimming_pool) {
        formObject.Swimming_pool = result.Swimming_pool;
      } else {
        formObject.Swimming_pool = null;
      }

      if (result.valet_car_parking) {
        formObject.valet_car_parking = result.valet_car_parking;
      } else {
        formObject.valet_car_parking = null;
      }

      if (result.wi_fiHigh_speed_internet) {
        formObject.wi_fiHigh_speed_internet = result.wi_fiHigh_speed_internet;
      } else {
        formObject.wi_fiHigh_speed_internet = null;
      }

      if (result.Fitness_center) {
        formObject.Fitness_center = result.Fitness_center;
      } else {
        formObject.Fitness_center = null;
      }

      if (result.rating) {
        formObject.rating = result.rating;
      } else {
        formObject.rating = null;
      }

      if (result.Doctor_on_call) {
        formObject.Doctor_on_call = result.Doctor_on_call;
      } else {
        formObject.Doctor_on_call = null;
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
      'name': null,
      'no_of_rooms': null,
      'balance': null,
      'Swimming_pool': null,
      'valet_car_parking': null,
      'wi_fiHigh_speed_internet': null,
      'Fitness_center': null,
      'rating': null,
      'Doctor_on_call': null
    });
  }
}
