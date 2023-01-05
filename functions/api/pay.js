/***

/pay?mode=subscription
    &cancel=https%3A%2F%2Fsupport.mcchr.org%2F
    &success=https%3A%2F%2Fsupport.mcchr.org%2Fthankyou%2F
    &currency=myr
    &email=joe@bloggs.com
    &products=1|semiannualdonationtomcchr_4_6month_10000
    &items=2|MCCHR XII Stickers|12.12
    &items=1|Delivery within Malaysia|1.50

***/

const Stripe = require("stripe");

const stripe = Stripe(STRIPE_API_KEY, {
  httpClient: Stripe.createFetchHttpClient()
});

export default {
  async fetch(request) {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      payment_method_types: [
        'card',
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    return Response.redirect(session.url)
  }
}