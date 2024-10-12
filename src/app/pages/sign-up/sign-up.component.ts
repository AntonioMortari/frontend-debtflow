import { Component, OnInit } from '@angular/core';
import { FormLayoutComponent } from '../../components/layouts/form-layout/form-layout.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface ISignUpForm {
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormLayoutComponent,
    CustomInputComponent,
    CustomButtonComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup<ISignUpForm>;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const stringAuthData = localStorage.getItem('@auth');

    if (stringAuthData) {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService.signUp(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('@auth', JSON.stringify(response));
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
