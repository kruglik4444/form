import { Component,  } from '@angular/core';
import { AddressService } from './address.service';
import { AngularYandexMapsModule,  IEvent } from 'angular8-yandex-maps';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
interface User {
  firstName: string,
  secondName: string,
  email: string,
  phone: string,
  address: string,
  date: Date
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  constructor(private addrService: AddressService){ 
   
  }
  
  title = 'teleform';
  user: User = {
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    address: "",
    date: new Date,
  };

  showContactPart = false;
  showMap = false;
  response;
  coords = [];

  openMapModal(){
    this.showMap = true;
  }
  showContacts(){
    this.showContactPart = true;
  }

  findAddress(event: IEvent) {
    if (event.type === 'click') 
       this.coords = event.event.get("coords");
    this.addrService.getAddress(this.coords[1], this.coords[0]).subscribe(data =>{
    this.response = data;
    this.user.address = this.response.response
      .GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
    console.log(this.user.address);
   })
    this.showMap = false;
  }  
  updateDOB(dateObject) {
    this.user.date = dateObject.value;
  }
  
}
