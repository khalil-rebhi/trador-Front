import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';
import { NewsItem } from '../core/models/NewsItem';

@Component({
  selector: 'app-news-component',
  templateUrl: './news-component.component.html',
  styleUrls: ['./news-component.component.css']
})
export class NewsComponentComponent implements OnInit {
  newsList: any[] = [];
  constructor(private newsService: NewsServiceService) { }
  ngOnInit(): void {

    this.newsService.getNews().subscribe(data => {
      console.log(JSON.stringify(data));
      this.newsList = data;
      console.log("liiist"+this.newsList);
    
      
    });

    

    
    
  
  }

}
