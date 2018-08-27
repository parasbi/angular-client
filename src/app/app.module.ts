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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { RoomComponent } from './Room/Room.component';
import { OrderComponent } from './Order/Order.component';

import { HotelComponent } from './Hotel/Hotel.component';
import { ClientComponent } from './Client/Client.component';

import { BookroomComponent } from './Bookroom/Bookroom.component';
import { CancelroomComponent } from './Cancelroom/Cancelroom.component';
import { DurationcompleteComponent } from './Durationcomplete/Durationcomplete.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    OrderComponent,
    HotelComponent,
    ClientComponent,
    BookroomComponent,
    CancelroomComponent,
    DurationcompleteComponent,
    DashbordComponent,
    TransactionTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
