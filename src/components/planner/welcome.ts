import { View, Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { ShoppingCartService } from '../../services/shopping-cart-service';

@Component({
    selector: 'Welcome'
})
@View({
    templateUrl: '/src/components/planner/welcome.html',
    directives: [RouterLink]
})
export class Welcome {
    myName: string;

    constructor(shoppingCartService:ShoppingCartService) {
        this.myName = shoppingCartService.firstName;
    }
}
