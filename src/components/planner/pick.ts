/// <reference path="../../typings/lodash/lodash.d.ts" />
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import {RoseService} from '../../services/rose-service';
import {ShoppingCartService} from "../../services/shopping-cart-service";
import {RoseBush} from "../../services/rose-bush";

@Component({
    selector: 'Pick',
    templateUrl: '/src/components/planner/pick.html',
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Pick {
    roseInventory;
    model:Array<RoseBush>;
    maxRoses:number;
    totalQuantity: number;
    service: ShoppingCartService;

    catSelected = false;

    constructor(roseService:RoseService, shoppingCartService:ShoppingCartService) {
        this.service = shoppingCartService;
        this.model = shoppingCartService.roses;
        this.maxRoses = shoppingCartService.maxRoses;
        this.totalQuantity = shoppingCartService.totalQuantity;
        this.roseInventory = roseService.getRoses();
     }

    static calculateSubTotal(rose){
        if(rose.price && rose.quantity){
            rose.subtotal = rose.price * rose.quantity;
        }else{
            rose.subtotal = null;
        }
        return rose.subtotal;
    }

    getRoses($event) {
        this.catSelected = true;
    }

    addRoseBush() {
        this.model.push(new RoseBush());
    }

    removeRoseBush(roseBush:RoseBush) {
        _.pull(this.model, roseBush);
        this.calculateTotalQuantity();
    }

    getCategoryIndex(rose) {
        var index = _.findIndex(this.roseInventory, {'name': rose.category});
        if (index == -1) {
            return 0;
        } else {
            return index;
        }
    }

    setRosePrice(rose) {
        var catIndex = _.findIndex(this.roseInventory, {'name': rose.category});
        if (catIndex != -1) {
            var index = _.findIndex(this.roseInventory[catIndex].products, {'name': rose.name});
            if (index == -1) {
                return null;
            } else {
                rose.price = this.roseInventory[catIndex].products[index].price;
                return rose.price;
            }
        } else {
            rose.price = null;
            rose.points = null;
            rose.quantity = null;
            return null;
        }
    }

    getRating(rose) {
        var catIndex = rose? _.findIndex(this.roseInventory, {'name': rose.category}): -1;
        if (catIndex != -1) {
            var index = _.findIndex(this.roseInventory[catIndex].products, {'name': rose.name});
            if (index == -1) {
                return null;
            } else {
                rose.points = this.roseInventory[catIndex].products[index].points;
                return  _.range(0, rose.points);
            }
        } else {
            return null;
        }
    }

    calculateSubTotal(rose){
        if(rose.price && rose.quantity){
            rose.subtotal = rose.price * rose.quantity;
        }else{
            rose.subtotal = null;
        }
        return rose.subtotal;
    }

    emptyValues(rose){
        rose.quantity = null;
    }

    calculateTotalQuantity(){
        this.totalQuantity  = _.chain(this.model)
            .pluck('quantity')
            .compact()
            .reduce( function(sum, num) { return parseInt(sum)+ (parseInt(num) + 0) } )
            .value();
        this.service.totalQuantity = this.totalQuantity;
     }

    checkMaxRoses(){
        this.calculateTotalQuantity();
        if(this.totalQuantity){
            return this.maxRoses >= this.totalQuantity;
        }else{
            return true;
        }
    }

    getMaxRoses(){
        return this.maxRoses;
    }
}

