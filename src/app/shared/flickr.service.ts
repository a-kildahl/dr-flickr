import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PagedResult } from "../models/PagedResult";
import { Photo } from "../models/Photo";
import { FlickrSearch } from "../models/flickr/FlickrSearch"
import { FlickrPhoto } from '../models/flickr/FlickrPhoto';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private http: HttpClient) { }

  public search(tag: string, page?: number, pageSize?: number): Observable<PagedResult<Photo>>  {
    const params = new HttpParams()
      .set("api_key", environment.flickr.apiKey)
      .set("tags", tag)
      .set("format", "json")
      .set("nojsoncallback", "1")
      .set("page", page ? page.toString() : "1")
      .set("per_page", pageSize ? pageSize.toString() : "10");
    
    return this.http.get(environment.flickr.endpoints.search, { params })
      .pipe(map((response: FlickrSearch) => ({
      totalPages: response.photos.pages,
      results: response.photos.photo.map(photo => ({
        title: photo.title,
        url: this.getFlickrPhotoUrl(photo)
      }))
    })));
  }

  public getFlickrPhotoUrl(photo: FlickrPhoto): string {
    return `${environment.flickr.endpoints.image}/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
  }
}
