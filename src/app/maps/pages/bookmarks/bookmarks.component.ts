import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styles: [
    `
      .maps-container {
        width: 100%;
        height: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class BookmarksComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  maps!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-69.93758121994654, 18.473808890777686];
  constructor() {}

  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'My place bookmark';

    //new mapboxgl.Marker()
    // {element: markerHtml}
    // .setLngLat(this.center)
    // .addTo(this.maps)
  }

  addMarker() {
    const newMarker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat(this.center)
    .addTo(this.maps);
  }
  goingToMarker() {
  
  }
}
