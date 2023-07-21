import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MusicfluxItem } from '../../models/musicflux-item';

@Component({
  selector: 'musicflux-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'musicflux-item.component.html',
  styleUrls: ['musicflux-item.component.scss'],
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
