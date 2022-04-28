import { Component, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  selectedDate: Date;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
 
  ngOnInit() {}
 
  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    console.log(event);
    
    // const alert = await this.alertCtrl.create({
    //   header: event.title,
    //   subHeader: event.desc,
    //   message: 'From: ' + start + '<br><br>To: ' + end,
    //   buttons: ['OK'],
    // });
    // alert.present();
  }
 
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          color: this.getColor(Math.floor(Math.random() * 5))
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          color: this.getColor(Math.floor(Math.random() * 5))
        });
      }
    }
    this.eventSource = events;
  }
 
  removeEvents() {
    this.eventSource = [];
  }

  addEvent() {
    var eventType = Math.floor(Math.random() * 2);
      // var startDay = Math.floor(Math.random() * 5);
      // var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
    var events = Array.from(this.eventSource);//this.eventSource;
    this.eventSource = [];
    var date = new Date(this.selectedDate);
    var startMinute = Math.floor(Math.random() * 24 * 60);
    var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          date.getMinutes()
        );
    events.push({
      title: 'Event - meeting room',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
      color: this.getColor(Math.floor(Math.random() * 5))
    });
    this.eventSource = events;
  }

  
getColor(count) {
  if(count == 1) {
    return "one"
  } else if (count == 2) {
    return "two"
  } else if(count == 3) {
    return "three"
  } else if(count == 4) {
    return "four"
  } else {
    return "one"
  }
}

onTimeSelected(event) {
  console.log(event.selectedTime);
  this.selectedDate = event.selectedTime;
}
}
