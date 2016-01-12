import {Component} from 'angular2/core';
import {NgForm, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import List = _.List;

/**
 * This is a component that displays an error message.
 *
 * For instance,
 *
 * <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
 *
 * Will display the "is required" error if the control is empty, and "invalid credit card" if the
 * control is not empty
 * but not valid.
 *
 * In a real application, this component would receive a service that would map an error code to an
 * actual error message.
 * To make it simple, we are using a simple map here.
 */
@Component({
    selector: 'show-error',
    properties: ['controlPath: control', 'errorTypes: errors', 'display: display'],
    template: `
    <div *ngIf="errorMessage !== null"  class="valign materialize-red-text text-lighten-2">{{displayName}} {{errorMessage}}</div>
  `,
    directives: [CORE_DIRECTIVES]
})
export class ShowError {
    formDir;
    controlPath: string;
    errorTypes: List<string>;
    display: string;

    constructor( formDir: NgForm) { this.formDir = formDir; }

    get errorMessage() {
        var c = this.formDir.form.find(this.controlPath);
        for (var i = 0; i < this.errorTypes.length; ++i) {
            if (c && c.touched && c.hasError(this.errorTypes[i])) {
                return this._errorMessage(this.errorTypes[i]);
            }
        }
        return null;
    }

    get displayName(){
        return this.display;
    }

    _errorMessage(code) {
        var config = {'required': 'is required!', 'invalidCreditCard': 'is invalid credit card number'};
        return config[code];
    }
}
