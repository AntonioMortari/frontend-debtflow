import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { JsonPipe } from '@angular/common';
import { IEntry } from '../../@types/entry';

interface IEntryForm {
  description: FormControl;
  status: FormControl;
  price: FormControl;
  date: FormControl;
}

@Component({
  selector: 'app-dialog-debt-content',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CustomInputComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './dialog-debt-content.component.html',
  styleUrl: './dialog-debt-content.component.scss',
})
export class DialogDebtContentComponent {
  dialogRef = inject(MatDialogRef<DialogDebtContentComponent>);
  entryForm!: FormGroup<IEntryForm>;

  prevEntryData: IEntry | undefined = inject(MAT_DIALOG_DATA);

  @Output() outputCreateEntry = new EventEmitter<IEntryForm>();
  @Output() outputEditEntry = new EventEmitter<IEntryForm>();

  constructor() {
    if (this.prevEntryData) {
      // se o dialog foi aberto passando os dados da dívida
      this.entryForm = new FormGroup({
        description: new FormControl(this.prevEntryData.description || '', [
          Validators.required,
        ]),
        price: new FormControl(this.prevEntryData.price || '', [
          Validators.required,
        ]),
        status: new FormControl(this.prevEntryData.status || 'toPay', [
          Validators.required,
        ]),
        date: new FormControl(this.formatDate(this.prevEntryData.date) || '', [
          Validators.required,
        ]),
      });
    } else {
      this.entryForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        status: new FormControl('toPay', [Validators.required]),
        date: new FormControl(this.formatDate(new Date()), [
          Validators.required,
        ]),
      });
    }
  }

  onConfirm() {
    if (this.entryForm.valid) {
      const { date, description, price, status } = this.entryForm.value;

      if(this.prevEntryData){
        //se estiver editando, emite o evento para o componente debt-card
        this.outputEditEntry.emit({
          date,
          description,
          price,
          status,
        });

        return;
      }
      
      // se estiver criando, emite o evento para o componente dashboard
      this.outputCreateEntry.emit({
        date,
        description,
        price,
        status,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
