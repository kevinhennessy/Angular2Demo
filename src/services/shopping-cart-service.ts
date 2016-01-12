import {RoseBush} from "./rose-bush";
import {Injectable} from 'angular2/core';

@Injectable()
export class ShoppingCartService {
    // personal info
    firstName: string = "Kevin";
    lastName: string = "Hennessy";
    country: string = "US";
    creditCard: number = 897999923;
    email: string = "Kevin.Hennessy@appliedis.com";

    // Garden dimensions
    length: number;
    width: number;
    squareFootage: number;
    maxRoses: number;

    // roses
    roses: Array<RoseBush> = [(new RoseBush())];

    // purchase info
    totalQuantity = 0;
    amount = 0;
 }


