# New Features Documentation

This document describes the new features added to the Pour Decisions Wine E-commerce Platform.

## Table of Contents

1. [Product Reviews System](#product-reviews-system)
2. [User Profile Management](#user-profile-management)
3. [Enhanced Checkout Flow](#enhanced-checkout-flow)
4. [Setup Instructions](#setup-instructions)

---

## Product Reviews System

### Overview

Customers can now leave detailed reviews for wines they've purchased, including:
- Star ratings (1-5 stars)
- Review heading and comments
- Photo uploads (up to 2 images)
- Detailed tasting notes
- Food pairing recommendations

### Features

#### 1. Writing a Review

On any product page, logged-in users can:
- Click the "Add Review" button below the product details
- Rate the wine with a star rating
- Write a heading and detailed comment
- Upload up to 2 photos
- Add optional tasting notes covering:
  - **Color**: Visual appearance
  - **Nose/Aroma**: Scent profile
  - **Mouthfeel**: Texture and body
  - **Acidity/Sugar Balance**: Sweetness and acidity
  - **Main Flavors**: Primary taste notes
  - **Tannic Structure**: Tannins (for red wines)
  - **Finish**: Aftertaste characteristics
- Add recommended food pairings

#### 2. Viewing Reviews

- All reviews appear on the product page below the product details
- Reviews display:
  - User name and avatar
  - Date posted
  - Star rating
  - Review heading and comment
  - Uploaded photos
  - Tasting notes (if provided)
  - Food pairings (if provided)
- Average rating and review count shown in the header

#### 3. Managing Reviews

Users can view all their reviews in their profile under the "My Reviews" tab.

### Usage Example

```
1. Navigate to any wine product page
2. Scroll down to the "Customer Reviews" section
3. Click "Add Review"
4. Fill in your rating and review
5. (Optional) Add tasting notes and pairings
6. (Optional) Upload photos
7. Click "Submit Review"
```

---

## User Profile Management

### Overview

Users now have a comprehensive profile page where they can manage their account, saved addresses, payment methods, and view their reviews.

### Accessing the Profile

1. Log in to your account
2. Click on your profile avatar in the top right corner of the navigation bar
3. Select "Profile Settings" from the dropdown menu

### Profile Features

#### 1. Shipping Addresses

**Location**: Profile → Shipping Addresses tab

- **Add New Address**: Click "Add Address" button
- **Required Information**:
  - Nickname (e.g., "Home", "Work")
  - Address Line 1
  - Address Line 2 (optional)
  - City
  - Province
  - Postal Code
  - Country (defaults to South Africa)
- **Edit Address**: Click the edit icon on any saved address
- **Delete Address**: Click the delete icon on any saved address

#### 2. Payment Methods

**Location**: Profile → Payment Methods tab

- **Add New Payment Method**: Click "Add Payment Method" button
- **Required Information**:
  - Nickname (e.g., "Personal Card", "Business Card")
  - Card Number
  - Cardholder Name
  - Expiry Date (MM/YY format)
  - Card Type (optional, e.g., Visa, Mastercard)
- **Edit Payment Method**: Click the edit icon on any saved payment method
- **Delete Payment Method**: Click the delete icon on any saved payment method

**Security Note**: Card information is stored for convenience. In a production environment, this would use tokenized payment processing.

#### 3. My Reviews

**Location**: Profile → My Reviews tab

- View all reviews you've written
- Reviews are sorted by most recent first
- Full review details are displayed including tasting notes and pairings

#### 4. Account Settings

**Location**: Profile → Settings tab

- **Logout**: Sign out of your account

---

## Enhanced Checkout Flow

### Overview

The checkout process now supports using saved addresses and payment methods, making repeat purchases faster and more convenient.

### Checkout Features

#### 1. Order Summary

At the top of the checkout page, you'll see:
- All items in your cart with quantities
- Individual item prices
- Total order amount

#### 2. Shipping Address Selection

**Saved Addresses**:
- All your saved addresses are displayed as cards
- Select your preferred address by clicking the radio button
- Each address shows its nickname and full details

**New Address**:
- Select "Use a new address" option
- Fill in the address form
- **Option to Save**: Check "Save this address for future orders"
- If saving, provide a nickname for the address

#### 3. Payment Method Selection

**Saved Payment Methods**:
- All your saved payment methods are displayed as cards
- Card numbers are masked for security (showing only last 4 digits)
- Select your preferred payment method by clicking the radio button

**New Payment Method**:
- Select "Use a new card" option
- Fill in card details:
  - Cardholder Name
  - Card Number
  - Expiry Date
  - CVV
- **Option to Save**: Check "Save this card for future purchases"
- If saving, provide a nickname for the card

#### 4. Complete Purchase

- Review your order summary, address, and payment method
- Click the "Pay R[amount]" button to complete your purchase
- Success message will appear confirming your order

### Checkout Flow Example

```
1. Add items to cart
2. Click "Proceed to Checkout" from cart page
3. Review order summary
4. Select or enter shipping address
5. Select or enter payment method
6. Click "Pay" button
7. Order complete!
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd e-wine-server
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Environment variables**:
   Ensure your `.env` file contains:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5050
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd e-wine
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser to `http://localhost:3000`

### Database Setup

The MongoDB collections will be created automatically when you first use the features. No manual setup required!

For detailed MongoDB schema information, see [MONGODB_SETUP.md](./MONGODB_SETUP.md).

---

## Styling

All new features follow the existing design system:

- **Colors**:
  - Primary: `#900639` (Burgundy)
  - Background: `#FFFEFC` (Cream)
  - Text: `#1c1c1c` (Dark Gray)
  - Accent: `#fce7ec` (Light Pink)

- **Fonts**:
  - Headings: "Playfair Display", serif
  - Body: "Montserrat", sans-serif

- **Components**:
  - Rounded corners (border-radius: 12px for cards, 999px for buttons)
  - Consistent spacing and padding
  - Smooth transitions and hover effects
  - Responsive design for mobile and desktop

---

## Testing the Features

### Testing Reviews

1. **Create a review**:
   - Log in to the application
   - Navigate to any product page
   - Click "Add Review"
   - Fill in all required fields
   - Optionally add tasting notes and photos
   - Submit the review
   - Verify it appears on the product page

2. **View your reviews**:
   - Click your profile avatar
   - Select "Profile Settings"
   - Go to "My Reviews" tab
   - Verify your review appears

### Testing Profile Management

1. **Add a shipping address**:
   - Go to Profile → Shipping Addresses
   - Click "Add Address"
   - Fill in the form with test data
   - Submit
   - Verify the address appears in your saved addresses

2. **Add a payment method**:
   - Go to Profile → Payment Methods
   - Click "Add Payment Method"
   - Fill in test card details (use dummy data)
   - Submit
   - Verify the payment method appears (with masked card number)

3. **Edit and delete**:
   - Test the edit functionality for both addresses and payment methods
   - Test the delete functionality
   - Confirm changes are saved

### Testing Enhanced Checkout

1. **With saved data**:
   - Add items to cart
   - Proceed to checkout
   - Select a saved address
   - Select a saved payment method
   - Complete the checkout

2. **With new data**:
   - Proceed to checkout
   - Select "Use a new address"
   - Fill in address details
   - Check "Save for future orders"
   - Provide a nickname
   - Select "Use a new card"
   - Fill in card details
   - Check "Save for future purchases"
   - Provide a nickname
   - Complete the checkout
   - Verify the new address and payment method are saved in your profile

---

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Known Limitations

1. **Image Storage**: Currently uses base64 encoding. For production, implement cloud storage (AWS S3, Cloudinary, etc.)

2. **Payment Security**: Current implementation stores card details locally. For production, integrate with a payment gateway like Stripe or PayPal.

3. **Review Editing**: Users cannot currently edit or delete their reviews after submission. This can be added as a future enhancement.

4. **Review Moderation**: No moderation system is in place. Consider adding admin review approval for production.

---

## Support

For issues or questions:
1. Check the [MONGODB_SETUP.md](./MONGODB_SETUP.md) for database-related questions
2. Review the main [README.md](./README.md) for general setup
3. Check the browser console for error messages

---

## Future Enhancements

Potential improvements:
- Review editing and deletion by users
- Review voting (helpful/not helpful)
- Admin review moderation
- Email notifications for new reviews
- Review verification (verified purchase badge)
- Multiple profile photos
- Address validation with postal service APIs
- Payment gateway integration (Stripe, PayPal)
- Order history tracking
- Wishlist functionality enhancements
