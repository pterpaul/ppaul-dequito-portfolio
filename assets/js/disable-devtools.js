// Disable developer tools and common shortcuts
document.addEventListener('keydown', function(e) {
  // Prevent F12 (developer tools)
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+Shift+I (developer tools)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+U (view source)
  if (e.ctrlKey && e.key === 'U') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+Shift+J (console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+Shift+C (inspect element)
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+P (print)
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    return false;
  }
  // Prevent Ctrl+Shift+P (print)
  if (e.ctrlKey && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    return false;
  }

  // Prevent PrintScreen key (as best as client JS can)
  if (e.key === 'PrintScreen') {
    e.preventDefault();
    blockScreenshotMoment();
    return false;
  }

  // Prevent Win+Shift+S (Windows snip tool) and Cmd+Shift+4 (Mac screenshot) as much as possible
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 's' || e.key === '4')) {
    e.preventDefault();
    blockScreenshotMoment();
    return false;
  }
});

function blockScreenshotMoment() {
  document.documentElement.classList.add('screenshot-blocked');
  setTimeout(() => {
    document.documentElement.classList.remove('screenshot-blocked');
  }, 300);
  // Optional fallback: show warning
  const warning = document.createElement('div');
  warning.textContent = 'Screenshot is blocked. Please do not capture this content.';
  warning.style.position = 'fixed';
  warning.style.left = '50%';
  warning.style.top = '10px';
  warning.style.transform = 'translateX(-50%)';
  warning.style.background = 'rgba(0,0,0,0.8)';
  warning.style.color = '#fff';
  warning.style.padding = '8px 14px';
  warning.style.borderRadius = '8px';
  warning.style.zIndex = '999999999';
  warning.style.pointerEvents = 'none';
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 1200);
}

window.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') {
    document.documentElement.classList.add('screenshot-blocked');
  } else {
    setTimeout(() => document.documentElement.classList.remove('screenshot-blocked'), 150);
  }
});

// Disable right-click on images specifically (additional layer)
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// Prevent printing
window.print = function() {
  alert('Printing is disabled on this page.');
  return false;
};

// Prevent beforeprint event if supported
window.addEventListener('beforeprint', function(e) {
  e.preventDefault();
  alert('Printing is disabled on this page.');
});

// Optional: Detect if developer tools are open (not 100% reliable)
let devtoolsOpen = false;
const threshold = 160;

const detectDevTools = () => {
  if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      // You can add an alert or redirect here
      alert('Developer tools detected. Please close them for better experience.');
      // Or redirect: window.location.href = 'https://example.com';
    }
  } else {
    devtoolsOpen = false;
  }
};

// Check periodically
setInterval(detectDevTools, 500);