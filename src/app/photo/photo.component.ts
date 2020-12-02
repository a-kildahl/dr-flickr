import { Component, Input } from '@angular/core';
import { Photo } from "../models/Photo";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {

  @Input() photo: Photo;

  public openSource() {
    window.open(this.photo.sourcePageUrl, "_blank");
  }
}
