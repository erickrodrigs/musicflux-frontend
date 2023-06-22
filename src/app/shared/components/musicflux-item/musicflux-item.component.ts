import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'musicflux-item',
  styleUrls: ['musicflux-item.component.scss'],
  templateUrl: 'musicflux-item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule],
})
export class MusicfluxItemComponent {
  @Input()
  coverUrl = '';

  @Input()
  name = '';

  @Input()
  description = '';

  @Input()
  rounded = false;

  get classNameBasedOnRoundedProp() {
    return this.rounded ? 'musicflux-item__rounded' : '';
  }
}
