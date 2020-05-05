import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TourPackage, TourPackagePage } from './tour-package';

export interface OAuthLoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  public loggedIn = false;
  private accessToken: string;

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
    this.loggedIn = this.accessToken !== null;
  }

  commonOptions(): { params?: any, headers?: HttpHeaders } {
    if (!this.loggedIn) {
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accessToken}`
      })
    };
  }

  createTour(tourPackageData: TourPackage) {
    const { category, name, promo, price, rating, start, tourLength } = tourPackageData;
    return this.http.post(
      `/api/v1/packages/`,
      {
        category, name, promo, price, rating,
        start: start.toISOString().split('T')[0],
        tour_length: tourLength
      },
      this.commonOptions()
    );
  }

  updateTour(tourPackageData: TourPackage) {
    const { category, name, promo, price, rating, start, tourLength } = tourPackageData;
    return this.http.put(
      `/api/v1/packages/${tourPackageData.id}/`,
      {
        category, name, promo, price, rating,
        start: new Date(start).toISOString().split('T')[0],
        tour_length: tourLength,
      },
      this.commonOptions()
    );
  }

  listTours(pageIndex: number = 1, tourLength?: number): Observable<any> {
    const options = this.commonOptions();
    options.params = { page: pageIndex };
    if (tourLength) {
      options.params.tourLength = tourLength;
    }
    return this.http.get<TourPackagePage>('/api/v1/packages/', options).pipe(
      map((page: any) => {
        const { results, count } = page;
        const tourPackages = results.map((data) => {
          return new TourPackage(
            data.id, data.category, data.name, data.promo,
            data.price, data.rating, data.tour_length,
            new Date(data.start)
          );
        });
        return { results: tourPackages, count };
      })
    );
  }

  getTour(id: number): Observable<any> {
    return this.http.get(`/api/v1/packages/${id}/`, this.commonOptions());
  }

  deleteTour(id: number) {
    return this.http.delete(`/api/v1/packages/${id}/`, this.commonOptions());
  }

  logout() {
    this.loggedIn = false;
    this.accessToken = null;
  }

  login(username: string, password: string) {
    const clientId = 'wql5aqXepfkcF0JQOAoOo921zbvcrQSg1MUb2VUe';
    const clientSecret = 'tVnwobvL4C7D76AOsYkrtDLh1D1mahbUqkzSBfqVi2zXfsBBD9Jm8FNe6yWof1XYIOwBfxtKrZh4Eug3piGu94Oga2R0VHJVG2VxQn1pw5Y5xcBOva0IX1n4WrPXZn0N';
    const headers = new HttpHeaders({});
    const data = {
      grant_type: 'password',
      username,
      password,
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'read write packages'
    };
    this.http.post('/oauth/token/', data, { headers }).subscribe((response: OAuthLoginResponse) => {
      this.loggedIn = true;
      this.accessToken = response.access_token;
      localStorage.setItem('accessToken', this.accessToken);
    }, (error) => {
      this.logout();
    });
  }
}
