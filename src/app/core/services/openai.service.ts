/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey: string = "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"; // Replace with your actual API key
  private apiUrl: string = "https://api.openai.com/v1/chat/completions"; // Replace with the correct API URL

  constructor(private http: HttpClient) { }

  chat(prompt: string): Promise<string> {
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    const requestBody = {
      prompt: prompt,
      max_tokens: 100 ,// Adjust the max tokens as needed
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Who won the world series in 2020?"},
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content": "Where was it played?"}]
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers })
      .toPromise()
      .then(response => {
        return response.choices[0].text;
      })
      .catch(error => {
        console.error('Error from OpenAI:', error);
        throw error; // Handle errors according to your application's requirements.
      });
  }
}
*/