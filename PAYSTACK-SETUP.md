# Paystack Integration Setup

## Overview
This guide explains how to integrate Paystack payment processing for the Edumed Trust donation page.

## Prerequisites
1. Create a Paystack account at [https://paystack.com](https://paystack.com)
2. Get your API keys from the Paystack Dashboard → Settings → API Keys & Webhooks

## Keys Required
- **Public Key**: Used on the frontend (starts with `pk_test_` or `pk_live_`)
- **Secret Key**: Used on the server-side only (starts with `sk_test_` or `sk_live_`)

## Setup Steps

### 1. Add Your Paystack Public Key
Update the file `src/config/paystack.ts` with your Paystack public key:
```typescript
export const PAYSTACK_PUBLIC_KEY = "pk_test_your_key_here";
```

### 2. Add Secret Key to Supabase Edge Function Secrets
The secret key should NEVER be stored in the frontend codebase.
Add it as a Supabase secret:
- Go to Supabase Dashboard → Settings → Edge Functions
- Add secret: `PAYSTACK_SECRET_KEY` = `sk_test_your_key_here`

### 3. Create Webhook (Optional)
To automatically verify payments:
1. In Paystack Dashboard → Settings → Webhooks
2. Add your webhook URL: `https://your-supabase-url/functions/v1/paystack-webhook`
3. Select events: `charge.success`

### 4. Testing
- Use test keys (`pk_test_...` / `sk_test_...`) during development
- Paystack provides test card numbers:
  - Card: `4084 0840 8408 4081`
  - Expiry: Any future date
  - CVV: `408`
  - PIN: `0000`
  - OTP: `123456`

### 5. Go Live
1. Complete business verification on Paystack
2. Switch to live keys (`pk_live_...` / `sk_live_...`)
3. Update the public key in `src/config/paystack.ts`
4. Update the secret key in Supabase Edge Function secrets

## Currency
Paystack supports NGN, GHS, ZAR, and KES.
For Edumed Trust, set currency to `KES` (Kenyan Shillings).
