import { Component, OnInit, signal } from '@angular/core';
import { FormLayoutComponent } from '../../components/layouts/form-layout/form-layout.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

interface ILoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormLayoutComponent,
    RouterLink,
    RouterModule,
    CustomInputComponent,
    CustomButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<ILoginForm>;

  loading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const stringAuthData = localStorage.getItem('@auth');

    if (stringAuthData) {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loading.update(() => true);
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).pipe(
        finalize(() => {
          this.loading.update(() => false);
        })
      ).subscribe({
        next: (response) => {
          localStorage.setItem('@auth', JSON.stringify(response));
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        },
        error: ({ error }) => {
          console.log(error.message);
          this.toastr.error(error.message, 'Erro');
        },
      });
    }
  }
}
