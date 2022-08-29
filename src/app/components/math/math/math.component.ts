import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.css']
})
export class MathComponent implements OnInit {

  public randomNumber1: number = 0;
  public randomNumber2: number = 0;
  public showMessage: boolean = false;
  public message: string = '';
  public countQuestions: number = 0;
  public averageTime: any;

  countDown: Subscription;
  counter = 0;
  tick = 1000;

  @ViewChild('sum') sum: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe((count) => {
      if (this.counter == 0 && count) {
        console.log('timer completed', count, this.counter);
        if (this.countDown) {
          this.countDown.unsubscribe();
        }
      }
      ++this.counter;
    });
    this.generateRandamNumbers();
  }

  generateRandamNumbers()
  {
    this.showMessage = false;
    // this.sum.nativeElement.value = '';
    this.randomNumber1 = Math.floor((Math.random() * 10) + 1);
    this.randomNumber2 = Math.floor((Math.random() * 10) + 1);
  }

  calculate(data: any)
  {
    let sum = this.randomNumber1 + this.randomNumber2;
    this.showMessage = true;
    if(sum == data)
    {
      this.countQuestions++;
      this.message = 'Answer is correct';
      setTimeout(() => {
        this.generateRandamNumbers();
      }, 2000);
      this.averageTime = this.counter/this.countQuestions;
      
    }
    else{
      this.message = 'Answer is not correct';
    }
  }

  setMessageColor()
  {
    return (this.message == 'Answer is correct') ? 'Green' : 'Red';
  }

  ngOnDestroy() {
    // this.countDown = '';
  }

}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
