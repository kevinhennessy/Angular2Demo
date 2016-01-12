import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {ShoppingCartService} from "../../services/shopping-cart-service";

@Component({
    selector: 'Plan',
    templateUrl: '/src/components/planner/plan.html',
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class Plan {
    width: number;
    length: number;
    squareFootage: number;
    maxRoses: number;
    cart: ShoppingCartService;

    constructor(shoppingCartService:ShoppingCartService) {
        this.cart = shoppingCartService;
        this.squareFootage = this.cart.squareFootage;
        this.maxRoses = this.cart.maxRoses;
        this.length = this.cart.length;
        this.width = this.cart.width;
    }

    dimensions = [4, 8, 12, 16, 20, 24];

    setWidth(value){
        this.cart.width = value;
        this.setSquareFootage();
        this.setMaxRoses();
    }

    setLength(value){
        this.cart.length = value;
        this.setSquareFootage();
        this.setMaxRoses();
    }

    setSquareFootage(){
        this.squareFootage = this.cart.width * this.cart.length;
        this.cart.squareFootage = this.squareFootage;
    }

    setMaxRoses(){
        this.maxRoses = this.squareFootage / 4;
        this.cart.maxRoses = this.maxRoses;
    }

}
