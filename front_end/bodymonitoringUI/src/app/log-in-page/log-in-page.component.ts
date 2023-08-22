import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { Observable } from 'rxjs';



export interface Account
{
  type:string
  userId:number
  name:string
}





@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})


export class LogInPageComponent implements OnInit {
   baseHttp="";
   
   logInurl="users/user/logIn";
   userData={type:"",userId:""}


  constructor(private http: HttpClient,private rclm:RuntimeConfigLoaderService) { }
  failed=false
  succeded=false
  ngOnInit(): void {
    this.baseHttp=this.rclm.getConfig()["local_server_ip_port"]
  }
  logIn(user:any)
  {
    var userValue=user.value;
    console.log(userValue);
    if(userValue["username"]!='')
    sessionStorage.setItem("username",userValue["username"])
    if(userValue["email"]!='')
    sessionStorage.setItem("email",userValue["email"])





    var data={"Id":0,"name":userValue["name"],
    "username":userValue["username"],
    "password": userValue["password"],
    
    }
    sessionStorage.setItem("type","ASSISTANT");
    
    this.http.post<Account>(this.baseHttp+this.logInurl,data).subscribe(resp=>
      {
      
        this.succeded=true
        console.log(resp);
        sessionStorage.setItem("id",resp.userId.toString());
        sessionStorage.setItem("type",resp.type);

        window.location.reload();
      },err=>this.failed=true
      
      )
    

    //sessionStorage.setItem("type","PATIENT");

    //sessionStorage.setItem("type","ADMIN");
   

   // 

  }

}
