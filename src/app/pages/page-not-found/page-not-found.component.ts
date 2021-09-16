import { Component, OnInit } from '@angular/core';
import {MetaHandlerService} from '../../../shared/services/metaHandler.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public metaService: MetaHandlerService) { }

  ngOnInit(): void {
    this.metaService.updateDescription('not found');
  }

}
