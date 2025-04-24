# Spam Users Intelligence - Multi-Provider Email Validation Service

This repository contains the demo applications for Spam Users Intelligence, a multi-provider email validation service designed to help Shopify merchants detect and prevent fraudulent accounts.

## 🌐 Live Demo

Visit our [live demo](https://securification.github.io/email-lookup-demo/) to explore the Spam Users Intelligence service.

## 📋 Overview

Spam Users Intelligence is a comprehensive email validation service that:

- Validates email addresses through multiple providers with a single API call
- Provides a simple risk scoring system (X, XX, XXX) with detailed explanations
- Integrates seamlessly with Shopify stores through the Shopify API
- Offers a flexible pay-per-lookup pricing model through Shopify Billing

## 🚀 Demo Applications

This repository includes several interactive demos:

1. **Email Lookup Tool** - A simple interface to validate email addresses across multiple providers
2. **Merchant Dashboard** - A mockup of the merchant dashboard with email validation statistics
3. **Email Security Rules** - A demonstration of how merchants can configure email security rules

## 🔌 Supported Providers

Spam Users Intelligence integrates with the following email validation providers:

- **Abstract API** - Syntax & Disposable Email Detection
- **Kickbox** - Mailbox Verification & Deliverability Scoring
- **Verifalia** - Catch-all Detection & International Emails
- **ZeroBounce** - Spam Trap Detection & Abuse Email Detection
- **Melissa Email** - International Support & Typo Detection

## 🛠️ Technical Details

The demo applications are built with:

- HTML5, CSS3, and JavaScript
- No external dependencies or frameworks for simplicity
- Responsive design that works on mobile and desktop

## 📊 Provider Comparison

For a detailed comparison of the different email validation providers, see our [Provider Comparison](email-provider-comparison.html) page.

## 📚 API Documentation

For information about the API endpoints for each provider, see our [API Documentation](provider-api-endpoints.html) page.

## 🔧 Development & Deployment

### Local Development

To run this demo locally:

1. Clone this repository:
   ```
   git clone https://github.com/securification/email-lookup-demo.git
   ```

2. Navigate to the project directory:
   ```
   cd email-lookup-demo
   ```

3. Open the index.html file in your browser:
   ```
   open index.html
   ```

Alternatively, use the included script to start a local server:
```
./test-locally.sh
```

### Deployment

This repository includes helper scripts for GitHub Pages deployment:

- `deploy.sh` - Initial setup and deployment to GitHub Pages
- `update-github-pages.sh` - Optimized script to update both master and gh-pages branches
- `push-to-github.sh` - Push updates to GitHub after making changes (legacy)
- `test-locally.sh` - Test the site locally before deployment

For detailed deployment instructions, see [HOSTING.md](HOSTING.md).

For the optimized workflow with minimal operator input, see [UPDATE-INSTRUCTIONS.md](UPDATE-INSTRUCTIONS.md).

## 📝 License

This demo is provided for educational purposes only. The code is available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
