# MongoDB Schema Updates Guide

This document explains the MongoDB schema updates made to support the new features in the Wine E-commerce application.

## Overview

The following collections have been updated or created:
1. **User Collection** - Enhanced with shipping addresses and payment methods
2. **Review Collection** - New collection for product reviews

## 1. User Schema Updates

The User model has been enhanced to store shipping addresses and payment methods.

### Updated User Schema

```javascript
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'South Africa' },
});

const paymentMethodSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardholderName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cardType: { type: String },
});

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  cardSequence: [String],
  role: { type: String, default: 'user' },
  shippingAddresses: [addressSchema],
  paymentMethods: [paymentMethodSchema],
  profilePhoto: { type: String },
});

module.exports = mongoose.model("User", userSchema);
```

### What Changed:
- **shippingAddresses**: Array of address objects with nickname support
- **paymentMethods**: Array of payment card objects with nickname support
- **profilePhoto**: Optional field for user profile picture (base64 or URL)

### Security Note:
⚠️ **IMPORTANT**: In a production environment, card numbers should NEVER be stored in plain text. You should:
- Use a payment gateway like Stripe, PayPal, or similar
- Store tokenized card references instead of actual card numbers
- Implement proper PCI compliance measures

## 2. Review Collection (New)

A new Review collection has been created to store product reviews with detailed tasting notes.

### Review Schema

```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  heading: {
    type: String,
    required: true,
    maxlength: 100,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  photos: {
    type: [String],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'],
  },
  tastingNotes: {
    color: { type: String, maxlength: 100 },
    nose: { type: String, maxlength: 150 },
    mouthfeel: { type: String, maxlength: 150 },
    aciditySugar: { type: String, maxlength: 100 },
    flavors: { type: String, maxlength: 200 },
    tannins: { type: String, maxlength: 100 },
    finish: { type: String, maxlength: 150 },
  },
  pairings: {
    type: String,
    maxlength: 300,
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model('Review', reviewSchema);
```

### Review Fields:
- **productId**: Reference to the wine product being reviewed
- **userId**: Reference to the user who wrote the review
- **userName**: User's display name (cached for performance)
- **rating**: Star rating from 1 to 5
- **heading**: Short title for the review (max 100 chars)
- **comment**: Main review text (max 1000 chars)
- **photos**: Up to 2 images (base64 encoded or URLs)
- **tastingNotes**: Object containing detailed wine tasting notes:
  - color: Visual appearance
  - nose: Aroma/bouquet
  - mouthfeel: Texture and body
  - aciditySugar: Balance characteristics
  - flavors: Primary flavor notes
  - tannins: Tannic structure (for red wines)
  - finish: Aftertaste description
- **pairings**: Food pairing suggestions (max 300 chars)
- **timestamps**: Auto-generated createdAt and updatedAt fields

## MongoDB Setup Instructions

### No Action Required for Existing Database

The schema updates are **backward compatible**. Existing user documents will continue to work without modification. The new fields will simply be empty arrays/null for existing users.

### For New Deployments

1. Ensure your `.env` file in `e-wine-server/` contains your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5050
   ```

2. The models will automatically create the collections when first used.

3. No manual collection creation is needed - Mongoose handles this automatically.

### Indexes (Optional but Recommended)

For better performance, you may want to add indexes:

```javascript
// In MongoDB shell or Compass
db.reviews.createIndex({ productId: 1, createdAt: -1 });
db.reviews.createIndex({ userId: 1, createdAt: -1 });
```

## API Endpoints

### User Profile Endpoints

- `GET /api/user-profile/:userId` - Get user profile
- `PUT /api/user-profile/:userId` - Update basic profile info
- `POST /api/user-profile/:userId/addresses` - Add shipping address
- `PUT /api/user-profile/:userId/addresses/:addressId` - Update address
- `DELETE /api/user-profile/:userId/addresses/:addressId` - Delete address
- `POST /api/user-profile/:userId/payment-methods` - Add payment method
- `PUT /api/user-profile/:userId/payment-methods/:methodId` - Update payment method
- `DELETE /api/user-profile/:userId/payment-methods/:methodId` - Delete payment method

### Review Endpoints

- `GET /api/reviews/product/:productId` - Get all reviews for a product
- `GET /api/reviews/user/:userId` - Get all reviews by a user
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## Testing

You can test the new schema using MongoDB Compass or the MongoDB shell:

1. **Create a test review:**
```javascript
{
  "productId": ObjectId("your-product-id"),
  "userId": ObjectId("your-user-id"),
  "userName": "Test User",
  "rating": 5,
  "heading": "Excellent Wine!",
  "comment": "This wine exceeded my expectations.",
  "photos": [],
  "tastingNotes": {
    "color": "Deep ruby red",
    "nose": "Cherry, vanilla, oak",
    "flavors": "Blackberry, plum, spice"
  },
  "pairings": "Grilled steak, aged cheeses"
}
```

2. **Add a shipping address to a user:**
```javascript
db.users.updateOne(
  { _id: ObjectId("your-user-id") },
  {
    $push: {
      shippingAddresses: {
        nickname: "Home",
        addressLine1: "123 Main St",
        city: "Cape Town",
        province: "Western Cape",
        postalCode: "8001",
        country: "South Africa"
      }
    }
  }
);
```

## Migration Notes

- **Backward Compatible**: Existing users will have empty arrays for `shippingAddresses` and `paymentMethods`
- **No Data Loss**: No existing data will be affected
- **Automatic Schema Validation**: Mongoose will validate new documents according to the schema

## Security Considerations

1. **Payment Information**: 
   - Current implementation stores card numbers (for demo purposes)
   - **Must be replaced with tokenization in production**
   - Consider integrating Stripe, PayPal, or similar payment gateway

2. **Image Storage**:
   - Currently supports base64 encoding
   - For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
   - Implement image size limits and validation

3. **User Data**:
   - Ensure proper authentication middleware
   - Implement role-based access control
   - Validate user ownership of addresses/payment methods before allowing modifications

## Troubleshooting

### Issue: "Cannot read property 'shippingAddresses' of null"
**Solution**: Ensure the user is logged in and the user object is properly loaded from context.

### Issue: "Review not saving to database"
**Solution**: Check that all required fields (productId, userId, userName, rating, heading, comment) are provided.

### Issue: "Photo upload fails"
**Solution**: Increase the JSON body size limit in server.js (already set to 50mb in current implementation).

## Future Enhancements

Consider these improvements:
- Add review voting/helpful buttons
- Implement review moderation
- Add review verification (verified purchase)
- Create review response system for business owners
- Add image compression for uploaded photos
- Implement review analytics and insights
