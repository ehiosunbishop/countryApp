import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: Observable<Country[]> | any;
  visited_countries: Observable<Country[]> | any;
  keyword: string | undefined;

  constructor(private countryService: CountryService) { 
    this.countries = this.countryService.getCountries;
    this.visited_countries = this.countryService.getVisitedCountries;
  }

  ngOnInit(): void {
    this.get_countries();
  }

  get_countries(){
    const feedback = this.countryService.get_countries();

    feedback.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  filter_by_region(region: string){
    console.log(region);
    const feedback = this.countryService.filter_by_region(region);

    feedback.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onSearchChange(){
    if(this.keyword == '' || !this.keyword) return;
  
    const feedback = this.countryService.country_search(this.keyword);

    feedback.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
