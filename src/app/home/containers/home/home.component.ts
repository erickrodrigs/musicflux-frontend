import { Component } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  items = Array.from({ length: 9 }).map((_, index) => ({
    id: index + 1,
    name: 'Album title',
    description: 'Artist name',
    coverUrl: '',
  }));
}
