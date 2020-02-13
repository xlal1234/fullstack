import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Lin's Code";

  username = "Rock";

  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }
  
}
