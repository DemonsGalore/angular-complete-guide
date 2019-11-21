import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = '';
  username = '';
  serverCreated = false;
  servers = ['Testserver', 'Liveserver'];
  toggleContent = true;
  timestamps = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer = () => {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server with the name "' + this.serverName + '" was created!';
  }

  onToggle = () => {
    this.toggleContent = !this.toggleContent;
    this.timestamps.push(Date.now());
  }
}
