import { Component, Input } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'success-alert',
  templateUrl: './success-alert.component.html',
  // add NgbAlertConfig  to the component providers
  providers: [NgbAlertConfig]
})
export class SuccessAlert {
  @Input() public alerts: Array<string> = [];

  constructor(alertConfig: NgbAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
}
