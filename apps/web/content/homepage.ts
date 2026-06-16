import { routes } from "@/lib/routes";

export const homepage = {
  hero: {
    eyebrow: "Internal Balance. External Performance.",
    headline: "Most organizations optimize systems. Few optimize the people running them.",
    subheadline:
      "Performance Rhythm helps organizations strengthen the human capacity behind exceptional leadership, resilient cultures, sustainable performance, and long-term growth.",
    primaryCta: { label: "Book A Discovery Conversation", href: routes.contact },
    secondaryCta: { label: "Explore Our Approach", href: routes.method }
  },
  hiddenCost: {
    headline: "The Hidden Cost of Human Capacity",
    intro:
      "Stress does not stay isolated inside one person. It shows up in leadership quality, communication, decision-making, burnout risk, turnover, and performance consistency. That makes human capacity a business issue, not a wellness side project.",
    costs: [
      ["Leadership", "Pressure changes how leaders listen, decide, communicate, and create stability for their teams."],
      ["Communication", "Stress increases reactivity, shortens patience, weakens trust, and turns simple conversations into friction."],
      ["Decision Making", "Overloaded people have less access to clarity, judgment, creativity, and long-range thinking."],
      ["Burnout", "When demands repeatedly exceed recovery, motivation and performance eventually decline."],
      ["Turnover", "Talented people leave environments that consistently drain capacity without rebuilding it."],
      ["Performance Consistency", "Execution becomes harder to sustain when the human system behind it is overloaded."]
    ]
  },
  systems: {
    headline: "Organizations Optimize Systems But Ignore The System Running Them",
    intro:
      "Companies invest heavily in the external systems of performance. But every strategy, tool, process, and training still runs through human beings. When human capacity is ignored, even strong systems underperform.",
    optimizedTitle: "Organizations Invest In",
    ignoredTitle: "Organizations Often Underestimate",
    optimized: ["Strategy", "Technology", "Software", "Process", "Training"],
    ignored: ["Human Capacity", "Stress Load", "Recovery", "Adaptability", "Leadership Pressure"]
  },
  hos: {
    headline: "The Human Operating System Is Where Performance Becomes Real",
    intro:
      "Leaders should care because this is where plans become behavior. The Human Operating System influences how people handle pressure, communicate, recover, adapt, and execute. When it is overloaded, teams become reactive. When it is strengthened, performance becomes more consistent.",
    note:
      "The mechanism matters, but the outcome matters more: clearer leadership, better communication, greater resilience, and performance that can be sustained.",
    inputs: ["Pressure", "Workload", "Change", "Expectations"],
    factors: ["Clarity", "Regulation", "Recovery", "Capacity"],
    outputs: ["Better leadership", "Cleaner communication", "Stronger decisions", "Greater resilience", "Sustainable performance"]
  },
  difference: {
    headline: "The Performance Rhythm Difference",
    intro:
      "Most leadership programs teach skills. Most wellness programs focus on wellbeing. Most performance programs focus on results. Performance Rhythm develops the human capacity that influences all three.",
    cards: [
      ["Leadership Skills Need Capacity", "Skills matter, but leaders can only use them well when they can stay clear, regulated, and effective under pressure."],
      ["Wellbeing Must Connect To Performance", "We are not a wellness company. We connect resilience, recovery, and regulation to leadership, culture, and business outcomes."],
      ["Performance Requires Sustainability", "Results matter. The question is whether those results can be maintained without burning out the people creating them."],
      ["Human Capacity Development", "Performance Rhythm strengthens the internal capacity that supports leadership effectiveness, resilient cultures, sustainable performance, and long-term growth."]
    ]
  },
  trust: {
    headline: "Built For Leaders Who See People And Performance Together",
    intro:
      "Performance Rhythm is designed for organizations that care about people and performance. The work is grounded, practical, evidence-informed, and connected to the leadership, culture, resilience, and execution challenges organizations face every day.",
    cards: [
      ["Leadership-Relevant", "Focused on the conditions that shape communication, decision-making, resilience, and team performance."],
      ["Evidence-Informed", "Grounded in physiology, psychology, neuroscience, leadership science, and human performance research."],
      ["Business-Aligned", "Connects human capacity to execution, culture, retention, sustainable growth, and long-term performance."],
      ["Practical", "Designed to translate insight into practices leaders and teams can actually use under pressure."]
    ]
  },
  outcomes: {
    headline: "What Happens When Human Capacity Improves",
    intro:
      "When people build greater capacity, organizations do not just feel better. They operate better. Leadership, communication, resilience, culture, and performance all become more sustainable.",
    cards: [
      ["Stronger Leaders", "Leaders who communicate with clarity, regulate under pressure, and create healthier team environments."],
      ["Better Communication", "Teams that listen better, recover faster from friction, and handle difficult conversations with more trust."],
      ["Greater Resilience", "People and teams that adapt, recover, and remain effective under changing demands."],
      ["Healthier Cultures", "Cultures that support accountability, growth, wellbeing, and performance without chronic urgency."],
      ["Reduced Burnout Risk", "Work environments that recognize recovery as a performance requirement, not a reward."],
      ["Sustainable Performance", "Results that can be maintained without constant stress overload."],
      ["Sustainable Growth", "Organizations capable of growing without sacrificing the people responsible for that growth."]
    ]
  },
  researchCredibility: {
    headline: "Grounded In Human Performance Science",
    intro:
      "Performance Rhythm is practical and business-relevant, but it is not arbitrary. Our work draws from stress physiology, recovery science, burnout research, leadership science, and human performance principles.",
    cards: [
      ["Stress Physiology", "Stress influences attention, emotional regulation, decision-making, communication, and recovery."],
      ["Burnout & Recovery", "Burnout is often a capacity and recovery problem, not a motivation problem."],
      ["Leadership Under Pressure", "A leader’s internal state influences trust, communication, judgment, and team culture."]
    ],
    cta: { label: "Explore The Research", href: routes.research }
  },
  audience: {
    headline: "Who We Work With",
    intro:
      "Performance Rhythm is built for organizations and teams where human performance, communication, resilience, and sustainable growth matter.",
    groups: [
      "Leadership Teams",
      "Customer Success",
      "Customer Support",
      "Sales Teams",
      "People Operations",
      "Healthcare Organizations",
      "Technology Companies"
    ]
  },
  programs: {
    headline: "Programs That Strengthen Capacity, Leadership, and Sustainable Performance",
    intro:
      "Performance Rhythm offers workshops, leadership programs, corporate programs, and ongoing reinforcement designed to help organizations translate insight into practical change.",
    cards: [
      ["Signature Workshops", "High-impact sessions introducing human capacity, stress and resilience fundamentals, guided regulation experiences, and practical integration."],
      ["Leadership Programs", "Multi-session development experiences for leaders navigating pressure, communication, decision-making, and team performance."],
      ["Corporate Programs", "Broader organizational engagements designed to strengthen resilience, culture, and sustainable performance across teams."],
      ["Continuous Reinforcement Platform", "Future ongoing reinforcement through learning paths, content libraries, practice tools, and company-specific resources that help development continue after the workshop."]
    ]
  },
  platform: {
    eyebrow: "Future Platform Preview",
    headline: "Built For Continuous Reinforcement",
    intro:
      "Performance Rhythm is being designed as consulting plus platform: high-trust human development experiences supported by digital infrastructure that helps organizations reinforce learning over time.",
    disclaimer:
      "Conceptual preview only. Phase 1 does not include login, dashboards, assignments, progress tracking, or platform functionality.",
    contentLibrary: {
      title: "Content Library",
      categories: ["Regulation", "Recovery", "Leadership", "Performance"],
      items: [
        ["Sustainable Performance Foundations", "Training · 12 min"],
        ["Leadership Reset", "Practice Tool · 8 min"],
        ["Recovery Is A Performance Requirement", "Guide · 6 min"]
      ]
    },
    learningPath: {
      title: "Leadership Resilience Path",
      subtitle: "4 steps · Designed for managers",
      steps: [
        "Sustainable Performance Foundations",
        "Practice Regulation Under Pressure",
        "Build Recovery Into The Workday",
        "Lead Sustainable Performance Conversations"
      ]
    },
    managerInsights: {
      title: "Manager Insights",
      team: "Customer Success Team",
      stats: [
        ["Team Participation", "76%"],
        ["Content Completion", "62%"],
        ["Assigned Path", "Leadership Resilience"]
      ],
      note: "Designed for aggregate visibility, not invasive individual monitoring."
    },
    companyDashboard: {
      title: "Company Dashboard",
      stats: [
        ["Active Members", "84"],
        ["Content Engagement", "71%"],
        ["Active Programs", "3"]
      ],
      focus: "Sustainable Performance Foundations"
    }
  },
  foundingPartners: {
    headline: "A Limited Opportunity To Shape Human Capacity Development Inside Organizations",
    intro:
      "Performance Rhythm is partnering with a select group of early organizations to validate, refine, and evolve a new approach to leadership development, resilience, sustainable performance, and future platform reinforcement.",
    benefits: [
      "Preferred founding partner pricing",
      "Direct access to the founders",
      "Early access to future programs and platform concepts",
      "Opportunities to influence future offerings",
      "A long-term partnership role in shaping Human Capacity Development"
    ]
  },
  about: {
    headline: "Why Shane Built Performance Rhythm",
    intro:
      "After 17+ years leading sales, marketing, implementation, support, and customer success teams in healthcare technology, Shane Curtis repeatedly saw talented leaders and employees struggle for reasons that had little to do with intelligence, skill, or motivation. Stress was quietly undermining communication, decision-making, resilience, and performance. Performance Rhythm was built from the realization that human capacity was often the missing variable.",
    points: [
      "17+ years in healthcare technology leadership",
      "Led sales, marketing, implementation, support, and customer success teams",
      "Observed stress undermining talented leaders and employees",
      "Built Performance Rhythm around human capacity as a missing performance variable"
    ]
  },
  finalCta: {
    headline: "Strong organizations are built by strong people.",
    intro:
      "Let's explore how Performance Rhythm can help your leaders, teams, and organization build sustainable performance.",
    reassurance:
      "A discovery conversation is simply a starting point to understand your organization’s goals, challenges, and fit."
  }
} as const;
