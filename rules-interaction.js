// Rules page interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    // Protection level selection
    const protectionCards = document.querySelectorAll('.protection-card');
    const protectionLevelInput = document.getElementById('securityLevel');
    
    // Initialize protection level display
    updateProtectionLevel();
    
    // Handle protection card selection
    protectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            
            // Update active card
            protectionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update slider value
            if (protectionLevelInput) {
                switch(level) {
                    case 'basic':
                        protectionLevelInput.value = 1;
                        break;
                    case 'standard':
                        protectionLevelInput.value = 2;
                        break;
                    case 'premium':
                        protectionLevelInput.value = 3;
                        break;
                }
                
                // Trigger change event
                const event = new Event('change');
                protectionLevelInput.dispatchEvent(event);
            }
            
            // Update rules based on selected protection level
            updateRulesForProtectionLevel(level);
        });
    });
    
    // Handle protection level slider changes
    if (protectionLevelInput) {
        protectionLevelInput.addEventListener('change', function() {
            updateProtectionLevel();
        });
    }
    
    // Rule category filtering
    const ruleCategories = document.querySelectorAll('.rule-category');
    const ruleCards = document.querySelectorAll('.rule-card');
    
    ruleCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.getAttribute('data-category');
            
            // Update active category
            ruleCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide rules based on category
            if (categoryType === 'all') {
                ruleCards.forEach(card => card.style.display = 'block');
            } else {
                ruleCards.forEach(card => {
                    if (card.getAttribute('data-category') === categoryType) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Rule toggle switches
    const ruleToggles = document.querySelectorAll('.rule-toggle input');
    
    ruleToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const ruleCard = this.closest('.rule-card');
            const ruleId = ruleCard.getAttribute('data-rule-id');
            const isEnabled = this.checked;
            
            // Update rule status in UI
            updateRuleStatus(ruleId, isEnabled);
            
            // Show toast notification
            showToast(isEnabled ? 
                `Rule "${ruleCard.querySelector('.rule-title').textContent.trim()}" enabled` : 
                `Rule "${ruleCard.querySelector('.rule-title').textContent.trim()}" disabled`);
        });
    });
    
    // Function to update protection level display
    function updateProtectionLevel() {
        if (!protectionLevelInput) return;
        
        const value = parseInt(protectionLevelInput.value);
        const levelValueElement = document.querySelector('.security-level-value');
        
        let levelText = 'Standard';
        
        // Update level text and active card
        switch(value) {
            case 1:
                levelText = 'Basic';
                updateActiveProtectionCard('basic');
                break;
            case 2:
                levelText = 'Standard';
                updateActiveProtectionCard('standard');
                break;
            case 3:
                levelText = 'Premium';
                updateActiveProtectionCard('premium');
                break;
        }
        
        if (levelValueElement) {
            levelValueElement.textContent = levelText;
        }
        
        // Update rules based on selected protection level
        updateRulesForProtectionLevel(levelText.toLowerCase());
    }
    
    // Function to update active protection card
    function updateActiveProtectionCard(level) {
        protectionCards.forEach(card => {
            if (card.getAttribute('data-level') === level) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Function to update rules based on protection level
    function updateRulesForProtectionLevel(level) {
        // Define which rules are enabled at each protection level
        const ruleSettings = {
            basic: ['rule1', 'rule2'],
            standard: ['rule1', 'rule2', 'rule3', 'rule4', 'rule5'],
            premium: ['rule1', 'rule2', 'rule3', 'rule4', 'rule5', 'rule6', 'rule7', 'rule8']
        };
        
        // Get the rules for the selected level
        const enabledRules = ruleSettings[level] || [];
        
        // Update each rule toggle
        ruleCards.forEach(card => {
            const ruleId = card.getAttribute('data-rule-id');
            const toggle = card.querySelector('.rule-toggle input');
            
            if (toggle) {
                const shouldBeEnabled = enabledRules.includes(ruleId);
                toggle.checked = shouldBeEnabled;
                
                // Update rule status in UI
                updateRuleStatus(ruleId, shouldBeEnabled);
            }
        });
        
        // Update protection stats
        updateProtectionStats(level);
    }
    
    // Function to update rule status in UI
    function updateRuleStatus(ruleId, isEnabled) {
        const ruleCard = document.querySelector(`.rule-card[data-rule-id="${ruleId}"]`);
        if (!ruleCard) return;
        
        // Update visual state
        if (isEnabled) {
            ruleCard.classList.add('enabled');
            ruleCard.classList.remove('disabled');
        } else {
            ruleCard.classList.remove('enabled');
            ruleCard.classList.add('disabled');
        }
    }
    
    // Function to update protection stats based on level
    function updateProtectionStats(level) {
        const statsMap = {
            basic: {
                blockedSignups: '45',
                falsePositives: '< 1%',
                fraudPrevented: '$980',
                timeSaved: '3.2 hrs'
            },
            standard: {
                blockedSignups: '114',
                falsePositives: '2%',
                fraudPrevented: '$2,860',
                timeSaved: '6.5 hrs'
            },
            premium: {
                blockedSignups: '187',
                falsePositives: '5%',
                fraudPrevented: '$4,750',
                timeSaved: '9.8 hrs'
            }
        };
        
        const stats = statsMap[level] || statsMap.standard;
        
        // Update stats in the UI
        const statElements = {
            blockedSignups: document.getElementById('stat-blocked-signups'),
            falsePositives: document.getElementById('stat-false-positives'),
            fraudPrevented: document.getElementById('stat-fraud-prevented'),
            timeSaved: document.getElementById('stat-time-saved')
        };
        
        for (const [key, element] of Object.entries(statElements)) {
            if (element && stats[key]) {
                element.textContent = stats[key];
            }
        }
    }
    
    // Function to show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});
