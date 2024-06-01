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
  addUserForm:FormGroup

  constructor( private router: Router,private userService: UserService,private fb: FormBuilder,private fb2: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]      
    });

    this.addUserForm = this.fb2.group({
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
          localStorage.setItem("username",this.loginForm.value.username)
          
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/home']); 
          });
         
        },
        error: (error) => {
          console.error('nåt gick fel', error)
        }
      });
    }   
  }


  addUser() {
    console.log("startfunktion");
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe({
        next: (response) => {
          // Återställ formuläret
          this.addUserForm.reset();
        },
        error: (error) => {
          console.error('nåt gick fel', error);
        }
      });
    }
  }
  



}
