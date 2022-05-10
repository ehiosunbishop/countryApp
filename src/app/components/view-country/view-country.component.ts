import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { Country, CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.scss']
})
export class ViewCountryComponent implements OnInit {

  country: Observable<Country[]> | undefined;
  key: any;
  type: any;

  constructor(private router: Router, private countryService: CountryService, private location: Location, private activeRoute: ActivatedRoute) {
    this.key = this.activeRoute.snapshot.paramMap.get('key');
    this.type = this.activeRoute.snapshot.paramMap.get('type');
  }

  ngOnInit(): void {
    if(!this.key) return this.location.back();
    this.activeRoute.params.subscribe(routeParams => {
      this.key = routeParams.key;
      this.type = routeParams.type;
      this.get_country();
    });
  }

  viewCountry(border: string){
    this.router.navigate(['view-country/code/'+border], { skipLocationChange: false });
  }

  goBack(){
    this.location.back();
  }

  get_country() {

    if (this.type == 'code') {
      this.country = this.countryService.get_country_by_code(this.key);
    }else {
      this.country = this.countryService.get_country_by_name(this.key);
    }

    this.country.subscribe(
      (res: any) => {
        console.log(res);
        this.countryService.updateVisitedCountries(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
