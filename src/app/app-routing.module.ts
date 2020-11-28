import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolver } from './resolvers/profile/profile.resolver';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  {
    path: 'profile/:name',
    component: ProfileComponent,
    resolve: {
      profileResolver: ProfileResolver
  } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
