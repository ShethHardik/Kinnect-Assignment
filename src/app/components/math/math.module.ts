import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathRoutingModule } from './math-routing.module';
import { FormatTimePipe, MathComponent } from './math/math.component';


@NgModule({
  declarations: [
    MathComponent,
    FormatTimePipe
  ],
  imports: [
    CommonModule,
    MathRoutingModule
  ]
})
export class MathModule { }
