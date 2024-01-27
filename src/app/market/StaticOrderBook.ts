import { Order } from '../core/models/Order';
import { OrderBook } from '../core/models/OrderBook';

// Function to generate a random order:
function generateOrder(isBid: boolean): Order {
  const price = Math.floor(Math.random() * 10) + 95; // Random price between 95 and 104
  const amount = Math.floor(Math.random() * 20) + 1; // Random amount between 1 and 20
  const timestamp = new Date().toISOString();
  return { price, amount, timestamp };
}

// Generate 10 bids and 10 asks:
let bids =  [
    { price: 22.450, amount: 5, timestamp: "2024-01-27T22:15:00" },
{ price: 22.400, amount: 12, timestamp: "2024-01-27T22:08:00" },
{ price: 22.475, amount: 2, timestamp: "2024-01-27T22:20:00" },
{ price: 22.350, amount: 3, timestamp: "2024-01-27T21:50:00" },
{ price: 22.375, amount: 8, timestamp: "2024-01-27T21:45:00" }
  ];
let asks =  [
  { price: 22.550, amount: 7, timestamp: "2024-01-27T22:17:00" },
{ price: 22.600, amount: 6, timestamp: "2024-01-27T22:05:00" },
{ price: 22.525, amount: 4, timestamp: "2024-01-27T22:22:00" },
{ price: 22.650, amount: 2, timestamp: "2024-01-27T21:55:00" },
{ price: 22.625, amount: 1, timestamp: "2024-01-27T21:48:00" }
];

// Create the static order book:
export const staticOrderBook: OrderBook = {
  bids: bids,
  asks: asks,
};