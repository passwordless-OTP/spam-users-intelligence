// Mock interactive actions for demo purposes

document.addEventListener('DOMContentLoaded', function() {
    // Mock Enable Protection Level
    document.querySelectorAll('.protection-level-card .action-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('Protection level changed! (Demo only)');
        });
    });
    // Mock Undo/Restore/Preview
    document.querySelectorAll('.card .action-btn').forEach(function(btn) {
        if(btn.textContent.includes('Undo')) btn.onclick = function(){alert('Undo last change! (Demo only)')};
        if(btn.textContent.includes('Restore')) btn.onclick = function(){alert('Restored defaults! (Demo only)')};
        if(btn.textContent.includes('Preview')) btn.onclick = function(){alert('Preview: You would have blocked 12 fraud signups last week. (Demo only)')};
    });
    // Mock Apply/Dismiss Rule
    var applyBtn = document.getElementById('applyRuleBtn');
    if(applyBtn) applyBtn.onclick = function(){alert('Rule applied! (Demo only)')};
    var dismissBtn = document.getElementById('dismissRuleBtn');
    if(dismissBtn) dismissBtn.onclick = function(){alert('Rule dismissed! (Demo only)')};
});
