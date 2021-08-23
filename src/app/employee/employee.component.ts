import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';
import { Validators } from '@angular/forms'; 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showAdd : boolean = true
  showUpdate: boolean = true
  formValue !: FormGroup;
  newEmployee : EmployeeModel = new EmployeeModel();
  constructor(private formBuilder : FormBuilder, private api : ApiService) { }
  employeeData : any
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName :[' ', Validators.required],
      lastName : ['',Validators.required],
      email: [' ',[Validators.required,Validators.email]],
      mobile : [' ',[Validators.required,Validators.minLength(10)]],
      salary : [' ',Validators.required],
      

    })
    this.get()
  } 
  clickAdd(){
    this.formValue.reset(); 
    this.showAdd = true;
    this.showUpdate= false
  }
  post(){
    
    this.newEmployee.firstName = this.formValue.value.firstName;
    this.newEmployee.lastName = this.formValue.value.lastName;
    this.newEmployee.email = this.formValue.value.email;
    this.newEmployee.mobile = this.formValue.value.mobile;
    this.newEmployee.salary = this.formValue.value.salary;
    
    this.api.postData(this.newEmployee).subscribe(res=>{
      console.log(res)
      alert("Add Employee succesfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.get()
    }, error =>{
      console.log(error)
      alert("Error")
    })
    this.formValue.reset()
    
  }
  
  get(){
    this.api.getData().subscribe(res=>{
      this.employeeData = res 
    })
  }
  edit (row:any){
    this.showUpdate = true;
    this.showAdd = false
    this.newEmployee.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    

  }
  put(){
    this.newEmployee.firstName = this.formValue.value.firstName;
    this.newEmployee.lastName = this.formValue.value.lastName;
    this.newEmployee.email = this.formValue.value.email;
    this.newEmployee.mobile = this.formValue.value.mobile;
    this.newEmployee.salary = this.formValue.value.salary;
    
    this.api.updateData(this.newEmployee.id,this.newEmployee).subscribe(res=>{
      alert("Edit Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.get();
    })
  }
  delete(row:any)
  {
    this.api.deleteData(row.id).subscribe(res=>{
      alert("Delete Successfully")
      this.get()
    })
  }
  
}


