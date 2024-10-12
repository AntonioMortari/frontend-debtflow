import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [],
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss', './form-layout-media-queryt.component.scss']
})
export class FormLayoutComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
