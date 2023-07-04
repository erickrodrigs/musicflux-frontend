import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MusicfluxItemComponent } from '../musicflux-item/musicflux-item.component';
import { CommonModule } from '@angular/common';

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
  items: any[];
}
