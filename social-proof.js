// Social Proof & Live Metrics for PILLAR Media
// Animated counters, live stats, and dynamic social proof elements

class SocialProof {
  constructor() {
    this.init();
  }

  init() {
    this.initCounters();
    this.initLiveMetrics();
    this.initRecentActivity();
  }

  // Animated number counters
  initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = this.formatNumber(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = this.formatNumber(target);
      }
    };

    updateCounter();
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  }

  // Live metrics that increment slowly
  initLiveMetrics() {
    const liveMetrics = [
      {
        id: 'live-creators',
        start: 12453,
        increment: 0.05, // ~4 per minute
        format: 'number'
      },
      {
        id: 'live-revenue',
        start: 2347890,
        increment: 15, // ~$900/minute
        format: 'currency'
      },
      {
        id: 'live-websites',
        start: 847,
        increment: 0.02, // ~1 per minute
        format: 'number'
      }
    ];

    liveMetrics.forEach(metric => {
      const element = document.getElementById(metric.id);
      if (element) {
        let current = metric.start;

        setInterval(() => {
          current += metric.increment;

          if (metric.format === 'currency') {
            element.textContent = '$' + this.formatNumber(Math.floor(current));
          } else {
            element.textContent = this.formatNumber(Math.floor(current));
          }
        }, 1000);
      }
    });
  }

  // Recent activity feed
  initRecentActivity() {
    const activities = [
      { site: 'FanTravel.com', action: 'launched', time: '3 minutes ago', icon: '✈️' },
      { site: 'BankSize.com', action: 'domain rented', time: '12 minutes ago', icon: '💰' },
      { site: 'ViewsGrowth.com', action: 'upgraded to Growth', time: '25 minutes ago', icon: '📈' },
      { site: 'Play4tomorrow.com', action: 'content published', time: '1 hour ago', icon: '🎬' },
      { site: 'DayInvestors.com', action: 'domain rented', time: '2 hours ago', icon: '📊' },
      { site: 'GlobalFirstNations.com', action: 'launched', time: '3 hours ago', icon: '🌍' },
      { site: 'FreeDesignThinking.com', action: 'upgraded to Authority', time: '4 hours ago', icon: '💡' },
      { site: 'Premium Domain', action: 'rented', time: '5 hours ago', icon: '🌐' }
    ];

    const container = document.getElementById('recent-activity');
    if (!container) return;

    let currentIndex = 0;

    const showActivity = () => {
      const activity = activities[currentIndex];

      container.innerHTML = `
        <div class="activity-notification" style="animation: slideIn 0.5s ease-out">
          <span class="activity-icon">${activity.icon}</span>
          <div class="activity-content">
            <strong>${activity.site}</strong> ${activity.action}
            <span class="activity-time">${activity.time}</span>
          </div>
        </div>
      `;

      currentIndex = (currentIndex + 1) % activities.length;
    };

    // Show first activity immediately
    showActivity();

    // Rotate every 5 seconds
    setInterval(showActivity, 5000);
  }
}

// Featured website testimonials
const testimonials = [
  {
    website: 'FanTravel.com',
    logo: '✈️',
    name: 'Sarah Mitchell',
    role: 'Founder, FanTravel',
    quote: 'Renting FanTravel.com for $500/month instead of buying it for $150K was the best decision. We invested that capital into marketing and hit profitability in month 3.',
    metrics: {
      traffic: '+450%',
      revenue: '$12K/mo',
      roi: '2,400%'
    }
  },
  {
    website: 'BankSize.com',
    logo: '💰',
    name: 'Marcus Chen',
    role: 'CEO, BankSize',
    quote: 'The premium domain gave us instant credibility in finance. Conversion rate jumped 34% immediately after launch. Worth every penny of the $1K/month rental.',
    metrics: {
      conversions: '+34%',
      trust: '+89%',
      ctr: '+52%'
    }
  },
  {
    website: 'ViewsGrowth.com',
    logo: '📈',
    name: 'Lisa Rodriguez',
    role: 'Director, ViewsGrowth',
    quote: 'PILLAR built our site in 48 hours. The AI content is phenomenal. We went from 0 to 50K monthly visitors in 6 months. Game changer.',
    metrics: {
      traffic: '50K/mo',
      time: '48 hours',
      growth: '+1,200%'
    }
  },
  {
    website: 'Play4tomorrow.com',
    logo: '🎬',
    name: 'David Park',
    role: 'Producer, Play4tomorrow',
    quote: 'As a filmmaker, I needed a professional online presence but had zero tech skills. PILLAR handled everything. Now I get client inquiries daily.',
    metrics: {
      leads: '+340%',
      bookings: '15/mo',
      revenue: '$8.5K/mo'
    }
  },
  {
    website: 'GlobalFirstNations.com',
    logo: '🌍',
    name: 'Kai Winters',
    role: 'Director, Global First Nations',
    quote: 'This platform is preserving our cultural stories for future generations. The premium domain lending credibility was crucial for partnerships.',
    metrics: {
      reach: '40 countries',
      stories: '120+',
      partners: '25 orgs'
    }
  },
  {
    website: 'DayInvestors.com',
    logo: '📊',
    name: 'Amanda Foster',
    role: 'Founder, Day Investors',
    quote: 'The SEO is incredible. We rank #1 for 15+ keywords in our niche. Direct traffic from the premium domain is 60% of our visitors.',
    metrics: {
      keywords: '15 #1 rankings',
      traffic: '60% direct',
      leads: '280/mo'
    }
  }
];

// Case studies data
const caseStudies = [
  {
    site: 'FanTravel.com',
    icon: '✈️',
    domain: 'Premium Travel Domain',
    rental: '$500/month',
    results: [
      { label: 'Launch Time', value: '24 hours' },
      { label: 'Monthly Traffic', value: '85K visitors' },
      { label: 'Revenue', value: '$12K/month' },
      { label: 'ROI', value: '2,400%' }
    ],
    story: 'Launched a sports travel platform targeting fans. Premium domain provided instant authority in crowded market.'
  },
  {
    site: 'BankSize.com',
    icon: '💰',
    domain: 'Finance Authority Domain',
    rental: '$1,000/month',
    results: [
      { label: 'Conversion Rate', value: '+34%' },
      { label: 'Trust Score', value: '+89%' },
      { label: 'Monthly Revenue', value: '$28K' },
      { label: 'Break-even', value: '2 months' }
    ],
    story: 'Financial education platform. Premium .com domain critical for trust in finance vertical.'
  },
  {
    site: 'ViewsGrowth.com',
    icon: '📈',
    domain: 'Marketing Domain',
    rental: '$300/month',
    results: [
      { label: 'Build Time', value: '48 hours' },
      { label: 'Monthly Visitors', value: '50K' },
      { label: 'Time to 10K', value: '3 months' },
      { label: 'Client Leads', value: '120/month' }
    ],
    story: 'Marketing analytics platform. AI-generated content ranks for 40+ high-value keywords.'
  }
];

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SocialProof();
  });
} else {
  new SocialProof();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SocialProof, testimonials, caseStudies };
}
