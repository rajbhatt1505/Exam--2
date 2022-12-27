import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  signupoForm!: FormGroup;
  message: string = '';
  isProcess: boolean = false;
  className = 'd-none'
  submitted = false;
  public showPassword: boolean = false;


  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charcode = (event.which) ? event.which : event.keyCode;

    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      console.log('charCode restricted is ' + charcode);
      return false;
    }
    return true;

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.signupoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
      displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    })
  }
  ngOnInit(): void {

  }
  signup() {
    this.isProcess = true;
    const data = this.signupoForm.value;
    delete data['confirm']
    this.auth.signup(data).subscribe(res => {
      if (res.Succes) {

        this.isProcess = false;
        this.message = "Account Has Been Created!!";
        this.className = 'alert alert-success'
      } else {
        this.isProcess = false;
        this.message = res.message;
        this.className = 'alert alert-success';
      }
      this.signupoForm.reset()

    }, err => {
      this.isProcess = false;
      this.message = "Server Error !!";
      this.className = 'alert alert-danger'
    })
  }

  get displayName(): FormControl {
    return this.signupoForm.get("displayName") as FormControl;
  }
  get name(): FormControl {
    return this.signupoForm.get("name") as FormControl;
  }
  get email(): FormControl {
    return this.signupoForm.get("email") as FormControl;
  }
  get mobile(): FormControl {
    return this.signupoForm.get("mobile") as FormControl;
  }

  get password(): FormControl {
    return this.signupoForm.get("password") as FormControl;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupoForm.controls;
  }




//   onSubmited(): void{
//     this.submitted = true;
  
//     if (this.signupoForm.invalid || null ){
//       return;
//     }

// }
}