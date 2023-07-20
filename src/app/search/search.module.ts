import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SearchComponent } from './containers/search/search.component';
import { HorizontalListComponent } from '../shared/components/horizontal-list/horizontal-list.component';
import { SearchService } from './services/search.service';

const ROUTES: Routes = [
  { path: '', canActivate: [AuthGuard], component: SearchComponent },
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    AuthModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    HorizontalListComponent,
  ],
  providers: [SearchService],
})
export class SearchModule {}
