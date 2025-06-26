import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MainPoints } from '@models/summary';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private dataService = inject(DataService);
  mainPoints = toSignal(this.dataService.getData(), { initialValue: null });

  // summaryData: WritableSignal<Summary | null> = signal<Summary | null>(null);
  // ngOnInit() {
  // this.dataService.getData().subscribe((data) => this.summaryData.set(data));
  // }

  styles(category: string): Record<string, string> {
    const styleMap: Record<string, Record<string, string>> = {
      Reaction: { '--bg': 'var(--clr-red-50)', '--cl': 'var(--clr-red-400)' },
      Memory: {
        '--bg': 'var(--clr-yellow-50)',
        '--cl': 'var(--clr-yellow-400)',
      },
      Verbal: { '--bg': 'var(--clr-green-50)', '--cl': 'var(--clr-green-500)' },
      Visual: { '--bg': 'var(--clr-blue-50)', '--cl': 'var(--clr-blue-800)' },
    };

    return styleMap[category] ?? {};
  }

  onPointKeyDown(event: KeyboardEvent, point: MainPoints): void {
    const key = event.key.toLowerCase();

    if (key === 'enter' || key === ' ') {
      event.preventDefault();

      this.onPointClick(point);
    }
  }

  onPointClick(point: MainPoints): void {
    console.log('User selected:', point);
  }
}
