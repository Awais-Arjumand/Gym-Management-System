// Complete test data utility
export const testCards = {
  success: {
    number: '4242424242424242',
    details: {
      cvc: '123',
      exp: '12/34',
      zip: '12345',
      description: 'Successful payment (Visa)'
    }
  },
  requiresAction: {
    number: '4000002500003155',
    details: {
      cvc: '123',
      exp: '12/34',
      zip: '12345',
      description: 'Requires authentication'
    }
  },
  decline: {
    number: '4000000000000002',
    details: {
      cvc: '123',
      exp: '12/34',
      zip: '12345',
      description: 'Always declines'
    }
  },
  threeDSecure: {
    number: '4000000000003220',
    details: {
      cvc: '123',
      exp: '12/34',
      zip: '12345',
      description: 'Triggers 3D Secure'
    }
  },
  mastercard: {
    number: '5555555555554444',
    details: {
      cvc: '123',
      exp: '12/34',
      zip: '12345',
      description: 'Mastercard success'
    }
  },
  amex: {
    number: '378282246310005',
    details: {
      cvc: '1234', 
      exp: '12/34',
      zip: '12345',
      description: 'American Express'
    }
  }
};

export const testCustomers = {
  standard: {
    name: 'Test User',
    email: 'test.user@example.com',
    phone: '+15551234567',
    address: {
      line1: '123 Test Street',
      city: 'Testville',
      state: 'TS',
      postal_code: '12345',
      country: 'US'
    },
    membership: 'standard',
    price: '$19.99/month'
  },
  premium: {
    name: 'Premium User',
    email: 'premium.user@example.com',
    phone: '+15557654321',
    address: {
      line1: '456 Premium Avenue',
      city: 'Testington',
      state: 'TP',
      postal_code: '54321',
      country: 'US'
    },
    membership: 'premium',
    price: '$29.99/month'
  },
  international: {
    name: 'Global Customer',
    email: 'global.customer@example.com',
    phone: '+441234567890',
    address: {
      line1: '789 International Blvd',
      city: 'London',
      postal_code: 'SW1A 1AA',
      country: 'GB'
    },
    membership: 'premium',
    price: '£24.99/month'
  }
};

export const testProducts = {
  standard: {
    id: 'prod_standard',
    name: 'Standard Membership',
    description: 'Basic access with limited features',
    price: 1999,
    currency: 'usd',
    interval: 'month',
    features: [
      'Basic workout tracking',
      'Email support',
      'Standard meal plans'
    ]
  },
  premium: {
    id: 'prod_premium',
    name: 'Premium Membership',
    description: 'Full access with all features',
    price: 2999,
    currency: 'usd',
    interval: 'month',
    features: [
      'Advanced analytics',
      '24/7 support',
      'Personalized coaching',
      'Premium meal plans'
    ]
  }
};

export const generateMockClientSecret = (membershipType: string = 'standard') => {
  const product = testProducts[membershipType as keyof typeof testProducts] || testProducts.standard;
  const mockId = `mock_${Math.random().toString(36).substring(2, 10)}`;
  const mockSecret = Math.random().toString(36).substring(2, 10);
  
  return {
    clientSecret: `pi_${mockId}_secret_${mockSecret}`,
    paymentDetails: {
      amount: product.price,
      currency: product.currency,
      product: product.name
    }
  };
};

export const getTestCustomer = (type: keyof typeof testCustomers = 'standard') => {
  return testCustomers[type] || testCustomers.standard;
};

export const getTestCard = (type: keyof typeof testCards = 'success') => {
  return testCards[type] || testCards.success;
};