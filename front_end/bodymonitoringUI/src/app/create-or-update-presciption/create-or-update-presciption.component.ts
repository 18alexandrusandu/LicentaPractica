import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Component({
  selector: 'app-create-or-update-presciption',
  templateUrl: './create-or-update-presciption.component.html',
  styleUrls: ['./create-or-update-presciption.component.css']
})
export class CreateOrUpdatePresciptionComponent implements OnInit {
  constructor(private http: HttpClient,private route: ActivatedRoute,
    private rclm:RuntimeConfigLoaderService) { }
    createOrUpdateCond=false;
    createUrl="users/prescription/create"
    updateUrl="users/prescription/update"
    getUrl="users/prescription/"
    baseUrl=""
    userId:any
    noteId:any
    prescription:any;
    numberItems=1;


       addItem()
       {
        console.log("add item")
        this.numberItems= this.numberItems+1
         var parentDiv=document.getElementById("items")
         var title=document.createElement("p")
         var content=document.createElement("textarea")
         var spaceLine=document.createElement("br")

        title.textContent="Item "+this.numberItems
        content.classList.add("item")

        if(parentDiv!=null){
          console.log("found")
          parentDiv.appendChild(title)
          parentDiv.appendChild(content)
          parentDiv.appendChild(spaceLine)
        }
        


       }







        createOrUpdate()
    {
       

      var content=""
      var items=document.getElementsByClassName("item")


     for(let i=0;i<items.length;i++)
     {
      content+=(items[i] as HTMLTextAreaElement).value
      if(i>0)
      content+=";\n"


     }

     console.log(content)
    if(this.createOrUpdateCond==true)
   {
    console.log("create")
    var data={
     "id":0,
     "userId":this.userId,
     "start": (document.getElementById("dateStart") as HTMLTextAreaElement).value,
     "end": (document.getElementById("dateEnd") as HTMLTextAreaElement).value,
     "description":(document.getElementById("description") as HTMLTextAreaElement).value,
     "text": content
    }
    console.log(data)
    this.http.post( this.baseUrl+this.createUrl,data).subscribe(resp=>window.location.reload(),error=>console.log(error))
 


   }else
   {
    console.log("here in  update")
    var data2={
      "id":Number(this.prescription["id"]),
      "userId": Number(this.userId),
      "start": (document.getElementById("dateStart") as HTMLTextAreaElement).value,
      "end": (document.getElementById("dateEnd") as HTMLTextAreaElement).value,
     "description":(document.getElementById("description") as HTMLTextAreaElement).value,
      "text":content
 
     }
     console.log(data2)
    console.log(this.baseUrl+this.updateUrl)
     this.http.post( this.baseUrl+this.updateUrl,data2).subscribe(resp=>window.location.reload(),error=>console.log(error))
  
 


   }



    }


  ngOnInit(): void {




    this.baseUrl=this.rclm.getConfig()["local_server_ip_port"]
    console.log(this.route.snapshot.url[0].path)
    console.log("aici")
const re1 = /create./;
const re2= /update./;
this.createOrUpdateCond= re1.test(this.route.snapshot.url[0].path)

    console.log(this.createOrUpdateCond)

    console.log(this.route.snapshot.paramMap.get('id'))
    if(this.createOrUpdateCond)
    {
      this.userId=this.route.snapshot.paramMap.get('id')
      
    }else
    {

      this.noteId=this.userId=this.route.snapshot.paramMap.get('id')
      this.userId=this.route.snapshot.paramMap.get('userId')

     console.log( this.baseUrl+this.getUrl+"/"+ this.noteId)
      this.http.get<any>( this.baseUrl+this.getUrl+ this.noteId).subscribe(resp=>{
        this.prescription=resp;
        console.log("here i am ")
        console.log(this.prescription);

         
        var startInput=(new Date(this.prescription["startDate"])).toISOString()
        startInput=startInput.substring(0,startInput.length-1);


   
        var endInput=(new Date(this.prescription["endDate"])).toISOString()
        endInput=startInput.substring(0,startInput.length-1);
        
       (document.getElementById("dateStart")as HTMLInputElement).value= startInput;
       (document.getElementById("dateEnd")as HTMLInputElement).value= endInput;

       
        
        
      })



    }

  }

}
