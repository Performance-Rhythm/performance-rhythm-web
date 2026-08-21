export const CONTACT_CONTENT = {
  hero: {
    eyebrow: "GET IN TOUCH",
    title: "Let's Explore Whether Performance Rhythm is the Right Fit",
    intro:
      "A discovery conversation is a focused, practical discussion about your organization's goals, challenges, and opportunities to strengthen leadership, resilience, culture, and sustainable performance. No pressure. Just real conversation."
  },

  discoveryCall: {
    duration: "30 Minutes",
    description: "Focused. Practical. Consultative. No obligation.",
    highlights: [
      "Executive-friendly",
      "Fit-focused",
      "Practical next steps",
      "No sales pressure"
    ]
  },

  whatWeCover: {
    title: "What We'll Discuss",
    items: [
      "What your organization is currently navigating",
      "Where stress, pressure, or capacity challenges are showing up",
      "Which teams or leaders may benefit most",
      "Whether a workshop, program, or founding partnership makes sense",
      "Practical next steps and what success looks like"
    ]
  },

  bestFit: {
    title: "Ideal For",
    items: [
      "Leadership teams and executives",
      "Customer success and customer support leaders",
      "Sales and sales operations leaders",
      "People operations and HR leaders",
      "Learning and development leaders",
      "Organizations across all industries and sizes"
    ]
  },

  whatThisIsNot: {
    title: "What This Conversation Is Not",
    items: [
      "Not a high-pressure sales call",
      "Not a generic wellness conversation",
      "Not a clinical consultation",
      "Not a one-size-fits-all pitch",
      "Not a scripted sales pitch"
    ]
  },

  discoveryFramework: {
    eyebrow: "HOW IT WORKS",
    title: "A Typical Discovery Conversation",
    steps: [
      {
        number: 1,
        title: "Understanding Your Organization",
        description:
          "We learn about your business, culture, leadership, and the specific challenges you're navigating."
      },
      {
        number: 2,
        title: "Identifying Capacity Challenges",
        description:
          "We explore where stress, pressure, burnout, or communication challenges are showing up for leaders and teams."
      },
      {
        number: 3,
        title: "Exploring Fit",
        description:
          "We discuss which Performance Rhythm offering (workshop, program, or partnership) would create the most value."
      },
      {
        number: 4,
        title: "Next Steps",
        description:
          "We agree on practical next steps that make sense for your organization and timeline."
      }
    ]
  },

  contactOptions: {
    eyebrow: "READY TO TALK?",
    title: "Choose How You Want to Connect",
    options: [
      {
        icon: "📅",
        title: "Book a Discovery Conversation",
        description: "Schedule a focused 30-minute call to explore fit and opportunities.",
        cta: "Book Now",
        href: "https://cal.com/shane-curtis/30min"
      },
      {
        icon: "📞",
        title: "Call Directly",
        description: "Prefer to speak with Shane directly? Call to start a conversation.",
        cta: "801-673-7395",
        href: "tel:801-673-7395"
      },
      {
        icon: "✉️",
        title: "Email Directly",
        description: "Reach out directly if you prefer email as your first touchpoint.",
        cta: "shane@performancerhythm.com",
        href: "mailto:shane@performancerhythm.com"
      },
      {
        icon: "📝",
        title: "Send a Note First",
        description: "Prefer to introduce yourself in writing? Send a quick note and we'll follow up.",
        cta: "contact@performancerhythm.com",
        href: "mailto:contact@performancerhythm.com"
      }
    ]
  },

  contactForm: {
    eyebrow: "SEND A MESSAGE",
    title: "Tell Us About Your Organization",
    fields: [
      { id: "name", label: "Name", required: true, type: "text" },
      {
        id: "email",
        label: "Work Email",
        required: true,
        type: "email"
      },
      { id: "company", label: "Company", required: true, type: "text" },
      { id: "role", label: "Role", required: false, type: "text" },
      {
        id: "organizationSize",
        label: "Organization Size",
        required: false,
        type: "select",
        options: [
          "10-50 employees",
          "50-100 employees",
          "100-250 employees",
          "250-500 employees",
          "500+ employees"
        ]
      },
      {
        id: "interest",
        label: "What interests you most?",
        required: true,
        type: "select",
        options: [
          "Signature Workshop",
          "Leadership Program",
          "Corporate Program",
          "Founding Partner Program",
          "Future Platform",
          "Not sure yet"
        ]
      },
      {
        id: "message",
        label: "What should we know about your organization?",
        required: false,
        type: "textarea"
      }
    ],
    consents:
      "I understand Performance Rhythm will use this information to respond to my inquiry and contact me about potential opportunities."
  },

  finalCTA: {
    title: "Ready to Start the Conversation?",
    subtitle:
      "Whether you book a call or send an email, we're ready to learn about your organization and explore whether Performance Rhythm can help.",
    buttonText: "Book a Discovery Conversation",
    buttonHref: "https://cal.com/shane-curtis/30min"
  },

  faq: [
    {
      question: "What if we're not sure if Performance Rhythm is a fit?",
      answer:
        "That's exactly what a discovery conversation is for. We'll have an honest discussion about whether it makes sense to continue. If it doesn't, we'll say so directly."
    },
    {
      question: "How long does the conversation take?",
      answer:
        "30 minutes. We respect your time. We'll cover what matters most and agree on next steps (if any) by the end."
    },
    {
      question: "What happens after the discovery conversation?",
      answer:
        "If there's mutual fit, we'll propose a specific next step—whether that's scheduling a workshop, starting a leadership program, or exploring a partnership. If not, you'll have clarity on why and what might make sense instead."
    },
    {
      question: "Do you require a commitment?",
      answer:
        "No. A discovery conversation has no obligation. It's exploratory, and there is no pressure to commit to anything."
    },
    {
      question: "What if we want to start with something small?",
      answer:
        "Perfect. Many organizations start with a signature workshop to validate the approach before committing to larger programs. We'll discuss what makes sense for your timeline and budget."
    },
    {
      question: "Can we include multiple leaders on the call?",
      answer:
        "Absolutely. In fact, it's often helpful. If leadership is aligned on exploring this, bring key stakeholders into the conversation."
    }
  ]
};
