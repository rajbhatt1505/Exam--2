import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  [x: string]: any;
  bookForm: FormGroup
  imageChangedEvent: any = '';
  imageSrc:any;
  submitted = false;


  OnlyNumbersAllowed(event: { which: any; keyCode: any; }):boolean{
    const charcode = (event.which)?event.which:event.keyCode;
  
    if(charcode > 31 && (charcode < 48 || charcode > 57))
    {
      console.log('charCode restricted is '+ charcode);
      return false;
    }
  return true;
  
  }
    

  constructor(public formBuilder: FormBuilder, 
    private router: Router, 
    private ngZone: NgZone,
    private crudService: CrudService) {
    this.bookForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]],
      price: ['',[Validators.required,]],
      quantity:['',[Validators.required,]],
      description: ['',[Validators.required]]
    })
  }

  ngOnInit(): void { }
  onSubmit(): any {
    this.crudService.AddBook(this.bookForm.value)
      .subscribe(() => {
        console.log('Data Added Successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))

      }, (err) => {
        console.log(err);
    });
  }

  fileChangeEvent(event: any): void {
    (document.getElementById('popup') as HTMLElement).style.display =
        'block';
    this.imageChangedEvent = event;
    
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

   get name() {
    return this.bookForm.get('name');
  }

  get price(): FormControl {
    return this.bookForm.get("price") as FormControl;
  }
  get quantity(): FormControl {
    return this.bookForm.get("quantity") as FormControl;
  }
  get description() {
    return this.bookForm.get('description');
  }
  get f(): { [key: string]: AbstractControl}{
    return this.bookForm.controls;
  }
}
