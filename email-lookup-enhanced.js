/**
 * Enhanced Email Lookup Demo
 * Provides realistic email validation with simulated API responses
 */

// Sample email database with pre-defined results
const emailDatabase = {
    // High trust emails
    "john.doe@gmail.com": {
        risk_score: 10,
        email_type: "personal",
        deliverable: true,
        disposable: false,
        domain_age: "18 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: false,
        category: "valid"
    },
    "sarah.johnson@company.com": {
        risk_score: 5,
        email_type: "corporate",
        deliverable: true,
        disposable: false,
        domain_age: "12 years",
        mx_records: true,
        free_provider: false,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: false,
        category: "valid"
    },
    "michael.williams@outlook.com": {
        risk_score: 15,
        email_type: "personal",
        deliverable: true,
        disposable: false,
        domain_age: "20 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 1,
        suspicious_patterns: false,
        category: "valid"
    },
    
    // Medium trust emails
    "admin@newdomain.com": {
        risk_score: 45,
        email_type: "role",
        deliverable: true,
        disposable: false,
        domain_age: "6 months",
        mx_records: true,
        free_provider: false,
        role_account: true,
        breach_count: 0,
        suspicious_patterns: true,
        category: "suspicious"
    },
    "info@smallbusiness.net": {
        risk_score: 40,
        email_type: "role",
        deliverable: true,
        disposable: false,
        domain_age: "2 years",
        mx_records: true,
        free_provider: false,
        role_account: true,
        breach_count: 0,
        suspicious_patterns: false,
        category: "suspicious"
    },
    "user123@gmail.com": {
        risk_score: 55,
        email_type: "personal",
        deliverable: true,
        disposable: false,
        domain_age: "18 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 3,
        suspicious_patterns: true,
        category: "suspicious"
    },
    
    // Low trust emails
    "john.doe@tempmail.org": {
        risk_score: 90,
        email_type: "disposable",
        deliverable: true,
        disposable: true,
        domain_age: "5 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: true,
        category: "disposable"
    },
    "test@mailinator.com": {
        risk_score: 95,
        email_type: "disposable",
        deliverable: true,
        disposable: true,
        domain_age: "15 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: true,
        category: "disposable"
    },
    "throwaway@yopmail.com": {
        risk_score: 95,
        email_type: "disposable",
        deliverable: true,
        disposable: true,
        domain_age: "12 years",
        mx_records: true,
        free_provider: true,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: true,
        category: "disposable"
    }
};

// Common disposable email domains
const disposableDomains = [
    "tempmail.org", "mailinator.com", "guerrillamail.com", "yopmail.com", 
    "10minutemail.com", "throwawaymail.com", "trashmail.com", "sharklasers.com",
    "getairmail.com", "mailnesia.com", "temp-mail.org", "fakeinbox.com",
    "tempinbox.com", "emailondeck.com", "dispostable.com", "mailcatch.com"
];

// Common role-based email prefixes
const roleBasedPrefixes = [
    "admin", "info", "support", "contact", "help", "sales", "billing",
    "webmaster", "hostmaster", "postmaster", "abuse", "noreply", "no-reply",
    "service", "customerservice", "marketing", "team", "hello", "office"
];

// Common free email providers
const freeEmailProviders = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
    "icloud.com", "mail.com", "zoho.com", "protonmail.com", "gmx.com",
    "yandex.com", "tutanota.com"
];

// Initialize the email lookup demo
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const emailInput = document.getElementById('email');
    const validateBtn = document.getElementById('validateBtn');
    const resultCard = document.getElementById('resultCard');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const apiResponseToggle = document.getElementById('apiResponseToggle');
    const apiResponsePanel = document.getElementById('apiResponsePanel');
    const apiResponseJson = document.getElementById('apiResponseJson');
    
    // Event listeners
    validateBtn.addEventListener('click', validateEmail);
    
    // Email validation on Enter key
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateEmail();
        }
    });
    
    // Toggle API response panel
    if (apiResponseToggle) {
        apiResponseToggle.addEventListener('click', function() {
            apiResponsePanel.classList.toggle('expanded');
            
            if (apiResponsePanel.classList.contains('expanded')) {
                apiResponseToggle.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Technical Details';
            } else {
                apiResponseToggle.innerHTML = '<i class="fas fa-chevron-down"></i> Show Technical Details';
            }
        });
    }
    
    // Check URL parameters for demo purposes
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const typeParam = urlParams.get('type');
    
    if (emailParam) {
        emailInput.value = emailParam;
        
        if (typeParam === 'valid') {
            showValidResult();
        } else if (typeParam === 'suspicious') {
            showSuspiciousResult();
        } else if (typeParam === 'disposable') {
            showDisposableResult();
        } else {
            validateEmail();
        }
    }
});

// Main email validation function
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const resultCard = document.getElementById('resultCard');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!email) {
        alert('Please enter an email address');
        return;
    }
    
    // Show loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
    }
    if (resultCard) {
        resultCard.style.display = 'none';
    }
    
    // Simulate API call with delay
    setTimeout(() => {
        processEmailValidation(email);
    }, 1500);
}

// Process email validation and display results
function processEmailValidation(email) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultCard = document.getElementById('resultCard');
    
    // Check if email is in our database
    let result = emailDatabase[email];
    
    // If not in database, generate a result based on patterns
    if (!result) {
        result = generateEmailResult(email);
    }
    
    // Update API response panel
    updateApiResponsePanel(result, email);
    
    // Display appropriate result based on category
    if (result.category === 'valid') {
        showValidResult(email, result);
    } else if (result.category === 'suspicious') {
        showSuspiciousResult(email, result);
    } else if (result.category === 'disposable') {
        showDisposableResult(email, result);
    }
    
    // Hide loading indicator and show result
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    if (resultCard) {
        resultCard.style.display = 'block';
    }
}

// Generate result for emails not in the database
function generateEmailResult(email) {
    // Extract domain from email
    const domain = email.split('@')[1];
    const localPart = email.split('@')[0];
    
    // Check if it's a disposable email
    if (disposableDomains.some(d => domain.includes(d))) {
        return {
            risk_score: 90 + Math.floor(Math.random() * 10),
            email_type: "disposable",
            deliverable: true,
            disposable: true,
            domain_age: Math.floor(Math.random() * 10) + " years",
            mx_records: true,
            free_provider: true,
            role_account: false,
            breach_count: 0,
            suspicious_patterns: true,
            category: "disposable"
        };
    }
    
    // Check if it's a role-based email
    if (roleBasedPrefixes.some(prefix => localPart.includes(prefix))) {
        return {
            risk_score: 40 + Math.floor(Math.random() * 20),
            email_type: "role",
            deliverable: true,
            disposable: false,
            domain_age: Math.floor(Math.random() * 5) + " years",
            mx_records: true,
            free_provider: false,
            role_account: true,
            breach_count: 0,
            suspicious_patterns: Math.random() > 0.5,
            category: "suspicious"
        };
    }
    
    // Check if it's from a free provider
    if (freeEmailProviders.some(provider => domain.includes(provider))) {
        // Check for suspicious patterns in local part (numbers, random strings)
        const hasNumbers = /\d/.test(localPart);
        const hasRandomPattern = /^[a-z0-9]{8,}$/i.test(localPart);
        
        if (hasNumbers && hasRandomPattern) {
            return {
                risk_score: 50 + Math.floor(Math.random() * 20),
                email_type: "personal",
                deliverable: true,
                disposable: false,
                domain_age: "15+ years",
                mx_records: true,
                free_provider: true,
                role_account: false,
                breach_count: Math.floor(Math.random() * 3),
                suspicious_patterns: true,
                category: "suspicious"
            };
        } else {
            return {
                risk_score: 10 + Math.floor(Math.random() * 15),
                email_type: "personal",
                deliverable: true,
                disposable: false,
                domain_age: "15+ years",
                mx_records: true,
                free_provider: true,
                role_account: false,
                breach_count: Math.floor(Math.random() * 2),
                suspicious_patterns: false,
                category: "valid"
            };
        }
    }
    
    // Default to a corporate email with good standing
    return {
        risk_score: 5 + Math.floor(Math.random() * 10),
        email_type: "corporate",
        deliverable: true,
        disposable: false,
        domain_age: Math.floor(Math.random() * 10 + 5) + " years",
        mx_records: true,
        free_provider: false,
        role_account: false,
        breach_count: 0,
        suspicious_patterns: false,
        category: "valid"
    };
}

// Update API response panel with JSON data
function updateApiResponsePanel(result, email) {
    const apiResponseJson = document.getElementById('apiResponseJson');
    if (!apiResponseJson) return;
    
    // Create full API response object
    const apiResponse = {
        email: email,
        is_valid_format: true,
        is_deliverable: result.deliverable,
        is_disposable: result.disposable,
        is_role_account: result.role_account,
        risk_score: result.risk_score,
        domain: {
            name: email.split('@')[1],
            age_days: result.domain_age.includes("years") 
                ? parseInt(result.domain_age) * 365 
                : parseInt(result.domain_age) * 30,
            has_mx_records: result.mx_records,
            is_free_provider: result.free_provider
        },
        breach_data: {
            found_in_breach: result.breach_count > 0,
            breach_count: result.breach_count,
            last_breach_date: result.breach_count > 0 ? "2023-07-15" : null
        },
        analysis: {
            suspicious_patterns_detected: result.suspicious_patterns,
            recommendation: getRecommendation(result.category),
            category: result.category.toUpperCase(),
            processed_at: new Date().toISOString()
        }
    };
    
    // Format and display JSON
    apiResponseJson.textContent = JSON.stringify(apiResponse, null, 2);
    
    // Apply syntax highlighting if Prism.js is available
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(apiResponseJson);
    }
}

// Get recommendation based on category
function getRecommendation(category) {
    switch(category) {
        case 'valid':
            return "APPROVE";
        case 'suspicious':
            return "REVIEW";
        case 'disposable':
            return "BLOCK";
        default:
            return "REVIEW";
    }
}

// Show valid result with high trust
function showValidResult(email, result) {
    const resultEmail = document.getElementById('resultEmail');
    const trustBadge = document.getElementById('trustBadge');
    const businessImpact = document.getElementById('businessImpact');
    const businessImpactText = document.getElementById('businessImpactText');
    const emailType = document.getElementById('emailType');
    const resultDeliverable = document.getElementById('resultDeliverable');
    const resultDisposable = document.getElementById('resultDisposable');
    const resultDomainAge = document.getElementById('resultDomainAge');
    
    if (email && resultEmail) {
        resultEmail.textContent = email;
    }
    
    if (trustBadge) {
        trustBadge.innerHTML = '<i class="fas fa-shield-check"></i> High Trust';
        trustBadge.className = 'trust-badge trust-high';
    }
    
    if (businessImpact) {
        businessImpact.className = 'business-impact safe';
    }
    
    if (businessImpactText) {
        businessImpactText.innerHTML = 'This email is <strong>safe to accept</strong>. It has passed all security checks and is unlikely to be fraudulent.';
    }
    
    if (emailType) {
        emailType.textContent = result ? 
            (result.email_type === 'corporate' ? 'Corporate Email' : 'Personal Email') : 
            'Personal Email';
        emailType.className = 'detail-value success';
    }
    
    if (resultDeliverable) {
        resultDeliverable.textContent = 'Yes';
        resultDeliverable.className = 'detail-value success';
    }
    
    if (resultDisposable) {
        resultDisposable.textContent = 'No';
        resultDisposable.className = 'detail-value success';
    }
    
    if (resultDomainAge) {
        resultDomainAge.textContent = result ? result.domain_age : '8 years';
    }
    
    // Update action buttons
    updateActionButtons('valid');
}

// Show suspicious result with medium trust
function showSuspiciousResult(email, result) {
    const resultEmail = document.getElementById('resultEmail');
    const trustBadge = document.getElementById('trustBadge');
    const businessImpact = document.getElementById('businessImpact');
    const businessImpactText = document.getElementById('businessImpactText');
    const emailType = document.getElementById('emailType');
    const resultDeliverable = document.getElementById('resultDeliverable');
    const resultDisposable = document.getElementById('resultDisposable');
    const resultDomainAge = document.getElementById('resultDomainAge');
    
    if (email && resultEmail) {
        resultEmail.textContent = email;
    }
    
    if (trustBadge) {
        trustBadge.innerHTML = '<i class="fas fa-shield-exclamation"></i> Medium Trust';
        trustBadge.className = 'trust-badge trust-medium';
    }
    
    if (businessImpact) {
        businessImpact.className = 'business-impact warning';
    }
    
    if (businessImpactText) {
        businessImpactText.innerHTML = 'This email has <strong>some risk factors</strong>. Consider additional verification before accepting.';
    }
    
    if (emailType) {
        emailType.textContent = result && result.role_account ? 'Role Account' : 'Personal Email';
        emailType.className = 'detail-value warning';
    }
    
    if (resultDeliverable) {
        resultDeliverable.textContent = 'Yes';
        resultDeliverable.className = 'detail-value success';
    }
    
    if (resultDisposable) {
        resultDisposable.textContent = 'No';
        resultDisposable.className = 'detail-value success';
    }
    
    if (resultDomainAge) {
        resultDomainAge.textContent = result ? result.domain_age : '6 months';
    }
    
    // Update action buttons
    updateActionButtons('suspicious');
}

// Show disposable result with low trust
function showDisposableResult(email, result) {
    const resultEmail = document.getElementById('resultEmail');
    const trustBadge = document.getElementById('trustBadge');
    const businessImpact = document.getElementById('businessImpact');
    const businessImpactText = document.getElementById('businessImpactText');
    const emailType = document.getElementById('emailType');
    const resultDeliverable = document.getElementById('resultDeliverable');
    const resultDisposable = document.getElementById('resultDisposable');
    const resultDomainAge = document.getElementById('resultDomainAge');
    
    if (email && resultEmail) {
        resultEmail.textContent = email;
    }
    
    if (trustBadge) {
        trustBadge.innerHTML = '<i class="fas fa-shield-xmark"></i> Low Trust';
        trustBadge.className = 'trust-badge trust-low';
    }
    
    if (businessImpact) {
        businessImpact.className = 'business-impact danger';
    }
    
    if (businessImpactText) {
        businessImpactText.innerHTML = 'This is a <strong>temporary email address</strong> commonly used for fraud. We recommend blocking this signup.';
    }
    
    if (emailType) {
        emailType.textContent = 'Disposable Email';
        emailType.className = 'detail-value danger';
    }
    
    if (resultDeliverable) {
        resultDeliverable.textContent = 'Yes';
        resultDeliverable.className = 'detail-value success';
    }
    
    if (resultDisposable) {
        resultDisposable.textContent = 'Yes';
        resultDisposable.className = 'detail-value danger';
    }
    
    if (resultDomainAge) {
        resultDomainAge.textContent = result ? result.domain_age : '5 years';
    }
    
    // Update action buttons
    updateActionButtons('disposable');
}

// Update action buttons based on result type
function updateActionButtons(type) {
    const approveBtn = document.getElementById('approveBtn');
    const watchlistBtn = document.getElementById('watchlistBtn');
    const blockBtn = document.getElementById('blockBtn');
    const blockDomainBtn = document.getElementById('blockDomainBtn');
    
    if (!approveBtn || !watchlistBtn || !blockBtn || !blockDomainBtn) return;
    
    // Reset all buttons
    approveBtn.className = 'action-btn';
    watchlistBtn.className = 'action-btn';
    blockBtn.className = 'action-btn';
    blockDomainBtn.className = 'action-btn';
    
    // Set recommended action based on type
    switch(type) {
        case 'valid':
            approveBtn.className = 'action-btn recommended';
            break;
        case 'suspicious':
            watchlistBtn.className = 'action-btn recommended';
            break;
        case 'disposable':
            blockBtn.className = 'action-btn recommended';
            blockDomainBtn.className = 'action-btn secondary-recommended';
            break;
    }
}
