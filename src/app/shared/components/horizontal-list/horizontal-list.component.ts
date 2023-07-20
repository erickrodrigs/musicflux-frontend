import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicfluxItemComponent } from '../musicflux-item/musicflux-item.component';
import { MusicfluxItem } from '../../models/musicflux-item';

@Component({
  selector: 'horizontal-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'horizontal-list.component.html',
  styleUrls: ['horizontal-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MusicfluxItemComponent],
})
export class HorizontalListComponent {
  @Input()
  items: MusicfluxItem[] = [];

  @Input()
  roundedItems = false;

  @Output()
  itemClick = new EventEmitter<number>();
}
