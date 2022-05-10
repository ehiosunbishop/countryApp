import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Country {
  region: string;
  subregion: string;
  area: number;
  size: number;
  flags: any;
  name: any;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _countries: any = new BehaviorSubject([]);
  private _visited_countries: any = new BehaviorSubject([]);
  selectedCountry: any;
  _headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET')
    .set(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, X-CSRF-Token'
    );
  _url: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  get getCountries() {
    return this._countries.asObservable();
  }

  updateCountries(countries: Country) {
    this._countries.next(countries);
  }

  get getVisitedCountries() {
    return this._visited_countries.asObservable();
  }

  updateVisitedCountries(country: Country) {
    const countries = this._visited_countries.value;

    countries.push(country);
    this._visited_countries.next(countries);
  }

  removeCountry(country: Country) {
    const countries = this._countries.value;
    countries.splice(countries.indexOf(country), 1);

    this._countries.next(countries);
  }

  get_countries(): Observable<Country[]> {
    return this.http.get(`${this._url}/all`, { headers: this._headers }).pipe(
      map((res: any) => {
        this.updateCountries(res);
        return res;
      })
    );
  }

  filter_by_region(region: string): Observable<Country[]> {
    return this.http
      .get(`${this._url}/region/${region}`, { headers: this._headers })
      .pipe(
        map((res: any) => {
          this.updateCountries(res);
          return res;
        })
      );
  }

  country_search(keyword: string): Observable<Country[]> {
    return this.http
      .get(`${this._url}/name/${keyword}`, { headers: this._headers })
      .pipe(
        map((res: any) => {
          this.updateCountries(res);
          return res;
        })
      );
  }

  get_country_by_name(name: string): Observable<Country[]> {
    return this.http
      .get(`${this._url}/name/${name}?fullText=true`, {
        headers: this._headers,
      })
      .pipe(
        map((res: any) => {
          return res[0];
        })
      );
  }

  get_country_by_code(code: string): Observable<Country[]> {
    return this.http
      .get(`${this._url}/alpha/${code}`, { headers: this._headers })
      .pipe(
        map((res: any) => {
          return res[0];
        })
      );
  }
}
