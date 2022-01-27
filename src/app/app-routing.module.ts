import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsModule } from './maps/maps.module';

const routes: Routes = [
  {
    path:'maps',
    loadChildren:  ()=>import('./maps/maps.module').then(x=>x.MapsModule)
  },
  {
    path:'**',
    redirectTo:'maps'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
