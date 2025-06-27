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
        this.score = Math.round(
          points.reduce((acc, curr) => acc + curr.score, 0) / points.length,
        );

        this.setScoreFeedback(this.score);
        this.cdr.markForCheck();
      }
    });
  }

  private setScoreFeedback(score: number): void {
    const feedbackRanges = [
      {
        min: 90,
        title: 'Excellent',
        description:
          'You scored higher than 90% of the people who have taken these tests.',
      },
      {
        min: 65,
        title: 'Great',
        description:
          'You scored higher than 65% of the people who have taken these tests.',
      },
      {
        min: 60,
        title: 'Good',
        description:
          'You scored higher than 60% of the people who have taken these tests.',
      },
      {
        min: 40,
        title: 'Average',
        description:
          'You scored higher than 40% of the people who have taken these tests.',
      },
      {
        min: 0,
        title: 'Needs Improvement',
        description: 'You scored lower than most people. Keep practicing!',
      },
    ];

    const feedback = feedbackRanges.find((range) => score >= range.min);

    if (feedback) {
      this.scoreTitle = feedback.title;
      this.scoreDescription = feedback.description;
    }
  }
}
