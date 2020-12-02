import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { GalleryComponent } from './gallery/gallery.component';
import { Photo } from './models/Photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public photos: Photo[] = [];
  public searchTerm: string = "cat";

  constructor(private title: Title) {
    
  }

  ngOnInit() {
    this.title.setTitle(environment.title);
  }

  public searchClicked(drawer: MatDrawer, gallery: GalleryComponent): void {
    drawer.close();
    gallery.reset();
  }
}
