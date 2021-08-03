export enum OrderStatus {
  // When an order has been created but the ticket a user is trying to purchase has not been reserved
  Created = 'created',

  // When the ticket a user is trying to purchase has already been reserved
  // when a user cancel an order
  // When an order expires before payment
  Cancelled = 'cancelled',

  // When the ticket a user is trying to purchase has been successfully reserved
  AwaitingPayment = 'awaiting:payment',

  // When a user successfully pay for a ticket that was reserved
  Complete = 'complete',
}
