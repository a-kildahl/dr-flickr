import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FlickrPhotoResult } from '../models/flickr/FlickrPhotoResult';
import { FlickrSearch } from '../models/flickr/FlickrSearch';

import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  let service: FlickrService;

  let flickrPhoto;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FlickrService);
    flickrPhoto = {"id":"123456789","owner":"anon","secret":"secret","server":"65535","farm":66,"title":"Cats at Sunrise","ispublic":1,"isfriend":0,"isfamily":0};
    testingController = TestBed.inject<HttpTestingController>(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct url', () => {
    const result = service.getFlickrPhotoUrl(flickrPhoto);
    expect(result).toBe("https://live.staticflickr.com/65535/123456789_secret_q.jpg");
  });

  it("should return in correct format", (done: DoneFn) => {
    const flickrSearch = new FlickrSearch();
    flickrSearch.stat = "OK";
    flickrSearch.photos = new FlickrPhotoResult();
    flickrSearch.photos.page = 1;
    flickrSearch.photos.pages = 1;
    flickrSearch.photos.perpage = 1;
    flickrSearch.photos.total = "1";
    flickrSearch.photos.photo = [flickrPhoto];

    service.search("test").subscribe(photos => {
      expect(photos.totalPages).toBe(1);
      expect(photos.results.length).toBe(1);
      expect(photos.results[0].title).toBe(flickrPhoto.title);
      expect(photos.results[0].url).toBe("https://live.staticflickr.com/65535/123456789_secret_q.jpg");
      done();
    });

    const req = testingController.expectOne({
      method: "GET"
    });
    req.flush(flickrSearch);
  });
});
