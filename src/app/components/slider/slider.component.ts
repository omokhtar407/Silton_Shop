import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore,{ Navigation ,Autoplay} from 'swiper';
SwiperCore.use([Navigation,Autoplay]);

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
