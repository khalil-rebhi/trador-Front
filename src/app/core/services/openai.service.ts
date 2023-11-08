import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: "sk-...ItHl", // Replace with your actual API key
      dangerouslyAllowBrowser: true
    });
  }

  generateText(prompt: string): Promise<string | undefined> {
    const params: any = {
      engine: "text-davinci-003",
      prompt: prompt,
      max_tokens: 256
    };

    return this.openai.completions.create(params)
      .then(response => {
        return response.choices[0].text;
      })
      .catch(error => {
        return '';
      });
  }
}