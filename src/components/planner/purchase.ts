/// <reference path="../../typings/lodash/lodash.d.ts" />
import { Component, forwardRef,} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ShowError } from '../../helpers/show-error';

@Component({
    selector: 'purchase',
    templateUrl: '/src/components/planner/purchase.html',
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ShowError]
})
export class Purchase {
    model = new ShoppingCartService();
    countries = ['US', 'Canada'];

    constructor(shoppingCartService:ShoppingCartService) {
        this.model = shoppingCartService;
        this.calculateTotalAmount()
    }

    onSubmit() {
        console.log("Submitting:");
        console.log(this.model);
    }

    calculateTotalAmount(){
         this.model.amount  = _.chain(this.model.roses)
            .pluck('subtotal')
            .compact()
            .reduce( function(sum, num) { return parseFloat(sum)+ (parseFloat(num) + 0) } )
            .value();
    }
}

