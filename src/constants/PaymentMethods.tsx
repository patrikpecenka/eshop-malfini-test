import ApplePay from "../assets/apple-pay-svgrepo-com.svg"
import Bank from "../assets/bank-svgrepo-com.svg"
import Bitcoin from "../assets/bitcoin-svgrepo-com.svg"
import Cash from "../assets/cash-money-svgrepo-com.svg"
import GooglePay from "../assets/google-pay-svgrepo-com.svg"
import PayPal from "../assets/paypal-3-svgrepo-com.svg"
import Stripe from "../assets/stripe-svgrepo-com.svg"
import Visa from "../assets/visa-svgrepo-com.svg"

export const PaymentMethods = () => [
  {
    id: "1",
    name: "Visa",
    icon: Visa,
    fee: "free"
  },
  {
    id: "2",
    name: "PayPal",
    icon: PayPal,
    fee: "free"
  },
  {
    id: "3",
    name: "Google Pay",
    icon: GooglePay,
    fee: "free"
  },
  {
    id: "4",
    name: "Apple Pay",
    icon: ApplePay,
    fee: "free"
  },
  {
    id: "5",
    name: "Bank Transfer",
    icon: Bank,
    fee: "free"
  },
  {
    id: "6",
    name: "Cash",
    icon: Cash,
    fee: "free"
  },
  {
    id: "7",
    name: "Bitcoin",
    icon: Bitcoin,
    fee: "free"
  },
  {
    id: "8",
    name: "Stripe",
    icon: Stripe,
    fee: "1.99 $"
  }


]