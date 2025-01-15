// src/config.js
const config = {

  API_BASE_URL: 'https://cmvp-api-v1.onrender.com',
  // API_BASE_URL: 'http://127.0.0.1:9090',

  WEB_PAGE_BASE_URL: 'https://new-cmvp-site.vercel.app/verification',
  // WEB_PAGE_BASE_URL: 'http://localhost:3000/verification',
  
  };

export default config;


//GETTING A USER SUBSCRIPTION DETAIL: http://127.0.0.1:9090/api/subscription/auth/api/user-subscription/896dfd14-e1c2-4383-aa15-423de602b04d/


// SUBSCRIPTION ENDPOINT: http://127.0.0.1:9090/api/subscription/auth/api/user-subscriptions/
// {
//   "user":"896dfd14-e1c2-4383-aa15-423de602b04d",
//   "subscription_plan": "582d7a35-8c00-486f-b966-e0801def8990",
//   "transaction_id": "<your_transaction_id>"
// }