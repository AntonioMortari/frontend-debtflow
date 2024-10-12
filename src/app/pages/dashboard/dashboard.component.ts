import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { EntriesService } from '../../services/entries.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MatDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  authData: any = {};

  constructor(
    private authService: AuthService,
    router: Router,
    private entriesService: EntriesService
  ) {
    this.authData = authService.getAuthData();
  }

  ngOnInit(): void {
    this.entriesService.getByUserId(this.authData.userId).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {

      }
    })
  }

  public logout() {
    this.authService.logout();
  }
}
