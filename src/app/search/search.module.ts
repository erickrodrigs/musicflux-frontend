import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NavMenuComponent } from '../shared/components/nav-menu/nav-menu.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SearchComponent } from './containers/search/search.component';
import { AuthModule } from '../auth/auth.module';
import { HorizontalListComponent } from '../shared/components/horizontal-list/horizontal-list.component';

const ROUTES: Routes = [
  { path: '', canActivate: [AuthGuard], component: SearchComponent },
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    AuthModule.forRoot(),
    NavMenuComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    HorizontalListComponent,
  ],
})
export class SearchModule {}
