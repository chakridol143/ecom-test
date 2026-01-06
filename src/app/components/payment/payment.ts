import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import {CartItem,Address} from '../../../app/components/invoice'

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
    const state = nav?.extras?.state as {
      items:CartItem[];
      total:number;
      address:Address;
    }

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

  downloadInvoice(): void {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('INVOICE', 105, 15, { align: 'center' });

  doc.setFontSize(11);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Invoice No: INV-${Date.now()}`, 14, 38);

  doc.line(14, 42, 196, 42);

  // Address
  doc.text('Billing Address:', 14, 52);
  doc.text(
    `${this.address.firstName} ${this.address.lastName}
${this.address.street}
${this.address.city}, ${this.address.state} - ${this.address.postal}`,
    14,
    60
  );

  // Items
  let yPosition = 95;
  doc.text('Items:', 14, yPosition);
  yPosition += 8;

  this.items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} - ₹${item.price}`,
      14,
      yPosition
    );
    yPosition += 8;
  });

  doc.line(14, yPosition + 2, 196, yPosition + 2);

  // Total
  doc.setFontSize(14);
  doc.text(`Total Paid: ₹${this.totalAmount}`, 14, yPosition + 14);

  doc.setFontSize(10);
  doc.text(
    'Thank you for your purchase!',
    105,
    285,
    { align: 'center' }
  );

  doc.save(`Invoice_${Date.now()}.pdf`);
}

}
