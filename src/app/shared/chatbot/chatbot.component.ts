import { Component } from '@angular/core';
import { OpenaiService } from 'src/app/core/services/openai.service';

export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  textList:textResponse[]=[{sno:1,text:'',response:''}];
  constructor(private openaiService: OpenaiService) {}
  generateText(data:textResponse) {
    this.openaiService.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }
}
