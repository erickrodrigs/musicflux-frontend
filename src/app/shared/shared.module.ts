import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MusicfluxItemComponent } from './components/musicflux-item/musicflux-item.component';
import { HorizontalListComponent } from './components/horizontal-list/horizontal-list.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ImgMissingDirective } from './directives/img-missing/img-missing.directive';

@NgModule({
  declarations: [
    HorizontalListComponent,
    MusicfluxItemComponent,
    NavMenuComponent,
    ImgMissingDirective,
  ],
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  exports: [
    HorizontalListComponent,
    MusicfluxItemComponent,
    NavMenuComponent,
    ImgMissingDirective,
  ],
})
export class SharedModule {}
