import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkTheme: boolean;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleTheme(){
    this.isDarkTheme = this.isDarkTheme ? false : true;
    
    const bodyClass = this.isDarkTheme ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', bodyClass);
  }

}
