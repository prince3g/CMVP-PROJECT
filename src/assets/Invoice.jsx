import React, { useEffect } from 'react';
import './Invoice.css'; 

import InvoiceLogo from './Img/invoice-logo.png';


const Invoice  = () => {
  return (
    <div className='invoice-Envn'>
        <div className='top-invoice'>
            <img src={InvoiceLogo}></img>
            <h2>Invoice</h2>
        </div>
        <div className='sss-Suab-si'>
        <div className='sss-Suab-si-1'>
            <ul>
            <li>PROLIANCE LTD</li>
            <li>5 Owule OJuan Street, off Peter Odili Road, Trans Amadi
            Port Harcourt, Rivers State.</li>
            <li>NG.</li>
            <li>TIN: 20657895-0001</li>
            </ul>
            <div className='dd-fls-ul'>
                <ul>
                    <h3>Sold To</h3>
                    <li>Company Name</li>
                    <li>Company Address</li>
                    <li>Country</li>
                </ul>
                <ul>
                    <h3>Bill To</h3>
                    <li>Company Name</li>
                    <li>Company Address</li>
                    <li>Country</li>
                </ul>
            </div>
        </div>
        <div className='sss-Suab-si-2'>
            <h2>Invoice Summary</h2>
            <ul>
                <li></li>
                <li>Billing Profile <span>Company Name</span></li>
                <li>Invoice Number <span>G075888949</span></li>
                <li>Invoice Date In UTC <span>03/02/2025</span></li>
            </ul>
            <h3>Total Ammount <span>NGN 4,000</span></h3>
        </div>
        </div>
        <div className='yatysh-ssec'>
            <h2>This invoice is for the billing period 02/02/2025 - 02/02/2025 </h2>
            <p>This bill contains the charges for your purchases and services consumed from CMVP.</p>
        </div>
        <div className='ggauy-sec'>
            <h2> Billing Summary</h2>
            <ul>
                <li>Charges <span> 30.00</span></li>
                <li> Credits <span>0.00</span></li>
                <li> Subtotal <span>30.00</span></li>
                <li>VAT (7.50%) <span>2.25</span></li>
                <li> Total (including Tax)  <span>NGN 32.25</span></li>
            </ul>
        </div>
    </div>
  );
};

export default Invoice;

