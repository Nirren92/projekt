import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor( private router: Router,private userService: UserService,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]      
    });

  }


  login()
  {
    if (this.loginForm.valid) {
      
      this.userService.logIn(this.loginForm.value).subscribe({
        next: (response) => {
           
          localStorage.setItem("jwt",response.token)
          this.router.navigate(['/home']);
         
        },
        error: (error) => {
          console.error('nåt gick fel', error)
        }
      });
    }   
  }




}
