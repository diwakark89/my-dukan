import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { MessageService } from 'src/app/message.service';
import { Crisis } from '../crisis';
import { CrisisService } from '../Crisis.service';


@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crisises: Crisis[];

  crisises$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private crisisService:CrisisService, 
    private messageService: MessageService,
    private route:ActivatedRoute) { }


    
  ngOnInit() {
    this.crisises$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.crisisService.getCrisises();
      })
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.crisisService.addCrisis({ name } as Crisis)
      .subscribe(crisis => {
        this.crisises.push(crisis);
      });
  }

  getCrisiss():void{
    this.crisisService.getCrisises()
    .subscribe(crisises=>this.crisises=crisises);
  }

   delete(crisis: Crisis): void {
    this.crisises = this.crisises.filter(h => h !== crisis);
    this.crisisService.deleteCrisis(crisis).subscribe();
  }

}
