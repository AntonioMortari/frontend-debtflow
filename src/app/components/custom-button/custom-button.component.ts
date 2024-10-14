import { Component, EventEmitter, Input, Output } from '@angular/core';

type TButtonVariants = 'primary' | 'outline';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() disable: boolean = false;
  @Input() variant: TButtonVariants = 'primary';
}
