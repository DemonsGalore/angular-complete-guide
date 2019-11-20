import { Component, Input } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'warning-alert',
  templateUrl: './warning-alert.component.html',
  // add NgbAlertConfig  to the component providers
  providers: [NgbAlertConfig]
})
export class WarningAlertComponent {
  @Input() public alerts: Array<string> = [];

  constructor(alertConfig: NgbAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }
}
