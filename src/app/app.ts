import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header,  Navbar], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}

