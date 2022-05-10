import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  @Input() country: any;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  
}
