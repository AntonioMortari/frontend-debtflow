import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEntry } from '../../@types/entry';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { EntriesService } from '../../services/entries.service';

@Component({
  selector: 'app-debt-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatMenuModule],
  templateUrl: './debt-card.component.html',
  styleUrl: './debt-card.component.scss',
})
export class DebtCardComponent {
  @Input() data!: IEntry;

  @Output() deleteEntry: EventEmitter<any> = new EventEmitter();

  public handleDeleteEntry(){
    this.deleteEntry.emit(this.data._id);
  }

  
}
