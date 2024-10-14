import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IEntry } from '../../@types/entry';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { EntriesService } from '../../services/entries.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDebtContentComponent } from '../dialog-debt-content/dialog-debt-content.component';

@Component({
  selector: 'app-debt-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatMenuModule],
  templateUrl: './debt-card.component.html',
  styleUrl: './debt-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtCardComponent {
  @Input() data!: IEntry;

  @Output() outputDeleteEntry: EventEmitter<any> = new EventEmitter();
  @Output() outputEditEntry: EventEmitter<any> = new EventEmitter();

  dialog = inject(MatDialog);

  public openDialog() {
    const dialogRef = this.dialog.open(DialogDebtContentComponent, {
      data: this.data
    });

    dialogRef.componentInstance.outputEditEntry.subscribe((entry: any) => {
      console.log(entry);
    })
  }

  public handleDeleteEntry() {
    this.outputDeleteEntry.emit(this.data._id);
  }
}
