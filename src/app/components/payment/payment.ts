import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

  items: any[] = [];
  totalAmount = 0;
  address : any;

  step : 'summary' | 'methods' | 'card' | 'success' = 'summary';
  paymentType : 'upi' | 'credit' | 'debit' | '' = '';

  cardNumber = '';
  expiry = '';
  cvv = '';


  vaildCard = [
    {
      number : '9989998999899989', expiry : '12/26', cvv : '125'
    },
    {
      number : '5555222299996666', expiry : '11/26', cvv : '654'
    }
  ];

  constructor(private router: Router){
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    if(state){
      this.items = state.items;
      this.totalAmount = state.total;
      this.address = state.address;
    }
  }

  continueToPayment(){
    this.step = 'methods';
  }
  selectMethod(type : any){
    this.paymentType = type;
    this.step = type ==='upi' ? 'success' : 'card';
  }
  payNow(){
    const isvalid = this.vaildCard.some(
      c => 
        c.number === this.cardNumber &&
        c.expiry === this.expiry &&
        c.cvv === this.cvv
    );

    if(isvalid){
      this.step = 'success';
    } else {
      alert ('Invalid Card Details...')
    }
  }
}
