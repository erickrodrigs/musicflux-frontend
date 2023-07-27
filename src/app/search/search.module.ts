import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchRoutingModule } from './search.routing.module';
import { TrackModule } from '../track/track.module';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './containers/search/search.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    TrackModule,
    SharedModule,
  ],
  providers: [SearchService],
})
export class SearchModule {}
