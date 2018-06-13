import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.changeActive();
  }

  sendComponentNumber(num) {
    this.changeActive();
    this.change.emit(num);
  }

  changeActive() {
    // console.log(($('span').hasClass('active')));
    if ( ($('span').hasClass('active')) ) {
      $('#first').addClass('active');
    }
    $('span').click(function(e) {
      //console.log(e.currentTarget,"//",e.target,"//",this);
      $('span').removeClass('active');
      $(this).addClass('active');
    });
  }

}
