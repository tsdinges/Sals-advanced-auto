/** Small display formatters shared across components. */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const int = new Intl.NumberFormat("en-US");

export const formatPrice = (amount: number): string => usd.format(amount);
export const formatMiles = (miles: number): string => int.format(miles);

/** "486 Center St, Wolfeboro, NH 03894" */
export const formatAddressLine = (a: {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}): string => `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
