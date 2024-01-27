import { Component } from '@angular/core';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent {
  color: string = "blue";
  score: number = 80; // Score constant à 80
  val: number = 440 - (440 * this.score) / 100;

  constructor() {
    if (this.score >= 85) this.color = "green";
    else if (this.score <= 75) this.color = "red";
  }
}
