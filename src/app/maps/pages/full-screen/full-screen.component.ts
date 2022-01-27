import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #maps{
      width:100%;
      height:100%;
    }`
  ],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'maps',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -69.93758121994654,18.473808890777686],
      zoom: 16
    });
  }
}
