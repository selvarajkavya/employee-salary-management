import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Employeemodel } from '../employeemodel';
import { ApiService } from '../shared/api.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
    formValue!: FormGroup;
    submitted=false;
    employeeModelObj : Employeemodel = new Employeemodel();
  employeeData: any;
  
  form: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required),
    sex: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });
    
  constructor(private formbuilder:FormBuilder,private api:ApiService,private router:Router) { }
   

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      
       name: ['', Validators.required],
      department: ['', Validators.required],
      sex: ['', Validators.required],
      status: ['', Validators.required],
      salary: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
  });


    this.getAllEmployee();
  }
  get f() { return this.formValue.controls; }


  
postEmployeeDetails(){
  this.employeeModelObj.name=this.formValue.value.name;
  this.employeeModelObj.department=this.formValue.value.department;
  this.employeeModelObj.sex=this.formValue.value.sex;
  this.employeeModelObj.status=this.formValue.value.status;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this.employeeModelObj.address=this.formValue.value.address;
  this.employeeModelObj.phone=this.formValue.value.phone;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.address=this.formValue.value.address;

  this.api.postEmploye(this.employeeModelObj).subscribe({next:res=>
    {
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    },

  error:()=>
    {
      alert("Something went wrong")
    }
    
})
}
 getAllEmployee(){
  this.api.getEmploye()
  .subscribe(res=>{
      this.employeeData =res;
  })
 }
}
