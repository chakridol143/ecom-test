import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Menu } from './components/menu/menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Menu,], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}

