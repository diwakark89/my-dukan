import { from } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import {Crisis} from '../crisis';
import {CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.crisis$ = this.crisisService.getcrisis(id);
    this.getCrisis(id);
  }

  getCrisis(id :number):void{
    this.crisisService.getCrisis(id)
    .subscribe(crisis=>this.crisis=crisis);
  }

  gotoCrisies(): void {
    const crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
  
  save(): void {
    this.crisisService.updateCrisis(this.crisis)
      .subscribe(() => this.gotoCrisies());
  }
 
}
