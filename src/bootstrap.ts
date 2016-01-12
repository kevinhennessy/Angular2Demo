import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {PlannerApp} from "./components/app/app";
import {ROUTER_PROVIDERS} from 'angular2/router';
import {ShoppingCartService} from "./services/shopping-cart-service";
import {RoseService} from "./services/rose-service";
enableProdMode();
bootstrap(PlannerApp, [ROUTER_PROVIDERS, ShoppingCartService, RoseService]);
