import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.sidenav.toggle();
  }

}
