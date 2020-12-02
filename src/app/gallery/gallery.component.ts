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
        ], { optional: true })
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  private isLoading: boolean = false;
  private pageSize: number = 100;
  private currentPage: number = 1;

  @Input() public searchTerm: string = "";
  public photos: Photo[] = [];

  constructor(private flickrService: FlickrService, private snackbar: MatSnackBar, private translate: TranslateService) {}

  ngOnInit() {
    this.search();
  }

  public reset(): void {
    this.currentPage = 1;
    this.photos = [];
    this.search();
  }

  public onScroll(): void {
    if (!this.isLoading) {
      this.currentPage++;
      this.search();
    }
  }

  private search(): void {
    this.isLoading = true;
    this.flickrService.search(this.searchTerm, this.currentPage, this.pageSize).subscribe({
      next: photos => {
        this.photos = [... this.photos, ... photos.results];
        this.isLoading = false;
      },
      error: () => this.translate.get("flickr.errors.search").subscribe(translation => this.snackbar.open(translation))
    });
  }
}
