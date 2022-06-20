### Standard Summary component

##### Summary without href

```jsx padded
const realAmount: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

<Summary amount={realAmount} />
```

##### Summary with href for the Prices Breakdown

```jsx padded
const realAmount: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const pricesBreakdownLink = '/prices-breakdown-path/687954'

<Summary amount={realAmount} href={pricesBreakdownLink} />
```
