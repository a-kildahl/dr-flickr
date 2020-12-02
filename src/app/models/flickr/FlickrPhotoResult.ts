import { FlickrPhoto } from "./FlickrPhoto";

export class FlickrPhotoResult {
    page: number;
    pages: number;
    perpage: number;
    photo: FlickrPhoto[];
    total: string;
}