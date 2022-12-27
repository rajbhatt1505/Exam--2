import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   data:any;
// className: string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined;
message: any;

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getProfiles();
  }
   getProfiles(){
    this.auth.getProfile().subscribe((res)=>{
      if(res){
        this.data = res.data;
        console.log(res);
        this.getProfile.patchValue({
          displayName:this.data.displayName,
          name: this.data.name,
          email: this.data.email,
          mobile: this.data.mobile,
          password: this.data.password
        });
        // this.data.run(() => this.router.navigateByUrl('/user'))

  
      }else{
        this.logout()
      }
    },err =>{

    })
  }
   logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

 
  imageSrc:any;
datas: any = {};
filename = '';
imginfile: any;
Userprofile: any = {};
imageChangedEvent: any = '';
croppedImage: any = '';
file_image: any;

UserData: any;


getProfile = new FormGroup({
    image_file: new FormControl(''),
    displayName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
    ]),
    name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
    ]),
    email: new FormControl("", [
        Validators.required,
        Validators.email,
    ]),
    mobile: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    password: new FormControl(''),
    // _id : new FormControl(""),
});

 fileChangeEvent(event: any): void {
        (document.getElementById('popup') as HTMLElement).style.display =
            'block';
        this.imageChangedEvent = event;
        
      }

get Profile() {
    return this.getProfile.controls;
}
get myform() {
    // console.log(this.myForm);
    return this.getProfile;
}
readonly = true;

Onsumit() {
  
    
//  
    const form1: any = new FormData();
    form1.append('image_file', this.imgChangeEvt);
    form1.append('Username', this.getProfile.get('Username')?.value);
    form1.append('Name', this.getProfile.get('Name')?.value);
    form1.append('Email', this.getProfile.get('Email')?.value);
    form1.append('Mobile', this.getProfile.get('Mobile')?.value);
    form1.append('Src', this.base64img);

    console.log(this.base64img);
    // var id:any=this.Datas._id

    // this.Pro.updateProfile(form1,id).subscribe(
    //     (res) => {
    //         const data: any = res;
    //         alert(data.message);
    //         console.log(data.message);
    //         this.router.navigate(["uikit/Users"])
    //     },
    //     (err) => {
    //         console.log(err);
    //     }
    // );
}

base64img:any;
  imgChangeEvt : any = '';
  onFileChange(event:any){
    this.imgChangeEvt = event.target.files[0];
    var files = event.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
    console.log(this.imgChangeEvt)
  }
  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
           this.base64img='data:image/png;base64,'+ btoa(binaryString);
          //  console.log(this.base64img);
   }
}