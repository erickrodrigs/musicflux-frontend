import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MusicfluxItem } from '../../models/musicflux-item';

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
  item: MusicfluxItem;

  @Input()
  rounded = false;

  @Output()
  itemClick = new EventEmitter<number>();

  get classNameBasedOnRoundedProp() {
    return this.rounded ? 'musicflux-item__rounded' : '';
  }
}
