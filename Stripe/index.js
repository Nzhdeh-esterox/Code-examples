const Stripe = require('stripe');
const stripeSecretKey = process.env.SECRET;

const stripe = new Stripe(stripeSecretKey);

const createSubscription = async (req, res, next) => {
  const {generatedMetadata, decreasingAmount, annualOrMonthly: {interval}} = req.body;

  // Create a Customer in Stripe
  const customer = await stripe.customers.create(req.body.customerData);

  // Create an Invoice Item
  await stripe.invoiceItems.create({
    customer: customer.id,
    amount: decreasingAmount,
    currency: 'usd'
  });

  // Create a Product
  const product = await stripe.products.create({
    name,
    metadata: generatedMetadata
  });

  // Create a Price
  const price = await stripe.prices.create({
    unit_amount: req.body.unit_amount,
    currency: 'usd',
    recurring: {interval},
    product: product.id
  });

  const subscriptionProperties = {
    customer: customer.id,
    items: [
      {price: price.id},
    ],
  };

  // Create a subscription
  let {id: subscriptionId} = await stripe.subscriptions.create(subscriptionProperties);
}

