const fb_profile = import.meta.env.VITE_COMPANY_FACEBOOK_PROFILE
const insta_profile = import.meta.env.VITE_COMPANY_INSTAGRAM_PROFILE

export const config = {
  OPERATOR_NUMBER: import.meta.env.VITE_WHATSAPP_OPERATOR_PHONE_NUMBER,
  OPERATOR_EMAIL: import.meta.env.VITE_COMPANY_EMAIL,
  SITE_URL: import.meta.env.VITE_COMPANY_SITE_URL,
  FACEBOOK_PROFILE: fb_profile,
  FACEBOOK_URL: `https://facebook.com/${fb_profile}`,
  INSTAGRAM_PROFILE: insta_profile,
  INSTAGRAM_URL: `https://instagram.com/${insta_profile}`,
}