import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-menu',
  styleUrls: ['nav-menu.component.scss'],
  templateUrl: 'nav-menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatSidenavModule, RouterModule, MatIconModule],
})
export class NavMenuComponent {
  menuOptions = [
    { iconName: 'home', name: 'Home', link: '' },
    { iconName: 'search', name: 'Search', link: '' },
    { iconName: 'library_music', name: 'Library', link: '' },
    { iconName: 'history', name: 'History', link: '' },
  ];
}
