import { Component, OnInit } from '@angular/core';
import RedditImageFetcher from 'reddit-image-fetcher';
@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  memeUrl: string;

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.displayMeme();
  }

  ngAfterViewInit() {
    this.displayMeme();
    setInterval(() => {
      this.displayMeme();
    }, 300000);
  }

  async displayMeme() {
    let memeCall = await this.getMemes();
    this.memeUrl = memeCall[0].image;
  }

  async getMemes() {
    const response = await RedditImageFetcher.fetch({type: 'meme'});
    console.log(response);
    return response;
    };
}
