export const currencyFormatter = Intl.NumberFormat(
  navigator.language,
  {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }
)
