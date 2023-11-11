import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


export class TextResponse {
  sno: number;
  text: string;
  response: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent  implements OnInit{

queryFormGroup!:FormGroup
messages=[
  {role:"system",content:"You are a helpful assistant. "}
];
result:any

  textList: TextResponse[] = [{ sno: 1, text: '', response: '' }];

  constructor( private fb:FormBuilder , private HttpClient:HttpClient) {}
  ngOnInit(): void {
    this.queryFormGroup=this.fb.group({
      query:this.fb.control("")
    })
  }

  
handlerAskGPT() {
  let url="https://api.openai.com/v1/chat/completions"
  let httpHeaders =new HttpHeaders()
  .set("Authorization","Bearer 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")
  .set("Content-Type", "application/json")
  this.messages.push({
    role:"user", content:this.queryFormGroup.value.query
  })
  let payload={
    model: "gpt-3.5-turbo",
    messages:this.messages
  }


    this.HttpClient.post(url,payload,{headers:httpHeaders}).subscribe({
      next:(resp)=>{
        this.result=resp;
        

      },
      error:(err)=>{
        console.error("Error fetching data:", err);

      }
    })
  }








 /* generateText(data: TextResponse) {
    this.openaiService.chat(data.text).then(text => {
      data.response = text;
      if (this.textList.length === data.sno) {
        this.textList.push({ sno: data.sno + 1, text: '', response: '' });
      }
    });
  }*/
}
