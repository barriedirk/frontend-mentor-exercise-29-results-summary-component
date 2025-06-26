import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  private dataService = inject(DataService);
  private cdr = inject(ChangeDetectorRef);

  mainPoints = toSignal(this.dataService.getData(), { initialValue: null });
  score: number = 0;
  scoreTitle: string = 'Great';
  scoreDescription: string =
    'You scored higher than 65% of the people who have taken these tests.';

  constructor() {
    effect(() => {
      const points = this.mainPoints();

      if (points) {
        this.score =
          points.reduce((acc, curr) => {
            acc += curr.score;

            return acc;
          }, 0) / points.length;

        this.cdr.markForCheck();
      }
    });
  }
}
