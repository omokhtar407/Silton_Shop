import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore,{ Navigation } from 'swiper';
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
