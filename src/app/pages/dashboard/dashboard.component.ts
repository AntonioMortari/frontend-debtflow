import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { EntriesService } from '../../services/entries.service';
import { IAuthData } from '../../@types/auth';
import { IEntry } from '../../@types/entry';
import { DebtCardComponent } from '../../components/debt-card/debt-card.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";
import { MatIconModule } from '@angular/material/icon';

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
  authData!: IAuthData;
  entries!: IEntry[];
  totalPaid: number = 0;
  totalNoPayed: number = 0;
  today: Date = new Date();

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

  ngOnInit(): void {
    this.entriesService.getByUserId(this.authData.userId).subscribe({
      next: (response) => {
        this.entries = response;
        this.calculateAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public logout() {
    this.authService.logout();
  }

  public onAddEntry(){

  }

  public onDeleteEntry(id: string) {
    this.entriesService.deleteById(id).subscribe({
      next: (_response) => {
        this.entries = this.entries.filter((entry) => entry._id !== id);
      },
      error: (error) => {
        console.log('Erro ao deletar dívida: ', error);
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
