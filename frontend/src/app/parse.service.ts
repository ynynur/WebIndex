import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ParseService {

    constructor(private http: HttpClient) { }

    getSubtitleFromLink(targetLink: string): Observable<any> {
        return this.http.post(environment.baseURL + 'parser', { link: targetLink });
    }

    getWikipediaInfo(link: string) {
        return this.http.post(environment.baseURL + 'parser/wikipedia', { link });
    }

    getWikipediCompareUrls(link1: string, link2: string) {
        return this.http.post(environment.baseURL + 'parser/wikipedia-compare', { link1, link2 });
    }

}

