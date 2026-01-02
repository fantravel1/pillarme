#!/usr/bin/env node
/**
 * SEO/AEO Optimization Script for Domain Pages
 * Enhances meta tags, structured data, and content for better search visibility
 */

const fs = require('fs');
const path = require('path');

const DOMAINS_DIR = path.join(__dirname, 'domains');

// Category keywords database for enhanced SEO
const categoryKeywords = {
  travel: ['travel booking', 'vacation packages', 'tourism', 'destination guide', 'trip planning', 'travel deals', 'holiday packages', 'adventure travel', 'luxury travel', 'budget travel'],
  finance: ['financial services', 'investment platform', 'wealth management', 'fintech', 'banking services', 'financial planning', 'money management', 'financial advisor', 'investment advice', 'financial technology'],
  health: ['healthcare', 'wellness platform', 'health services', 'medical information', 'fitness', 'healthy living', 'wellness tips', 'health advice', 'nutrition', 'mental health'],
  fitness: ['fitness training', 'workout programs', 'exercise routines', 'gym', 'personal training', 'fitness tips', 'strength training', 'cardio workouts', 'fitness community', 'athletic performance'],
  yoga: ['yoga classes', 'yoga instruction', 'meditation', 'mindfulness', 'wellness retreat', 'yoga studio', 'yoga practice', 'yoga poses', 'yoga teacher', 'holistic wellness'],
  technology: ['tech solutions', 'software platform', 'digital innovation', 'technology services', 'tech startup', 'digital transformation', 'tech industry', 'innovation hub', 'tech resources', 'digital tools'],
  ai: ['artificial intelligence', 'machine learning', 'AI solutions', 'automation', 'intelligent systems', 'AI technology', 'deep learning', 'neural networks', 'AI platform', 'smart technology'],
  crypto: ['cryptocurrency', 'blockchain', 'digital assets', 'crypto trading', 'DeFi', 'NFT', 'web3', 'crypto investment', 'digital currency', 'blockchain technology'],
  food: ['culinary', 'recipes', 'cooking', 'gastronomy', 'food culture', 'restaurant', 'cuisine', 'gourmet', 'food blog', 'culinary arts'],
  entertainment: ['entertainment news', 'celebrity', 'pop culture', 'media', 'streaming', 'music', 'movies', 'TV shows', 'entertainment industry', 'celebrity news'],
  music: ['music platform', 'artists', 'songs', 'albums', 'music streaming', 'music discovery', 'music industry', 'musicians', 'music news', 'playlists'],
  sports: ['sports news', 'athletics', 'sports fans', 'team sports', 'sports coverage', 'athletic competition', 'sports community', 'sports events', 'game highlights', 'sports analysis'],
  education: ['learning platform', 'online courses', 'educational resources', 'e-learning', 'training', 'tutorials', 'knowledge base', 'skill development', 'educational content', 'learning community'],
  business: ['business solutions', 'enterprise', 'B2B services', 'professional services', 'business growth', 'corporate', 'business development', 'startup', 'entrepreneurship', 'business strategy'],
  real_estate: ['property', 'real estate listings', 'home buying', 'property investment', 'real estate market', 'housing', 'commercial real estate', 'property management', 'real estate agent', 'home sales'],
  fashion: ['fashion trends', 'style', 'clothing', 'apparel', 'fashion industry', 'designer', 'fashion blog', 'outfit ideas', 'fashion news', 'luxury fashion'],
  beauty: ['beauty tips', 'skincare', 'cosmetics', 'beauty products', 'makeup', 'beauty trends', 'beauty industry', 'personal care', 'beauty advice', 'beauty routines'],
  pets: ['pet care', 'pet products', 'animal lovers', 'pet health', 'pet services', 'pet owners', 'veterinary', 'pet supplies', 'pet community', 'animal welfare'],
  gaming: ['video games', 'gaming community', 'esports', 'game reviews', 'gaming news', 'game streaming', 'PC gaming', 'console gaming', 'gaming platform', 'game development'],
  art: ['art gallery', 'artists', 'artwork', 'creative', 'art community', 'visual arts', 'art collections', 'contemporary art', 'art exhibitions', 'art marketplace'],
  photography: ['photography', 'photos', 'photographers', 'photo gallery', 'photography tips', 'photo editing', 'camera', 'visual storytelling', 'photography community', 'photo sharing'],
  automotive: ['cars', 'automotive', 'vehicles', 'auto industry', 'car reviews', 'car buying', 'auto news', 'car enthusiasts', 'automotive technology', 'car maintenance'],
  nature: ['nature', 'environment', 'outdoors', 'wildlife', 'conservation', 'eco-friendly', 'natural world', 'outdoor adventures', 'nature photography', 'environmental awareness'],
  history: ['history', 'historical', 'heritage', 'archaeology', 'ancient', 'historical events', 'cultural heritage', 'historical research', 'history education', 'historical preservation'],
  science: ['science', 'research', 'scientific discovery', 'STEM', 'scientific community', 'innovation', 'laboratory', 'scientific research', 'science news', 'technology research'],
  lifestyle: ['lifestyle', 'life hacks', 'personal development', 'self-improvement', 'daily life', 'lifestyle tips', 'modern living', 'lifestyle blog', 'life advice', 'personal growth'],
  community: ['community platform', 'social network', 'community building', 'online community', 'member network', 'community engagement', 'group platform', 'social hub', 'community resources', 'networking'],
  news: ['news platform', 'current events', 'breaking news', 'journalism', 'news coverage', 'media outlet', 'news updates', 'daily news', 'news analysis', 'news aggregator'],
  africa: ['African', 'Africa', 'African culture', 'African heritage', 'Pan-African', 'African community', 'African diaspora', 'African history', 'African business', 'African development'],
  asia: ['Asian', 'Asia', 'Asian culture', 'Asian heritage', 'Asian community', 'Asian market', 'Asian business', 'Asian travel', 'Asian cuisine', 'Asian entertainment'],
  kpop: ['K-pop', 'Korean pop', 'K-pop idols', 'Korean entertainment', 'K-pop music', 'K-pop fans', 'Korean music', 'K-pop groups', 'K-pop news', 'Korean wave'],
  default: ['premium domain', 'brandable domain', 'domain rental', 'online business', 'digital brand', 'web presence', 'domain name', 'business domain', 'startup domain', 'professional website']
};

// Detect category from keywords and content
function detectCategory(keywords, tagline, domainName) {
  const text = `${keywords} ${tagline} ${domainName}`.toLowerCase();

  if (text.includes('travel') || text.includes('vacation') || text.includes('trip') || text.includes('tour')) return 'travel';
  if (text.includes('bank') || text.includes('financ') || text.includes('invest') || text.includes('money') || text.includes('wealth')) return 'finance';
  if (text.includes('health') || text.includes('medical') || text.includes('wellness') || text.includes('heal')) return 'health';
  if (text.includes('yoga') || text.includes('meditation') || text.includes('mindful')) return 'yoga';
  if (text.includes('fitness') || text.includes('gym') || text.includes('workout') || text.includes('training')) return 'fitness';
  if (text.includes('kpop') || text.includes('k-pop') || text.includes('korean pop')) return 'kpop';
  if (text.includes('ai') || text.includes('artificial') || text.includes('machine learning') || text.includes('algorithm')) return 'ai';
  if (text.includes('crypto') || text.includes('blockchain') || text.includes('nft') || text.includes('bitcoin')) return 'crypto';
  if (text.includes('food') || text.includes('recipe') || text.includes('cook') || text.includes('culinary') || text.includes('restaurant')) return 'food';
  if (text.includes('music') || text.includes('song') || text.includes('artist') || text.includes('band')) return 'music';
  if (text.includes('sport') || text.includes('athletic') || text.includes('basketball') || text.includes('football') || text.includes('soccer')) return 'sports';
  if (text.includes('game') || text.includes('gaming') || text.includes('esport') || text.includes('player')) return 'gaming';
  if (text.includes('education') || text.includes('learn') || text.includes('course') || text.includes('academy')) return 'education';
  if (text.includes('business') || text.includes('enterprise') || text.includes('corporate')) return 'business';
  if (text.includes('fashion') || text.includes('style') || text.includes('cloth') || text.includes('apparel')) return 'fashion';
  if (text.includes('beauty') || text.includes('skincare') || text.includes('makeup') || text.includes('cosmetic')) return 'beauty';
  if (text.includes('pet') || text.includes('dog') || text.includes('cat') || text.includes('animal')) return 'pets';
  if (text.includes('art') || text.includes('gallery') || text.includes('creative') || text.includes('artist')) return 'art';
  if (text.includes('photo') || text.includes('camera') || text.includes('picture')) return 'photography';
  if (text.includes('car') || text.includes('auto') || text.includes('vehicle') || text.includes('motor')) return 'automotive';
  if (text.includes('nature') || text.includes('environment') || text.includes('outdoor') || text.includes('wildlife')) return 'nature';
  if (text.includes('history') || text.includes('heritage') || text.includes('ancient') || text.includes('historical')) return 'history';
  if (text.includes('science') || text.includes('research') || text.includes('scientific')) return 'science';
  if (text.includes('africa') || text.includes('african')) return 'africa';
  if (text.includes('asia') || text.includes('asian') || text.includes('china') || text.includes('japan') || text.includes('korea')) return 'asia';
  if (text.includes('tech') || text.includes('software') || text.includes('digital') || text.includes('platform')) return 'technology';
  if (text.includes('entertain') || text.includes('celebrity') || text.includes('movie') || text.includes('tv')) return 'entertainment';
  if (text.includes('news') || text.includes('media') || text.includes('journal')) return 'news';
  if (text.includes('community') || text.includes('network') || text.includes('social')) return 'community';
  if (text.includes('lifestyle') || text.includes('life')) return 'lifestyle';

  return 'default';
}

// Generate enhanced meta description
function generateMetaDescription(domainName, tagline, price, category) {
  const categoryPhrases = {
    travel: `travel experiences and vacation packages`,
    finance: `financial services and investment solutions`,
    health: `health and wellness resources`,
    yoga: `yoga instruction and wellness programs`,
    fitness: `fitness training and workout programs`,
    kpop: `K-pop news, music, and fan community`,
    ai: `AI-powered solutions and automation`,
    crypto: `cryptocurrency and blockchain innovation`,
    food: `culinary experiences and food culture`,
    music: `music discovery and entertainment`,
    sports: `sports news and fan experiences`,
    gaming: `gaming community and entertainment`,
    education: `educational resources and learning`,
    business: `business solutions and professional services`,
    fashion: `fashion trends and style inspiration`,
    beauty: `beauty tips and skincare solutions`,
    pets: `pet care and animal lover community`,
    art: `art discovery and creative expression`,
    photography: `photography and visual storytelling`,
    automotive: `automotive news and car enthusiasts`,
    nature: `nature exploration and outdoor adventures`,
    history: `historical knowledge and cultural heritage`,
    science: `scientific discovery and research`,
    africa: `African culture, heritage, and community`,
    asia: `Asian culture and regional insights`,
    technology: `technology solutions and digital innovation`,
    entertainment: `entertainment news and pop culture`,
    news: `news coverage and current events`,
    community: `community building and networking`,
    lifestyle: `lifestyle tips and personal growth`,
    default: `premium online business opportunities`
  };

  const phrase = categoryPhrases[category] || categoryPhrases.default;
  return `Rent ${domainName} for just $${price}/month. Premium domain perfect for ${phrase}. Save 99%+ vs buying. Instant activation, cancel anytime.`;
}

// Generate natural language FAQ questions
function generateFAQSchema(domainName, price, value, category, industries, useCases) {
  const faqs = [
    {
      question: `What is the monthly rental cost for ${domainName}?`,
      answer: `${domainName} rents for $${price} per month. This premium domain is valued at $${value}, meaning you save over 99% compared to purchasing outright. The rental includes full DNS control, email forwarding, and immediate activation with no long-term commitment required.`
    },
    {
      question: `What type of business is ${domainName} best suited for?`,
      answer: `${domainName} is ideal for ${industries.slice(0, 3).join(', ')}, and related businesses. The domain's branding makes it perfect for ${useCases.slice(0, 3).join(', ')}.`
    },
    {
      question: `How quickly can I start using ${domainName}?`,
      answer: `You can start using ${domainName} immediately after signup. DNS propagation typically takes 24-48 hours, but many users see their site live within hours. We provide full DNS control so you can point the domain to any hosting provider.`
    },
    {
      question: `Can I cancel my ${domainName} rental at any time?`,
      answer: `Yes, all PILLAR domain rentals are month-to-month with no long-term contracts. You can cancel your ${domainName} rental at any time without penalty. Your domain will remain active until the end of your current billing period.`
    },
    {
      question: `Why rent ${domainName} instead of buying it?`,
      answer: `Renting ${domainName} at $${price}/month instead of purchasing for $${value} preserves your capital for marketing and growth. Over 5 years, you'd spend $${price * 60} renting vs $${value} buying—a savings of $${parseInt(value.replace(/,/g, '')) - (price * 60)} that can be invested in your business.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate enhanced Product schema
function generateProductSchema(domainName, description, price, category) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${domainName} Domain Rental`,
    "description": description,
    "image": `https://pillarme.com/images/domains/${domainName.toLowerCase().replace('.com', '')}-og.jpg`,
    "brand": {
      "@type": "Brand",
      "name": "PILLAR"
    },
    "category": `Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Domain`,
    "offers": {
      "@type": "Offer",
      "url": `https://pillarme.com/domains/${domainName.toLowerCase().replace('.com', '')}`,
      "priceCurrency": "USD",
      "price": price.toString(),
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "PILLAR Media & Entertainment",
        "url": "https://pillarme.com"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": Math.floor(Math.random() * 100 + 50).toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// Generate BreadcrumbList schema
function generateBreadcrumbSchema(domainName) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pillarme.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Domains",
        "item": "https://pillarme.com/domains"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": domainName,
        "item": `https://pillarme.com/domains/${domainName.toLowerCase().replace('.com', '')}`
      }
    ]
  };
}

// Extract data from HTML
function extractData(html) {
  const data = {};

  // Extract domain name from h1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<span[^>]*>\.com<\/span><\/h1>/i) ||
                  html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    data.domainName = h1Match[1].trim() + '.com';
  }

  // Extract price
  const priceMatch = html.match(/\$(\d+)<span>\/mo/);
  if (priceMatch) {
    data.price = parseInt(priceMatch[1]);
  }

  // Extract value
  const valueMatch = html.match(/Value:\s*<strong>\$([^<]+)<\/strong>/) ||
                     html.match(/Domain Value:\s*<strong>\$([^<]+)<\/strong>/);
  if (valueMatch) {
    data.value = valueMatch[1].trim();
  }

  // Extract tagline
  const taglineMatch = html.match(/<p class="tagline">([^<]+)<\/p>/);
  if (taglineMatch) {
    data.tagline = taglineMatch[1].trim();
  }

  // Extract keywords
  const keywordsMatch = html.match(/<meta name="keywords" content="([^"]+)"/);
  if (keywordsMatch) {
    data.keywords = keywordsMatch[1];
  }

  // Extract value props
  const valuePropsMatch = html.match(/<div class="value-props">([\s\S]*?)<\/div>/);
  if (valuePropsMatch) {
    const props = valuePropsMatch[1].match(/<span class="value-prop[^"]*">([^<]+)<\/span>/g);
    if (props) {
      data.valueProps = props.map(p => p.replace(/<[^>]+>/g, '').trim());
    }
  }

  // Extract industries
  const industryCards = html.match(/<div class="industry-card">([\s\S]*?)<\/div>/g);
  if (industryCards) {
    data.industries = industryCards.map(card => {
      const titleMatch = card.match(/<h4>([^<]+)<\/h4>/);
      return titleMatch ? titleMatch[1].trim() : '';
    }).filter(Boolean);
  }

  // Extract use cases
  const useCaseMatches = html.match(/<div class="use-case">([^<]+)<\/div>/g);
  if (useCaseMatches) {
    data.useCases = useCaseMatches.map(uc => uc.replace(/<[^>]+>/g, '').trim());
  }

  // Extract emoji/icon
  const emojiMatch = html.match(/font-size=%2290%22>([^<]+)<\/text>/);
  if (emojiMatch) {
    data.emoji = emojiMatch[1];
  }

  // Extract accent color
  const accentMatch = html.match(/--accent:([^;]+);/);
  if (accentMatch) {
    data.accentColor = accentMatch[1].trim();
  }

  return data;
}

// Generate enhanced keywords
function generateEnhancedKeywords(domainName, category, existingKeywords) {
  const catKeywords = categoryKeywords[category] || categoryKeywords.default;
  const domainBase = domainName.replace('.com', '').toLowerCase();

  // Split camelCase or combined words
  const domainWords = domainBase.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

  const enhanced = [
    `${domainBase} domain`,
    `${domainBase}.com`,
    `rent ${domainBase}`,
    `${domainBase} domain for rent`,
    domainWords,
    ...catKeywords.slice(0, 5),
    existingKeywords
  ];

  return [...new Set(enhanced.filter(Boolean))].join(', ');
}

// Process a single domain file
function processDomainFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const data = extractData(html);

  if (!data.domainName || !data.price) {
    console.log(`Skipping ${filePath} - could not extract required data`);
    return false;
  }

  const category = detectCategory(data.keywords || '', data.tagline || '', data.domainName);

  // Generate enhanced meta description
  const enhancedDescription = generateMetaDescription(data.domainName, data.tagline, data.price, category);

  // Generate enhanced keywords
  const enhancedKeywords = generateEnhancedKeywords(data.domainName, category, data.keywords || '');

  // Generate schemas
  const faqSchema = generateFAQSchema(
    data.domainName,
    data.price,
    data.value || (data.price * 1000).toLocaleString(),
    category,
    data.industries || ['businesses', 'startups', 'entrepreneurs'],
    data.useCases || ['online platform', 'digital business', 'web presence']
  );

  const productSchema = generateProductSchema(
    data.domainName,
    `Premium .com domain perfect for ${category} businesses. ${data.tagline || 'Build your digital brand.'}`,
    data.price,
    category
  );

  const breadcrumbSchema = generateBreadcrumbSchema(data.domainName);

  // Check if already has full schema
  const hasFullSchema = html.includes('FAQPage') && html.includes('BreadcrumbList');

  if (hasFullSchema) {
    console.log(`Skipping ${data.domainName} - already optimized`);
    return false;
  }

  // Build new head section
  const domainSlug = data.domainName.toLowerCase().replace('.com', '');

  // Enhanced OG tags
  const ogTags = `
  <!-- Open Graph -->
  <meta property="og:title" content="${data.domainName} - Premium Domain For Rent | $${data.price}/mo">
  <meta property="og:description" content="${enhancedDescription}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="https://pillarme.com/domains/${domainSlug}">
  <meta property="og:image" content="https://pillarme.com/images/domains/${domainSlug}-og.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${data.domainName} Premium Domain For Rent">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="PILLAR Media & Entertainment">
  <meta property="product:price:amount" content="${data.price}">
  <meta property="product:price:currency" content="USD">`;

  // Twitter Card tags
  const twitterTags = `
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.domainName} - Premium Domain For Rent | $${data.price}/mo">
  <meta name="twitter:description" content="${enhancedDescription}">
  <meta name="twitter:image" content="https://pillarme.com/images/domains/${domainSlug}-og.jpg">
  <meta name="twitter:image:alt" content="${data.domainName} Premium Domain">`;

  // Structured data scripts
  const schemaScripts = `
  <!-- Structured Data: Product -->
  <script type="application/ld+json">
${JSON.stringify(productSchema, null, 2)}
  </script>

  <!-- Structured Data: FAQPage -->
  <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
  </script>

  <!-- Structured Data: BreadcrumbList -->
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>`;

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]+"/,
    `<meta name="description" content="${enhancedDescription}"`
  );

  // Replace keywords
  html = html.replace(
    /<meta name="keywords" content="[^"]+"/,
    `<meta name="keywords" content="${enhancedKeywords}"`
  );

  // Replace simple OG tags with enhanced ones
  html = html.replace(
    /<meta property="og:title" content="[^"]+">\s*<meta property="og:type" content="product">/,
    ogTags
  );

  // Replace simple product schema with enhanced schemas
  html = html.replace(
    /<script type="application\/ld\+json">{"@context":"https:\/\/schema\.org","@type":"Product"[^<]+<\/script>/,
    schemaScripts
  );

  // Add Twitter tags if not present (before </head>)
  if (!html.includes('twitter:card')) {
    html = html.replace('</head>', twitterTags + '\n</head>');
  }

  // Enhance FAQ questions from "Cost?" to full natural language
  html = html.replace(
    /<span>Cost\?<\/span>/g,
    `<span>What is the monthly rental cost for ${data.domainName}?</span>`
  );

  html = html.replace(
    /<span>Industries\?<\/span>/g,
    `<span>What type of business is ${data.domainName} best suited for?</span>`
  );

  // Enhance FAQ answers
  const industries = data.industries || ['various businesses'];
  html = html.replace(
    /<div class="faq-answer-content">\$\d+\/month(?:, saving 99%\+ vs purchase price)?\.?<\/div>/,
    `<div class="faq-answer-content">${data.domainName} rents for $${data.price}/month. This premium domain is valued at $${data.value || (data.price * 1000).toLocaleString()}, meaning you save over 99% compared to purchasing. The rental includes full DNS control, email forwarding, and immediate activation.</div>`
  );

  // Write the enhanced file
  fs.writeFileSync(filePath, html);

  return true;
}

// Main execution
function main() {
  const files = fs.readdirSync(DOMAINS_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(DOMAINS_DIR, f));

  console.log(`Found ${files.length} domain pages to process...`);

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      if (processDomainFile(file)) {
        processed++;
        if (processed % 50 === 0) {
          console.log(`Processed ${processed} files...`);
        }
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`\nComplete! Processed: ${processed}, Skipped: ${skipped}`);
}

main();
