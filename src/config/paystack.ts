// Paystack Configuration
// Replace with your actual Paystack public key
// Public keys are safe to include in frontend code
export const PAYSTACK_PUBLIC_KEY = "pk_test_your_public_key_here";

// Currency for Edumed Trust (Kenyan Shillings)
export const PAYSTACK_CURRENCY = "KES";

// IMPORTANT: The secret key must NEVER be stored here.
// It should be added as a Supabase Edge Function secret named PAYSTACK_SECRET_KEY.
// See PAYSTACK-SETUP.md for instructions.
