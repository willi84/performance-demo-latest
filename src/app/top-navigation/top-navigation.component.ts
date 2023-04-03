import { Component, Output, EventEmitter, ElementRef, ViewChild, Inject } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent {
  @Output() public sidenavToggle = new EventEmitter();
  @ViewChild('htmlContainer') htmlContainer: ElementRef;
  baseroute: boolean;
  sizeLogo =  {width: '185px', height: '61px', scale: {d:'0.7',m: '0.6'} };
  route: string;
  isHome: boolean = false;
  baseUrl : string = '';
  navLinks = [
    { name: 'HOME', link: '#home', scroll: true },
    { name: 'ABOUT', link: '#about', scroll: true },
    { name: 'BE A PART', link: '#description', scroll: true },
    { name: 'TEAM', link: '#team', scroll: true },
    { name: 'PARTNERS', link: '#partners', scroll: true },
    { name: 'FAQ', link: './faq', scroll: false },
    { name: 'BLOG', link: './blog', scroll: false}
    // { name: 'HOME', link: './' },
    // { name: 'ABOUT', link: './#about' },
    // { name: 'BE A PART', link: './#description' },
    // { name: 'TEAM', link: './#team' },
    // { name: 'PARTNERS', link: './#partners' },
    // { name: 'FAQ', link: './faq' },
    // { name: 'BLOG', link: './blog'}
  ];

  constructor(location: Location, router: Router, private elementRef: ElementRef, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    router.events.subscribe(val => {
      // console.log(val);
      if (location.path() == "") {
        this.isHome = true;
        this.baseUrl = './';
      } else {
        this.isHome = false;
        this.baseUrl = '';
      }
    });
  }
  getLink(){
    return this.isHome === true ? '#home' : '/';
  }
  public scrollTo(id) {
    console.log('scrollTo')
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: id,
    });
  }
}
