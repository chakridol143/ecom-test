import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Menu } from './components/menu/menu';
import { Filter } from './components/filter/filter';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header,Menu], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}

