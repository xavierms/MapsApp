import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .maps-container {
        width: 100%;
        height: 100%;
      }
      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px;

      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap!: ElementRef;
  maps!: mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number,number]= [-69.93758121994654, 18.473808890777686];

  constructor() {}

  ngOnDestroy(): void {
      this.maps.off('zoom',()=>{});
      this.maps.off('zoomend',()=>{});
      this.maps.off('on',()=>{});
  }
  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.maps.on('zoom', (e) => {
      this.zoomLevel = this.maps.getZoom();
    });  
    
    this.maps.on('zoomend', (e) => {
     if (this.maps.getZoom() > 18) {
       this.maps.zoomTo( 18 );
     }
    });


    this.maps.on('move',(e)=>{
      const target = e.target;
      const{lng, lat} =target.getCenter();
      this.center= [lng,lat];
    })
  }

  zoomOut() {
    this.maps.zoomOut();
  }
  zoomIn() {
    this.maps.zoomIn();
  }
  zoomChange(value: any){
this.maps.zoomTo( value)  
  }
}
