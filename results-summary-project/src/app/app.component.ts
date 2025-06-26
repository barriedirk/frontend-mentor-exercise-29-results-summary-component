import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResultComponent } from '@components/result/result.component';
import { SummaryComponent } from '@components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResultComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'results-summary-project';
}
