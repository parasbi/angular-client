import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.hotelbooking{
   export enum Rating {
      five_star,
      seven_star,
   }
   export enum Status {
      BOOKED,
      AVAILABLE,
      CANCELLED,
   }
   export enum Type {
      single,
      double,
      triple,
      quad,
   }
   export class Address {
      country: string;
      city: string;
      streetaddress: string;
   }
   export class Birthdetails {
      Dob: Date;
   }
   export class Hotel extends Participant {
      name: string;
      no_of_rooms: number;
      balance: number;
      Swimming_pool: boolean;
      valet_car_parking: boolean;
      wi_fiHigh_speed_internet: boolean;
      Fitness_center: boolean;
      rating: Rating;
      Doctor_on_call: boolean;
   }
   export class Client extends Participant {
      ID: string;
      firstname: string;
      lastname: string;
      balance: number;
      phone_no: string;
      address: Address;
      birthdetails: Birthdetails;
   }
   export class Room extends Asset {
      iD: string;
      number: number;
      hotel: Hotel;
      status: Status;
      cost: number;
      type: Type;
   }
   export class Order extends Asset {
      orderID: string;
      room: Room;
      from: Date;
      to: Date;
      client: Client;
      no_of_days: number;
   }
   export class Bookroom extends Transaction {
      id: string;
      hotel: Hotel;
      client: Client;
      from: Date;
      to: Date;
      no_of_days: number;
   }
   export class Cancelroom extends Transaction {
      room: Room;
      client: Client;
      order: Order;
   }
   export class Durationcomplete extends Transaction {
      room: Room;
      order: Order;
   }
// }
