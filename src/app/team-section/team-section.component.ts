import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit{
  @Input() image;
  @Input() team;
  @Input()   lazy = false;
  @Input()   height;
  @Input()   fadeout = false;
  @Input() title: string;
  @Input() showPopups = false;
  team$;
  responsive: boolean = false;
  isMobile = false;
  
  loading = 'eager';
  device: any;
  mobileHeight: number = 700;
  
  extraClasses = '';

  constructor(public dialog: MatDialog, private host:AppComponent) {
    console.log('constructro team section');
    this.isMobile = this.host.class.indexOf('desktop') === -1 ? true : false;
  }
  
  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }
  ngOnInit(): void {
    let imageHeight: string = '700';
      this.loading = this.lazy === true ? 'lazy' : this.loading;
      this.responsive = (this.image && this.image.responsive) ? this.image.responsive : this.responsive;
      if(this.isMobile === true){
        this.extraClasses += ' bg--mobile';
      }
      if(this.fadeout){
        this.extraClasses += ' bg-image--fadout';
      }
      this.mobileHeight = (this.image && this.image.mobileHeight) ? this.image.mobileHeight : this.mobileHeight;
      this.extraClasses += `bg-image--${imageHeight} bg-image-mobile--${this.mobileHeight}` 
  }
}
