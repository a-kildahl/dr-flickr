import { Component, OnInit } from '@angular/core';
import { Photo } from './models/Photo';
import { FlickrService } from "./shared/flickr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public photos: Photo[] = [];

  constructor(private flickrService: FlickrService) {}

  ngOnInit() {
    this.flickrService.search("cat", 1, 100).subscribe(photos => this.photos = photos.results);
  }
}
