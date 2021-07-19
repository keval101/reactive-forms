import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna']
  // user:any[] = [];

  constructor( formBuilder : FormBuilder) {

  }
  ngOnInit(){
    this.signupForm = new FormGroup({
        userData : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      }),

      'gender' : new FormControl(null, Validators.required),
      'hobbies' : new FormArray ( [], Validators.required)
    });


    // this.signupForm.statusChanges.subscribe(
    //   (values) => console.log(values)
    // )
  }

  onSubmit(){
    // console.log(this.signupForm)
    console.log(this.signupForm.value)
    console.log(this.signupForm.status)




    this.signupForm.reset();
    // const userDetail:any = { name: this.signupForm.value.username, email:this.signupForm.value.email}
    // this.user.push(userDetail)
    // localStorage.setItem('userDetail', JSON.stringify(this.user));
  }

  onAddHobby(){
    const controls = new FormControl(null , Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(controls);
  }

  forbiddenNames(control:FormControl):{[key:string] : boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      console.log(123)
      return {'nameIsForbidden' : true};
    }
    return null;
  }

  forbiddenEmail(contorl:FormControl) : Promise<any> {
    const promise = new Promise<any> ( (resolve, reject) =>{
      setTimeout(() => {
        if(contorl.value === 'keval@keval.com'){
          resolve({'emailIsForbidden' : true})
        } else {
          resolve(null)
        }
      }, 2000)

    });

    return promise;
  }
}
