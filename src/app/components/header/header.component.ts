import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomButtonComponent, MatIconModule, MatSlideToggle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  handleClick(){
    this.buttonClick.emit();
  }
}
