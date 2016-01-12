import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, RouteConfig} from 'angular2/router';
import {Welcome} from "../planner/welcome";
import {Plan} from "../planner/plan";
import {Pick} from "../planner/pick";
import {Purchase} from "../planner/purchase";
import {ShoppingCartService} from "../../services/shopping-cart-service";

@Component({
    selector: "planner-app",
    templateUrl: `/src/components/app/nav.html`,
    directives:[RouterLink, ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', component: Welcome, name: 'Welcome', useAsDefault: true},
    {path: '/Plan', component: Plan, name: 'Plan'},
    {path: '/Pick', component: Pick, name: 'Pick'},
    {path: '/Purchase', component: Purchase, name: 'Purchase'},
])
export class PlannerApp {
}

