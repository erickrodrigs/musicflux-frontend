import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MusicfluxItem } from '../../models/musicflux-item';

@Component({
  selector: 'horizontal-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'horizontal-list.component.html',
  styleUrls: ['horizontal-list.component.scss'],
})
export class HorizontalListComponent {
  @Input()
  items: MusicfluxItem[] = [];

  @Input()
  roundedItems = false;

  @Output()
  itemClick = new EventEmitter<number>();
}
