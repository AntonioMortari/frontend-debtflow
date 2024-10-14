import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { EntriesService } from '../../services/entries.service';
import { IAuthData } from '../../@types/auth';
import { ICreateEntry, IEntry } from '../../@types/entry';
import { DebtCardComponent } from '../../components/debt-card/debt-card.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogDebtContentComponent } from '../../components/dialog-debt-content/dialog-debt-content.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MatDividerModule,
    DebtCardComponent,
    CommonModule,
    CustomButtonComponent,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  authData!: IAuthData; // dados de autenticação
  entries!: IEntry[]; // dívidas
  totalPaid: number = 0; // total pago
  totalNoPayed: number = 0; // total a pagar
  today: Date = new Date(); // data atual
  dialog = inject(MatDialog); // dialog

  constructor(
    private authService: AuthService,
    router: Router,
    private entriesService: EntriesService
  ) {
    const resultAuthData = authService.getAuthData();

    if (resultAuthData) {
      this.authData = resultAuthData;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDebtContentComponent);

    dialogRef.componentInstance.outputCreateEntry.subscribe(
      (entry: ICreateEntry) => {
        this.onAddEntry(entry);
      }
    );
  }

  loadEntries(status?: 'paid' | 'toPay') {
    console.log(status)
    this.entriesService.getByUserId(this.authData.userId, status).subscribe({
      next: (response) => {
        this.entries = response;
        this.calculateAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.loadEntries();
  }

  public logout() {
    this.authService.logout();
  }

  public filterEntries(event: any) {
    const { value } = event.target;

    this.loadEntries(value === 'paid' || value === 'toPay' ? value : '');
  }

  public onAddEntry(entry: ICreateEntry) {
    this.entriesService
      .create(
        { ...entry, price: Number(entry.price), date: new Date(entry.date) },
        this.authData.userId
      )
      .subscribe({
        next: () => {
          this.loadEntries();
          this.dialog.closeAll();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public onDeleteEntry(id: string) {
    this.entriesService.deleteById(id).subscribe({
      next: (_response) => {
        this.entries = this.entries.filter((entry) => entry._id !== id);
        this.calculateAll();
      },
      error: (error) => {
        console.log('Erro ao deletar dívida: ', error);
      },
    });
  }

  public onEditEntry(entry: IEntry) {
    this.entriesService.updateById(entry).subscribe({
      next: (response) => {
        console.log('Dívida atualizada com sucesso!');
        this.dialog.closeAll();
        this.loadEntries();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private calculateAll() {
    this.totalNoPayed = this.entries
      .filter((entry) => entry.status === 'paid')
      .reduce((sum, entry) => sum + entry.price, 0);

    this.totalPaid = this.entries
      .filter((entry) => entry.status === 'toPay')
      .reduce((sum, entry) => sum + entry.price, 0);
  }
}
