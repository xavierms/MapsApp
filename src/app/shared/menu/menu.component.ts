import { Component } from '@angular/core';

interface MenuItem{
  ruta  : string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
  li{
   cursor:pointer;
  }
  `
  ]
})
export class MenuComponent  {

  constructor() { }

menuItems: MenuItem[]=[
  {
    ruta: '/maps/fullscreen',
    nombre: 'FullScreen'
  },
  {
    ruta: '/maps/zoom-range',
    nombre: 'Zoom Range'
  },
  {
    ruta: '/maps/bookmarks',
    nombre: 'Bookmarks'
  },
  {
    ruta: '/maps/properties',
    nombre: 'Properties'
  }
]

}
