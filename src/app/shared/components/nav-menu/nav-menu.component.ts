import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-menu',
  styleUrls: ['nav-menu.component.scss'],
  templateUrl: 'nav-menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class NavMenuComponent {
  @Input()
  isMobile = false;

  menuOptions = [
    { iconName: 'home', name: 'Home', link: '' },
    { iconName: 'search', name: 'Search', link: '/search' },
    { iconName: 'library_music', name: 'Library', link: '' },
    { iconName: 'history', name: 'History', link: '' },
  ];
}
