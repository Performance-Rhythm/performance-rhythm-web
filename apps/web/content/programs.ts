// Programs Page Content
// Comprehensive overview of all Performance Rhythm offerings

export const programs = [
  {
    title: "Signature Workshops",
    description:
      "60–90 minute experiences introducing the Human Operating System, stress and resilience fundamentals, guided regulation, and practical integration.",
    slug: "workshops"
  },
  {
    title: "Leadership Programs",
    description:
      "Multi-session development for leaders navigating pressure, communication, decision-making, and team performance.",
    slug: "leadership-programs"
  },
  {
    title: "Corporate Programs",
    description:
      "Longer engagements for organizations building resilience, healthier cultures, and sustainable performance across teams.",
    slug: "corporate-programs"
  },
  {
    title: "Subscription Platform",
    description:
      "A reinforcement layer with breathwork sessions, meditation content, educational trainings, learning paths, and company-specific libraries.",
    slug: "platform"
  }
] as const;

export const PROGRAMS_CONTENT = {
  // Hero Section
  hero: {
    eyebrow: "PERFORMANCE RHYTHM PROGRAMS",
    headline: "Designed for Organizations That Believe People Drive Performance",
    intro: "A workshop can be a valuable starting point. We design it as the first step in a practical path that can extend into leadership development, corporate partnerships, and ongoing reinforcement.",
    cta: "Book A Discovery Conversation"
  },

  // Opening Context
  openingContext: {
    headline: "The Performance Rhythm Approach",
    sections: [
      {
        title: "Foundation: Awareness",
        description: "Every experience starts with teaching people to recognize their nervous system state, the signals in their body, and the choices they have in response. Without awareness, change doesn't stick."
      },
      {
        title: "Reinforcement: Practice",
        description: "Insight becomes more useful through practice. We embed practical tools—breathing, grounding, visualization, and meditation—into every program so people leave with options they can apply in real situations."
      },
      {
        title: "Integration: Rhythm",
        description: "Lasting change comes from consistent practice woven into daily work. Our programs are designed to create rhythm, not require heroic effort or special circumstances."
      }
    ]
  },

  // Program 1: Workshops
  workshopProgram: {
    title: "Signature Workshops",
    slug: "workshops",
    eyebrow: "ENTRY POINT",
    duration: "60–90 minutes",
    audience: "All-hands, leadership teams, departments, or small groups",
    
    overview: "The Signature Workshop is the introduction to the Performance Rhythm framework. It introduces the Human Operating System, teaches nervous system basics, walks through the Notice-Reset-Strengthen-Repeat method with live demonstrations, and gives participants immediate tools they can use today.",
    
    sections: [
      {
        title: "What's Covered",
        items: [
          "How stress activates the nervous system and why it matters",
          "The Notice-Reset-Strengthen-Repeat framework",
          "Live demonstrations of reset techniques (breathing, grounding, etc.)",
          "How to integrate practice into busy work schedules",
          "Practical toolkit for participants to take home"
        ]
      },
      {
        title: "Delivery Options",
        items: [
          "60-minute Standard (framework + multiple reset tools + Q&A)",
          "90-minute Deep Dive (framework + tools + live practice + discussion)"
        ]
      },
      {
        title: "Ideal For",
        items: [
          "Organizations starting their Performance Rhythm journey",
          "All-hands meetings and company kickoffs",
          "Department introductions (Sales, CS, Engineering, etc.)",
          "Validation of whether Performance Rhythm is a fit"
        ]
      },
      {
        title: "Outcomes",
        items: [
          "Participants understand the science behind nervous system regulation",
          "Participants have 2-3 immediate reset tools they can practice",
          "Organization has clarity on next steps (leadership program, corporate engagement, etc.)",
          "Foundation laid for deeper engagement if desired"
        ]
      }
    ],

    format: "In-person or virtual delivery. Supports 10 to 500+ participants.",
    investment: "Pricing based on group size and duration. Typical range: $750–$2,000.",
    cta: "Explore Workshop Options"
  },

  // Program 2: Leadership Programs
  leadershipProgram: {
    title: "Leadership Programs",
    slug: "leadership-programs",
    eyebrow: "DEEPER ENGAGEMENT",
    duration: "4–8 sessions over 8–12 weeks",
    audience: "Leadership teams, senior leaders, department heads",
    
    overview: "Leadership programs are multi-session engagements for leaders who want to develop deeper capacity for presence, clarity, resilience, and influence. The work moves from awareness into skill-building and integration, helping leaders practice more intentional responses under pressure and consider how their behavior shapes team conditions.",
    
    sections: [
      {
        title: "Program Structure",
        items: [
          "Session 1: Foundation — Nervous system basics, self-assessment, personal patterns",
          "Sessions 2–3: Reset Tools — Breathing, movement, grounding, connection practices",
          "Sessions 4–5: Strengthen — Meditation, visualization, attention training",
          "Sessions 6–7: Integration — Application to leadership challenges, team dynamics",
          "Session 8: Rhythm — Creating sustainable practice, accountability partnerships"
        ]
      },
      {
        title: "Key Differentiators",
        items: [
          "Small group format (8–12 leaders) for deeper work",
          "Personal practice between sessions (10–15 minutes daily)",
          "Real leadership scenarios explored and practiced",
          "Peer accountability partnerships",
          "Individual coaching check-ins available"
        ]
      },
      {
        title: "Leadership Focus Areas",
        items: [
          "Decision-making under pressure",
          "Communication in difficult conversations",
          "Presence and emotional regulation in meetings",
          "Delegation and confidence",
          "Leading through change and uncertainty",
          "Team psychological safety and culture"
        ]
      },
      {
        title: "Intended Outcomes",
        items: [
          "Leaders establish a realistic personal practice",
          "Leaders build options for responding in high-stakes situations",
          "Leadership communication and presence become explicit areas of practice",
          "Leaders develop clarity on how their state influences team performance",
          "Teams have opportunities to provide feedback on trust, safety, and leadership presence"
        ]
      }
    ],

    format: "Monthly or bi-weekly sessions, 60–90 minutes per session. In-person or virtual.",
    investment: "Pricing based on group size, session count, and customization. Typical range: $5,000–$20,000 per program.",
    cta: "Discuss Leadership Program"
  },

  // Program 3: Corporate Programs
  corporateProgram: {
    title: "Corporate Programs",
    slug: "corporate-programs",
    eyebrow: "ORGANIZATIONAL TRANSFORMATION",
    duration: "3–12 months",
    audience: "Entire organizations, multiple departments, cross-functional teams",
    
    overview: "Corporate programs are designed for organizations ready for deeper, longer-term engagement. We work with leadership, departments, teams, and individual contributors to build resilience, clarity, psychological safety, and sustainable performance across the organization.",
    
    sections: [
      {
        title: "Typical Structure",
        items: [
          "Discovery phase — Understanding organizational challenges and readiness",
          "Leadership kickoff — Aligning leaders on vision and modeling practice",
          "All-hands workshop — Introducing the framework to the entire organization",
          "Department programs — Tailored multi-session engagement for key teams",
          "Individual coaching — Optional support for selected leaders",
          "Reinforcement layer — Monthly check-in sessions or platform access",
          "Review & measurement — Assessing impact on engagement, retention, performance"
        ]
      },
      {
        title: "Common Focus Areas",
        items: [
          "Leadership team resilience and alignment",
          "Cross-functional communication and collaboration",
          "Customer-facing team performance and presence",
          "Technical team stress and burnout prevention",
          "Organizational culture and psychological safety",
          "Executive team clarity and decision-making under pressure"
        ]
      },
      {
        title: "Integration Options",
        items: [
          "Monthly reinforcement sessions for all participants",
          "Access to future subscription platform",
          "Custom content libraries for organization-specific scenarios",
          "Ongoing coaching and support",
          "Executive dashboards and engagement metrics"
        ]
      },
      {
        title: "Potential Measures and Outcomes",
        items: [
          "Participant-reported changes in stress, calm, clarity, and perceived capacity",
          "Employee engagement, retention, and recovery indicators chosen with the organization",
          "Decision-making and communication behaviors in defined work contexts",
          "Psychological safety and trust measures",
          "Cross-functional collaboration measures",
          "Leadership presence and behavior feedback",
          "A practical foundation for more sustainable performance"
        ]
      }
    ],

    format: "Customized engagement. Typically 3–12 months with multiple touchpoints.",
    investment: "Partnership-based pricing. Typical range: $20,000–$100,000+ depending on scope and organization size.",
    cta: "Start A Corporate Partnership Conversation"
  },

  // Program 4: Platform
  platformProgram: {
    title: "Subscription Platform",
    slug: "platform",
    eyebrow: "CONTINUOUS REINFORCEMENT",
    duration: "Ongoing",
    audience: "Organizations seeking consistent, scalable reinforcement",
    
    overview: "The future subscription platform is the reinforcement layer that extends Performance Rhythm beyond workshops and programs into daily practice. It provides breathwork sessions, meditation content, educational trainings, learning paths, and company-specific content libraries that keep the method alive between programs and after workshops.",
    
    sections: [
      {
        title: "Platform Capabilities (Coming Soon)",
        items: [
          "Guided breathwork sessions (3–10 minutes for specific contexts)",
          "Meditation library organized by need (stress, focus, sleep, etc.)",
          "Educational content on nervous system regulation and performance",
          "Personalized learning paths for different roles",
          "Company-specific content and scenarios",
          "Progress tracking and engagement metrics",
          "Mobile app for practice anytime, anywhere"
        ]
      },
      {
        title: "Why Platform Matters",
        items: [
          "Workshops create awareness. A reinforcement platform can support consistency.",
          "One workshop introduces the tools. Continued practice helps people apply them over time.",
          "Mobile access means tools are available when people need them most.",
          "Company-specific content makes it relevant to your organization's context.",
          "Aggregate data helps you see organizational patterns and progress."
        ]
      },
      {
        title: "Perfect For",
        items: [
          "Organizations wanting continuous reinforcement after programs",
          "Remote or distributed teams needing scalable access",
          "Long-term performance culture building",
          "Onboarding new employees into resilience-focused culture",
          "Individual contributors seeking personal development"
        ]
      },
      {
        title: "Designed to Support",
        items: [
          "Continued practice and skill reinforcement",
          "Accessible tools for stress, focus, and recovery",
          "A shared language for regulation and sustainable performance",
          "Aggregate engagement and self-reported progress measures",
          "Organization-specific learning paths and content"
        ]
      }
    ],

    format: "Subscription model. Web and mobile app. Accessible 24/7.",
    investment: "Team-based pricing starting at launch. Beta access available to Founding Partner clients.",
    cta: "Request Platform Preview"
  },

  // Founding Partner Section
  foundingPartnerProgram: {
    headline: "Founding Partner Program",
    description: "Performance Rhythm is partnering with select organizations to validate, refine, and shape the future of our approach to leadership development, resilience, and sustainable performance.",
    
    benefits: [
      {
        title: "Preferred Pricing",
        description: "Significant discounts on all programs and first access to platform pricing."
      },
      {
        title: "Direct Access to Founders",
        description: "Direct relationships with Shane and Jordan for strategic conversations and customized engagement."
      },
      {
        title: "Early Platform Access",
        description: "First access to the subscription platform as it launches, with input on features and content."
      },
      {
        title: "Shape the Future",
        description: "Influence product roadmap, program design, and content development based on your experience."
      },
      {
        title: "Long-Term Partnership",
        description: "Multi-year relationships built on mutual success, not transactional engagements."
      },
      {
        title: "Case Study & Visibility",
        description: "Opportunity to become a public success story, showcasing your organization's commitment to people."
      }
    ],

    cta: "Become A Founding Partner"
  },

  // Comparison & Decision Framework
  comparisonSection: {
    headline: "Choosing Your Path",
    intro: "Different organizations are at different places in their journey. Here's how to think about which offering makes sense for you.",
    
    scenarios: [
      {
        situation: "We want to introduce the concept and see if it's a fit.",
        recommendation: "Start with a Signature Workshop",
        why: "Low-commitment way to validate whether Performance Rhythm resonates with your culture. Great for all-hands meetings or department introductions."
      },
      {
        situation: "Our leadership team wants to develop deeper capacity for resilience and presence.",
        recommendation: "Engage in a Leadership Program",
        why: "A multi-session engagement creates time to practice, reflect, and apply the work to real leadership situations."
      },
      {
        situation: "We're ready for organizational transformation and want comprehensive engagement.",
        recommendation: "Partner in a Corporate Program",
        why: "A longer engagement allows work across multiple levels, with shared goals, reinforcement, and measurement."
      },
      {
        situation: "We've done workshops/programs and want ongoing reinforcement.",
        recommendation: "Combine programs with Platform access",
        why: "A platform can make practice resources easier to revisit and scale across the organization."
      },
      {
        situation: "We want to partner long-term and shape the future of Performance Rhythm.",
        recommendation: "Explore Founding Partner Program",
        why: "Preferred pricing, direct founder access, early platform launch, and ability to influence how Performance Rhythm evolves."
      }
    ]
  },

  // FAQ Section
  faqSection: {
    headline: "Common Questions",
    faqs: [
      {
        question: "How long does it take to see results?",
        answer: "Some participants notice a state shift during a guided practice, while durable skill and organizational change take repetition, supportive working conditions, and time. We set measures appropriate to the engagement instead of promising a universal timeline."
      },
      {
        question: "Can this work for remote/distributed teams?",
        answer: "Yes. Programs can be delivered in person, virtually, or in a hybrid format. As the platform develops, it will add on-demand resources that can support distributed teams between live sessions."
      },
      {
        question: "What if only some leaders are interested?",
        answer: "That's fine — and often how programs start. A single leadership program can create ripple effects across the organization. However, maximum organizational impact comes from leadership alignment, so we typically recommend starting with the executive/leadership team."
      },
      {
        question: "How do you measure impact?",
        answer: "We track multiple indicators: participant feedback and engagement; leadership behavior shifts (visible to teams); employee engagement and retention metrics; stress/burnout indicators; psychological safety scores; and organizational performance metrics. The specific measures depend on what matters most to your organization."
      },
      {
        question: "What's the difference between your workshops and generic meditation/wellness workshops?",
        answer: "Performance Rhythm is a human-capacity and leadership offering, not a general wellness event. We teach nervous-system literacy and practical regulation skills in the context of real work, communicate the evidence and its limits, and connect individual practice with the organizational conditions that shape sustainable performance."
      },
      {
        question: "Can we customize programs for our organization?",
        answer: "Yes. We work with you in discovery to understand your specific challenges, culture, and goals. All programs can be customized in scope, timing, content focus, and delivery format. Corporate programs are typically fully customized."
      }
    ]
  },

  // Final CTA
  finalCta: {
    headline: "Ready to Build a Performance Rhythm Culture?",
    body: "Whether you're exploring the method, developing your leadership team, or ready for organizational transformation, we're here to help.",
    primaryCta: "Book A Discovery Conversation",
    secondaryCta: "Explore Founding Partner Program"
  }
};

export const programsContent = PROGRAMS_CONTENT;
