import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexOrderComponent } from './index-order/index-order.component';
import { IndexComponent } from './index/index.component';
import { KeywordComponent } from './keyword/keyword.component';
import { SemanticComponent } from './semantic/semantic.component';
import { TwoUrlComponent } from './two-url/two-url.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'keyword',
    component: KeywordComponent
  },
  {
    path: 'twoUrl',
    component: TwoUrlComponent
  },
  {
    path: 'indexOrder',
    component: IndexOrderComponent
  },
  {
    path: 'semantic',
    component: SemanticComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
