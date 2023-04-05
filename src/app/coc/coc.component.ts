import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coc',
  templateUrl: './coc.component.html',
  styleUrls: ['./coc.component.scss']
})
export class CocComponent implements OnInit {

  cocImage = '../../../../assets/backgrounds/djangogirls/djangogirls-xl.webp';
  constructor() { }

  ngOnInit(): void {
  }

}
