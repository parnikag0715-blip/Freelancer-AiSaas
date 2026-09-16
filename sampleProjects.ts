import { ProjectAnalysis } from '../types';

export const SAMPLE_PROJECTS: ProjectAnalysis[] = [
  {
    id: 'lixbor-auron-trading',
    createdAt: '2026-09-14T14:30:00.000Z',
    updatedAt: '2026-09-14T14:30:00.000Z',
    title: 'LIXBOR AURON LLP - International Trading Platform',
    rawDescription: `A company called LIXBOR AURON LLP is looking for a modern premium website for an international trading business dealing in Polymers, Chemicals and Fertilizers.

Requirements include:
- Responsive, world-class corporate design suited for global B2B buyers
- Dedicated product catalog pages for Polymers, Industrial Chemicals, and Agricultural Fertilizers
- Rich media display (high-res images, product demonstration videos, and interactive spec sheets)
- Easy content management / admin access for staff to update commodity listings
- High-conversion international inquiry forms & lead capture with instant email routing
- Exceptional loading speed and core web vitals
- Foundational B2B SEO (meta tags, structured data for products, sitemap)
- Enterprise security (SSL, form spam protection, secure authentication)
- Custom domain setup & cloud hosting configuration

Timeline: 4-6 weeks
Budget: $3,500 - $5,000 USD (Milestone-based)
Target audience: Commercial import/export partners in Europe, Middle East, and Asia.`,
    sourceMarketplace: 'Direct / Upwork Enterprise',
    optionalUrls: ['https://lixborauron.com'],
    attachedDocuments: [{ name: 'Lixbor_Auron_Commodities_Spec.pdf', size: 1840000 }],
    isSaved: true,
    status: 'completed',
    extractedEntities: {
      companyName: 'LIXBOR AURON LLP',
      clientNames: ['Managing Partner (Commercial Operations)'],
      websites: ['https://lixborauron.com'],
      emails: ['contact@lixborauron.com (Discovered via domain WHOIS/Website)'],
      phones: ['+44 20 7946 0912 (Public Registry)'],
      locations: ['London, United Kingdom / Global Trading Hubs'],
      industries: ['International Commodities Trading', 'Chemicals & Petrochemicals', 'Agricultural Inputs'],
      productsServices: ['Polymers (HDPE, LDPE, PP)', 'Industrial Chemicals', 'Agricultural Fertilizers (Urea, DAP)'],
      budget: {
        raw: '$3,500 - $5,000 USD',
        type: 'fixed',
        estimatedAmount: '$4,250',
        currency: 'USD',
      },
      timeline: '4-6 weeks',
      urgency: 'high',
      keyRequirements: [
        'Modern responsive B2B corporate website with global buyer appeal',
        'Product category architecture for Polymers, Chemicals & Fertilizers',
        'Rich media integration (product demo videos, chemical spec PDFs, GIFs)',
        'Self-service Admin CMS for updating catalog pricing & availability',
        'Multi-currency / multi-region inquiry forms with automated notification routing',
        'Sub-second page loading speed and Core Web Vitals optimization',
        'Comprehensive technical SEO for international trading keywords',
        'Enterprise security and SSL configuration',
        'DNS domain connection and cloud hosting deployment',
      ],
      techStack: ['Next.js / React', 'Tailwind CSS', 'Headless CMS / Sanity or Payload', 'Cloudflare CDN', 'PostgreSQL'],
      deliverables: [
        'Figma UI/UX design mockups & brand style guide',
        'Full-stack responsive web application',
        'Admin dashboard with role-based permissions',
        'Automated inquiry capture & email notifications',
        'Domain and CDN setup on production server',
        'Documentation and 30-day post-launch warranty',
      ],
    },
    projectUnderstanding: {
      executiveSummary:
        'LIXBOR AURON LLP is establishing an authoritative digital presence to attract institutional buyers and trading partners across the petrochemical and fertilizer supply chain.',
      coreProblem:
        'Global commodities trading requires immense buyer trust. Without a high-performing, modern digital catalog, institutional procurement leads bounce and international credibility is compromised.',
      clientGoals: [
        'Establish immediate institutional credibility in international chemical & polymer trading',
        'Streamline B2B quote inquiries from global distributors and industrial purchasers',
        'Enable their internal trading desk to update available commodity lines without developer intervention',
      ],
      idealFreelancerProfile:
        'Senior Full-Stack Web Engineer or B2B Agency Lead with a strong portfolio in industrial/fintech corporate platforms and clean technical SEO execution.',
      projectComplexity: 'Moderate',
    },
    businessResearch: {
      companyOverview:
        'LIXBOR AURON LLP is a registered Limited Liability Partnership focused on international supply chain distribution and trading of synthetic polymers, bulk industrial chemicals, and agricultural soil nutrients.',
      officialWebsite: {
        url: 'https://lixborauron.com',
        verified: true,
        title: 'LIXBOR AURON LLP - International Trading House',
        description: 'Global supply partners for certified polymers, industrial grade chemicals, and agricultural fertilizers.',
      },
      publicPresence: [
        {
          platform: 'Corporate Registry',
          title: 'UK Companies House Record - LIXBOR AURON LLP',
          url: 'https://find-and-update.company-information.service.gov.uk/company/OC448912',
          snippet: 'Active Limited Liability Partnership incorporated for wholesale of chemical products and fuels.',
          verified: true,
          sourceType: 'registry',
        },
        {
          platform: 'LinkedIn',
          title: 'LIXBOR AURON LLP Corporate Page',
          url: 'https://www.linkedin.com/company/lixbor-auron-llp',
          snippet: 'Global Commodities Trading House dealing in polymers, industrial chemicals, and specialty bulk fertilizers.',
          verified: true,
          sourceType: 'social',
        },
        {
          platform: 'Official Website',
          title: 'Official Domain Portal (Holding Landing Page)',
          url: 'https://lixborauron.com',
          snippet: 'Domain registered and DNS pointed to Cloudflare. Landing page indicates forthcoming trade portal.',
          verified: true,
          sourceType: 'domain',
        },
      ],
      publicContactPoints: [
        {
          type: 'Official Email',
          value: 'inquiries@lixborauron.com',
          source: 'Public corporate registry & holding page',
          confidence: 'verified',
        },
        {
          type: 'Office Address',
          value: 'City of London Financial District, EC2M, United Kingdom',
          source: 'Companies House public filing',
          confidence: 'verified',
        },
        {
          type: 'Contact Form',
          value: 'https://lixborauron.com/contact',
          source: 'Holding domain contact endpoint',
          confidence: 'probable',
        },
      ],
      keyPersonnel: [
        {
          name: 'Commercial Director',
          role: 'Managing Partner - International Commodities',
          profileUrl: 'https://www.linkedin.com/company/lixbor-auron-llp',
          source: 'Public Business Directory',
        },
      ],
      sourcesTracked: [
        {
          name: 'Companies House UK Public Database',
          url: 'https://find-and-update.company-information.service.gov.uk',
          type: 'Public Government Registry',
          accessedAt: '2026-09-14T14:31:12Z',
        },
        {
          name: 'ICANN Public WHOIS / RDAP',
          url: 'https://rdap.verisign.com',
          type: 'Domain Infrastructure',
          accessedAt: '2026-09-14T14:31:18Z',
        },
        {
          name: 'LinkedIn Public Organization Index',
          url: 'https://linkedin.com',
          type: 'Professional Network',
          accessedAt: '2026-09-14T14:31:22Z',
        },
      ],
    },
    verification: {
      matchConfidenceScore: 92,
      verdict: 'High Confidence Match',
      evidenceFactors: [
        {
          factor: 'Legal Entity Exact Name Match',
          status: 'confirmed',
          explanation: 'LIXBOR AURON LLP found verbatim in government corporate registration records with active status.',
        },
        {
          factor: 'Sector & Product Alignment',
          status: 'confirmed',
          explanation: 'Registered SIC codes directly match wholesale trade of chemical products, polymers, and agricultural fertilizers.',
        },
        {
          factor: 'Domain Infrastructure Correlation',
          status: 'confirmed',
          explanation: 'Domain lixborauron.com is owned by the entity and currently displays a placeholder trade gateway.',
        },
        {
          factor: 'Commercial Viability & Solvency',
          status: 'probable',
          explanation: 'Active filing history indicates an operational commercial business with verifiable trading capital.',
        },
      ],
      uncertainties: [
        'Direct procurement officer direct-dial phone is not publicly published to prevent spam; outreach should target corporate inquiry route or LinkedIn message.',
      ],
    },
    leadIntelligence: {
      opportunityScore: 94,
      recommendation: 'High Potential',
      scoreBreakdown: {
        clarity: 24,
        legitimacy: 24,
        budgetQuality: 23,
        scopeFeasibility: 23,
      },
      keyStrengths: [
        'Clear, well-scoped requirements with explicit industry terminology and buyer expectations',
        'Verified corporate entity with physical registry filing and genuine trade operations',
        'Realistic budget ($3.5k - $5k) aligned with milestone-based B2B website deliverable scope',
        'High potential for ongoing retainer (product spec updates, SEO expansion, portal features)',
      ],
      potentialRisks: [
        'Commodity traders require strict timelines before upcoming industrial trade expos',
        'Heavy media assets (chemical spec PDFs and videos) require CDN caching for global access',
      ],
      talkingPoints: [
        'Experience building high-trust B2B industrial catalog platforms',
        'How sub-second load times impact corporate RFQ completion rates from overseas buyers',
        'Implementation of streamlined admin controls so trading desk can adjust specs in under 60 seconds',
      ],
      strategicAdvice:
        'Position your proposal around "Trust Engineering for Global Procurement Officers" rather than generic web design. Emphasize fast RFQ forms, clean commodity catalog filters, and effortless admin management.',
    },
    outreachDrafts: {
      email: {
        subject: 'Custom B2B Trading Platform for LIXBOR AURON LLP (Polymers, Chemicals & Fertilizers)',
        openingHook:
          'Hi LIXBOR AURON Team,\n\nI reviewed your project specifications for the international trading platform across your Polymers, Industrial Chemicals, and Fertilizer lines.',
        body:
          'In international commodities trading, your digital portal serves as the first proof-of-legitimacy for procurement teams in Europe and Asia. A standard brochure site won\'t suffice—buyers need structured grade filters (e.g. MFI for polymers, purity certificates for chemicals), instant RFQ request forms, and rapid page speeds even over overseas connections.\n\nI specialize in high-performance B2B trade portals. Here is how we will execute your 4-6 week roadmap:\n1. Dedicated Product Catalog Architecture: Modular taxonomies for polymers, chemicals, and fertilizers with downloadable technical spec sheets and MSDS documents.\n2. In-house Admin CMS: An intuitive dashboard so your commercial desk can update commodity availability and spec sheets in minutes.\n3. Institutional Speed & Security: Next.js + Cloudflare edge routing to ensure sub-second access globally, with enterprise SSL and hardened inquiry routing.\n4. Complete Domain & DNS Configuration: Seamless setup with zero downtime.',
        callToAction:
          'Would you be open to a brief 15-minute call or exchanging messages to review 2 live B2B catalog structures I\'ve recently deployed?',
      },
      whatsApp: {
        message:
          'Hello LIXBOR AURON Team! I reviewed your project for the new B2B trading website covering Polymers, Chemicals & Fertilizers. I build fast, high-trust platforms specifically designed for international trade houses with easy catalog management and instant RFQ capture. Would love to share a 2-minute video walkthrough of a similar B2B portal architecture. Let me know if you\'d like me to send it over!',
      },
      linkedIn: {
        connectionNote:
          'Saw LIXBOR AURON LLP\'s search for a modern trade platform across Polymers, Chemicals & Fertilizers. I engineer high-trust B2B portals for international trading houses—would love to connect and share a few architectural ideas!',
        inMail:
          'Subject: B2B Trade Portal Architecture for LIXBOR AURON LLP\n\nHi,\n\nI saw your team is preparing to launch a modern international trading platform for LIXBOR AURON LLP covering your Polymers, Industrial Chemicals, and Fertilizer divisions.\n\nFor institutional buyers, the critical difference is speed of inquiry, verified product grade documentation, and responsive mobile viewing for field agents. I\'ve engineered similar B2B trade platforms that cut quote turnaround time while keeping catalog management dead-simple for trading desks.\n\nI\'d be glad to share an interactive demo of our B2B catalog architecture if you are exploring technical partners for the 4-6 week sprint. Let me know if you\'d like to review it!',
      },
    },
  },
  {
    id: 'novapay-mvp-platform',
    createdAt: '2026-09-12T10:15:00.000Z',
    updatedAt: '2026-09-12T10:15:00.000Z',
    title: 'NovaPay Labs - FinTech Cross-Border Payment Dashboard MVP',
    rawDescription: `NovaPay Labs (Delaware C-Corp, Seed Stage) is seeking a Senior React/TypeScript engineer to build the frontend MVP for our cross-border FX settlements dashboard.

Scope:
- Multi-currency wallet balance overview (USD, EUR, GBP, SGD)
- Transaction ledger with instant search, filtering, and export to CSV/PDF
- Interactive FX rate converter with live simulated WebSocket stream
- KYC / business verification document upload flow with drag-and-drop
- Dark / Light mode UI with WCAG AA compliance
- Clean REST API integration with our backend team (Swagger specs ready)

Budget: $6,000 - $8,000 USD
Duration: 6-8 weeks`,
    sourceMarketplace: 'Upwork',
    optionalUrls: ['https://novapaylabs.io'],
    attachedDocuments: [{ name: 'NovaPay_API_Swagger_v1.json', size: 450000 }],
    isSaved: true,
    status: 'completed',
    extractedEntities: {
      companyName: 'NovaPay Labs Inc.',
      clientNames: ['VP of Engineering'],
      websites: ['https://novapaylabs.io'],
      emails: ['founders@novapaylabs.io'],
      phones: [],
      locations: ['San Francisco, CA / Delaware Registered'],
      industries: ['FinTech', 'Cross-Border Payments', 'B2B Banking Infrastructure'],
      productsServices: ['FX Settlement API', 'Multi-currency Virtual Accounts', 'Global Treasury Portal'],
      budget: {
        raw: '$6,000 - $8,000 USD',
        type: 'fixed',
        estimatedAmount: '$7,000',
        currency: 'USD',
      },
      timeline: '6-8 weeks',
      urgency: 'medium',
      keyRequirements: [
        'Production React 19 / TypeScript single-page application',
        'Real-time WebSocket multi-currency exchange ticker',
        'Audit-ready transaction ledger with virtualized table rendering',
        'Secure multi-step KYC document upload wizard',
        'Strict adherence to Swagger API contracts',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'WebSocket API'],
      deliverables: ['Modular component library', 'Complete dashboard views', 'Unit test coverage', 'API integration'],
    },
    projectUnderstanding: {
      executiveSummary:
        'Seed-funded FinTech building institutional FX settlement tools needs a polished frontend MVP to demonstrate liquidity execution for Series A investor demos and early pilot customers.',
      coreProblem:
        'FinTech dashboards demand sub-second UI responsiveness, strict validation, and bank-grade visual polish. Clunky tables destroy user confidence in money movement.',
      clientGoals: ['Deliver flawless pilot dashboard', 'Meet institutional security/compliance standards', 'Maintain clean maintainable codebase'],
      idealFreelancerProfile: 'Senior Frontend / FinTech React Engineer with deep TypeScript and design system experience.',
      projectComplexity: 'High',
    },
    businessResearch: {
      companyOverview:
        'NovaPay Labs Inc. is an early-stage financial technology company providing API-driven treasury solutions and multi-currency virtual accounts for global SMBs.',
      officialWebsite: {
        url: 'https://novapaylabs.io',
        verified: true,
        title: 'NovaPay Labs - Modern Cross-Border Treasury',
        description: 'Next-generation cross-border settlement infrastructure for modern digital commerce.',
      },
      publicPresence: [
        {
          platform: 'LinkedIn',
          title: 'NovaPay Labs Company Profile',
          url: 'https://linkedin.com/company/novapay-labs',
          snippet: 'FinTech startup developing cross-border payment infrastructure. 8-15 employees.',
          verified: true,
          sourceType: 'social',
        },
        {
          platform: 'Corporate Registry',
          title: 'Delaware Division of Corporations Record',
          url: 'https://icis.corp.delaware.gov/ecorp/entitysearch/NameSearch.aspx',
          snippet: 'Incorporated Delaware entity in good standing.',
          verified: true,
          sourceType: 'registry',
        },
      ],
      publicContactPoints: [
        {
          type: 'Official Email',
          value: 'founders@novapaylabs.io',
          source: 'Company website & AngelList page',
          confidence: 'verified',
        },
      ],
      keyPersonnel: [
        {
          name: 'Co-Founder & CTO',
          role: 'Technical Lead',
          profileUrl: 'https://linkedin.com/in/novapay-founders',
          source: 'LinkedIn',
        },
      ],
      sourcesTracked: [
        {
          name: 'Delaware Entity Filing Search',
          url: 'https://icis.corp.delaware.gov',
          type: 'Corporate Registry',
          accessedAt: '2026-09-12T10:17:00Z',
        },
      ],
    },
    verification: {
      matchConfidenceScore: 95,
      verdict: 'High Confidence Match',
      evidenceFactors: [
        {
          factor: 'Corporate Status Corroboration',
          status: 'confirmed',
          explanation: 'Registered Delaware C-Corp verified with matching brand name and tech leadership profiles.',
        },
        {
          factor: 'Domain & Web Presence',
          status: 'confirmed',
          explanation: 'Official website novapaylabs.io active with valid TLS certificates and clear product description.',
        },
        {
          factor: 'Clear Technical Specification',
          status: 'confirmed',
          explanation: 'Attached Swagger JSON documentation matches professional engineering standards.',
        },
      ],
      uncertainties: [],
    },
    leadIntelligence: {
      opportunityScore: 96,
      recommendation: 'High Potential',
      scoreBreakdown: {
        clarity: 25,
        legitimacy: 25,
        budgetQuality: 24,
        scopeFeasibility: 22,
      },
      keyStrengths: [
        'Exceptional project clarity with pre-built Swagger contracts',
        'Strong funded budget with clear milestones',
        'High potential for ongoing retainer or equity transition',
      ],
      potentialRisks: ['FinTech regulatory compliance demands zero UI math bugs on currency displays'],
      talkingPoints: [
        'Handling floating point currency precision safely in TypeScript',
        'Virtualizing high-frequency transaction tables to guarantee 60fps',
        'Experience integrating WebSocket feeds for real-time tickers',
      ],
      strategicAdvice:
        'Focus your pitch on precision, component testability, and financial data reliability. Point out how you handle micro-cent rounding and network reconnects.',
    },
    outreachDrafts: {
      email: {
        subject: 'Senior React/TS Engineer for NovaPay Labs FX Dashboard MVP',
        openingHook:
          'Hi NovaPay Labs Engineering Team,\n\nI reviewed your Swagger spec and requirements for the multi-currency FX settlements dashboard MVP.',
        body:
          'Having built financial data tables and live WebSocket state engines, I know that FinTech UI is all about sub-second data precision and bank-grade UX. When moving money, zero flickering and perfect floating-point formatting (e.g. BigNumber.js / currency tokens) are essential for user trust.\n\nI can step in and ship your 6-8 week MVP with:\n- Clean TanStack Table virtualized rendering for thousands of ledger rows\n- Resilient WebSocket connection manager with automated backoff retry for your live rates\n- Modular Tailwind design system matching your Figma and WCAG AA guidelines\n- 100% typed TypeScript interfaces generated directly from your OpenAPI/Swagger contracts.',
        callToAction: 'Can I share a live Sandbox of an interactive financial ledger I built recently?',
      },
      whatsApp: {
        message:
          'Hi NovaPay Labs team! Saw your posting for the React/TypeScript FX settlement dashboard. I have deep experience in real-time FinTech interfaces and Swagger integrations. Would love to share a quick 2-minute demo of a similar dashboard I engineered!',
      },
      linkedIn: {
        connectionNote:
          'Saw NovaPay Labs is hiring for the FX settlements dashboard MVP. I specialize in high-performance React/TS FinTech UIs and would love to connect!',
        inMail:
          'Subject: NovaPay FX Settlements MVP - React/TS Senior Support\n\nHi,\n\nSaw your team is spinning up the frontend MVP for NovaPay Labs cross-border treasury dashboard. I build production-grade financial applications in React 19 + TypeScript with strict Swagger type generation and robust WebSocket feeds. Would love to discuss how I can help hit your 6-week target.',
      },
    },
  },
  {
    id: 'shopify-speed-gig',
    createdAt: '2026-09-10T08:00:00.000Z',
    updatedAt: '2026-09-10T08:00:00.000Z',
    title: 'E-commerce Brand - Store Speed & Checkout Optimization',
    rawDescription: `Need someone to fix our Shopify store speed immediately. PageSpeed is 22 on mobile, want it above 85. Also checkout drops off too high. Fix app bloat and compress images.

Urgent job. Start today.`,
    sourceMarketplace: 'Fiverr / Freelancer.com',
    optionalUrls: [],
    attachedDocuments: [],
    isSaved: false,
    status: 'completed',
    extractedEntities: {
      companyName: null,
      clientNames: [],
      websites: [],
      emails: [],
      phones: [],
      locations: [],
      industries: ['E-Commerce / Direct-to-Consumer Retail'],
      productsServices: ['Unspecified Consumer Goods'],
      budget: {
        raw: 'Unspecified',
        type: 'unspecified',
        estimatedAmount: '$150 - $400',
        currency: 'USD',
      },
      timeline: 'Immediate / 24-48 hours',
      urgency: 'high',
      keyRequirements: [
        'Boost mobile Google PageSpeed score from 22 to 85+',
        'Analyze and remove unused third-party Shopify app scripts',
        'Optimize and compress catalog imagery',
        'Investigate checkout abandonment bottlenecks',
      ],
      techStack: ['Shopify Liquid', 'JavaScript', 'Core Web Vitals'],
      deliverables: ['Speed audit report', 'Script cleanup', 'Lighthouse score verification'],
    },
    projectUnderstanding: {
      executiveSummary:
        'Anonymous e-commerce merchant suffering severe mobile performance penalties causing ad spend waste and cart drop-offs.',
      coreProblem:
        'Shopify app bloat and unoptimized tracking pixels have wrecked Core Web Vitals, causing mobile bounce rates to skyrocket.',
      clientGoals: ['Quickly pass Google PageSpeed thresholds', 'Recover lost checkout conversions'],
      idealFreelancerProfile: 'Shopify Performance & Technical CRO Specialist.',
      projectComplexity: 'Simple',
    },
    businessResearch: {
      companyOverview:
        'No business name or domain provided in the initial description. Client posted anonymously from a marketplace freelancer gig board.',
      officialWebsite: undefined,
      publicPresence: [],
      publicContactPoints: [],
      keyPersonnel: [],
      sourcesTracked: [
        {
          name: 'Job Description Text Analysis',
          url: 'marketplace://gig-input',
          type: 'Text Parser',
          accessedAt: '2026-09-10T08:00:00Z',
        },
      ],
    },
    verification: {
      matchConfidenceScore: 25,
      verdict: 'Uncertain / Ambiguous',
      evidenceFactors: [
        {
          factor: 'Client Identity Disclosure',
          status: 'unverified',
          explanation: 'No company name, store URL, or personnel mentioned. Anonymous posting.',
        },
        {
          factor: 'Public Business Corroboration',
          status: 'unverified',
          explanation: 'Cannot research corporate registrations or professional profiles without store domain.',
        },
        {
          factor: 'Technical Feasibility',
          status: 'probable',
          explanation: 'The request is common and actionable, but score targets (85+ mobile) may be constrained by mandatory third-party apps.',
        },
      ],
      uncertainties: [
        'Client store domain unknown. Ask for URL before quoting firm scope.',
        'Shopify Plus vs Standard checkout limitations dictate what optimizations are possible on checkout.liquid.',
      ],
    },
    leadIntelligence: {
      opportunityScore: 54,
      recommendation: 'Low Information',
      scoreBreakdown: {
        clarity: 15,
        legitimacy: 12,
        budgetQuality: 11,
        scopeFeasibility: 16,
      },
      keyStrengths: ['Urgent need means high client responsiveness once engaged'],
      potentialRisks: [
        'Unspecified budget often leads to unrealistic expectations regarding 85+ mobile score while retaining 20 active marketing apps',
        'Risk of unpaid scope creep if expectations around checkout code limitations are not clarified up front',
      ],
      talkingPoints: [
        'Explaining the trade-off between third-party marketing apps and raw Lighthouse scores',
        'Requesting collaborator access to run a non-destructive test clone before touching the live theme',
      ],
      strategicAdvice:
        'Do not submit a blind bid. Request the store URL first and offer a free 3-bullet diagnosis of their top render-blocking script to build trust.',
    },
    outreachDrafts: {
      email: {
        subject: 'Quick question regarding your Shopify store URL & mobile speed audit',
        openingHook: 'Hi there,\n\nI saw your note on getting your mobile PageSpeed from 22 up to 85+.',
        body:
          'Often on Shopify, 70% of the mobile speed drag isn\'t image size—it is leftover JavaScript from apps that were deleted but never had their theme code uninstalled. \n\nBefore you spend any money or grant admin access, what is your store URL? I would be happy to run an initial audit of your render-blocking waterfall and tell you exactly which scripts can be delayed without breaking your analytics.',
        callToAction: 'Reply with your store URL and I\'ll inspect it for you in 10 minutes.',
      },
      whatsApp: {
        message:
          'Hi! Saw your post regarding the urgent Shopify store speed drop. Could you share your store link? I can run a quick waterfall test and point out which specific app scripts are causing the mobile delay!',
      },
      linkedIn: {
        connectionNote:
          'Saw your post regarding Shopify speed & checkout optimization. I specialize in Core Web Vitals for e-commerce—happy to share a quick diagnosis if you share the store URL!',
        inMail:
          'Subject: Immediate Shopify Speed Diagnostics\n\nHi,\n\nI saw your project regarding bringing your mobile speed from 22 to 85+. The key bottleneck is usually render-blocking third-party app scripts. If you can share your store domain, I can run a quick diagnostic and outline the top 3 quick wins.',
      },
    },
  },
];
