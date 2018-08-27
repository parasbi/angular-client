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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { RoomComponent } from './Room/Room.component';
import { OrderComponent } from './Order/Order.component';

import { HotelComponent } from './Hotel/Hotel.component';
import { ClientComponent } from './Client/Client.component';
import {DashbordComponent} from './dashbord/dashbord.component'
import {TransactionTypeComponent} from './transaction-type/transaction-type.component'

import { BookroomComponent } from './Bookroom/Bookroom.component';
import { CancelroomComponent } from './Cancelroom/Cancelroom.component';
import { DurationcompleteComponent } from './Durationcomplete/Durationcomplete.component';

const routes: Routes = [
  { path: '', component: DashbordComponent },
  { path: 'Room', component: RoomComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'Hotel', component: HotelComponent },
  { path: 'Client', component: ClientComponent },
  { path: 'Bookroom', component: BookroomComponent },
  { path: 'Cancelroom', component: CancelroomComponent },
  { path: 'Durationcomplete', component: DurationcompleteComponent },
  { path: '**', redirectTo: '' },
  { path: 'transaction-type' , component: TransactionTypeComponent}

];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
