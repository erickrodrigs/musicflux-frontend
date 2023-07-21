import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'nav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss'],
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
