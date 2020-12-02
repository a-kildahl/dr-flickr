import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Photo } from '../models/Photo';
import { FlickrService } from '../shared/flickr.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger("photoReveal", [
      transition("* <=> *", [
        query(":enter", [
          style({ opacity: 0, transform: "scaleX(0)" }),
          stagger("30ms", animate("400ms ease-out", style({ opacity: 1, transform: "scaleX(1)" })))
        ])
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  @Input() public searchTerm: string = "";

  public photos: Photo[] = [];

  constructor(private flickrService: FlickrService, private snackbar: MatSnackBar, private translate: TranslateService) {}

  ngOnInit() {
    this.flickrService.search(this.searchTerm, 1, 100).subscribe({
      next: photos => this.photos = photos.results,
      error: () => this.translate.get("flickr.errors.search").subscribe(translation => this.snackbar.open(translation))
    });
  }
}
