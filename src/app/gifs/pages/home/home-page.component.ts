import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  public constructor(private _gifsService: GifsService) { }
  
  public get gifs () : Gif[] {
    return this._gifsService.gifsList
  }
}
