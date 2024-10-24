import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  inputLanguage: string = 'en'; // Default input language
  outputLanguage: string = 'fr'; // Default output language
  textToTranslate: string = '';
  translatedText: string = '';

  constructor(private http: HttpClient) {}

  changeLanguage() {
    this.translateText();
  }

  onTextChange() {
    this.translateText();
  }

  translateText() {
    if (this.textToTranslate) {
      const url = 'https://translate-plus.p.rapidapi.com/translate'; 
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
        'x-rapidapi-key': '057a3f844cmshda9daa7db0db43dp1cc3cbjsna0917b111bb8' 
      });
      
      const body = {
        text: this.textToTranslate,
        source: this.inputLanguage,
        target: this.outputLanguage
      };

      this.http.post(url, body, { headers }).subscribe(response => {
        console.log('API Response:', response);
        // Ajustez cette ligne en fonction de la structure de la réponse de l'API
        this.translatedText = response['translations']?.translation || 'Translation not available'; 
      }, error => {
        console.error('Translation error', error);
        this.translatedText = 'Error during translation: ' + (error.error.message || error.message);
      });
    } else {
      this.translatedText = '';
    }
  }
}
