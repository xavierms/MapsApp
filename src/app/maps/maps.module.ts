import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapsComponent } from './components/mini-maps/mini-maps.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    MiniMapsComponent,
    FullScreenComponent,
    BookmarksComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
