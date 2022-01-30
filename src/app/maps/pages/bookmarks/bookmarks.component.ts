import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}
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
        font-weight: bold;
      }
      .list-group-item {
        font-weight: bold;
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

  bookmarks: MarkerColor[] = [];
  constructor() {}

  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    this.readLocalStorage();
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'My place bookmark';

    //new mapboxgl.Marker()
    // {element: markerHtml}
    // .setLngLat(this.center)
    // .addTo(this.maps)
  }

  addMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    console.log(color);

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      //color: color  in ECMA Script 6 esto es redundante.
      color,
    })
      .setLngLat(this.center)
      .addTo(this.maps);
    this.bookmarks.push({
      color,
      marker: newMarker,
    });
    this.saveBookMarksLocalStorage();

    newMarker.on('dragend', () => {
      this.saveBookMarksLocalStorage();
    });
  }
  goingToMarker(marker: mapboxgl.Marker) {
    this.maps.flyTo({
      center: marker.getLngLat(),
    });
  }

  saveBookMarksLocalStorage() {
    const lngLatArr: MarkerColor[] = [];

    this.bookmarks.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [lng, lat],
      });
    });
    localStorage.setItem('bookmarks', JSON.stringify(lngLatArr));
  }

  readLocalStorage() {
    if (!localStorage.getItem('bookmarks')) {
      return;
    }
    const lngLatArr: MarkerColor[] = JSON.parse(
      localStorage.getItem('bookmarks')!
    );
    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.maps);

      this.bookmarks.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.saveBookMarksLocalStorage();
      });
    });
  }


  deleteMarker(i: number){
    // console.log('deleting marker',i +1);
    this.bookmarks[i].marker?.remove();
    this.bookmarks.splice( i, 1);
    this.saveBookMarksLocalStorage();
  }
}
