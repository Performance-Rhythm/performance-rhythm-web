export const researchTopics = [
  {
    title: "Stress, Cognition, and Decision-Making",
    category: "Stress Science",
    description:
      "How acute and sustained stress can shape attention, working memory, cognitive flexibility, and decisions."
  },
  {
    title: "Burnout, Recovery, and Work Design",
    category: "Organizational Health",
    description:
      "Why burnout is an occupational issue influenced by job demands, resources, recovery, and organizational conditions."
  },
  {
    title: "Breathing and Autonomic Regulation",
    category: "Regulation Practices",
    description:
      "What controlled-breathing research suggests—and what it does not yet establish—about stress and physiological arousal."
  },
  {
    title: "Leadership and Psychological Safety",
    category: "Team Performance",
    description:
      "Evidence connecting leadership behavior, stress, psychological safety, learning, and team effectiveness."
  }
] as const;

export interface ResearchArticle {
  title: string;
  source: string;
  year: string;
  category: string;
  description: string;
  url: string;
  type:
    | "meta-analysis"
    | "systematic-review"
    | "study"
    | "review"
    | "survey"
    | "framework"
    | "policy-brief";
  credibility: "peer-reviewed" | "institutional";
}

export const RESEARCH_CONTENT = {
  hero: {
    eyebrow: "RESEARCH & EVIDENCE",
    title: "Evidence for Human Capacity at Work",
    intro:
      "Performance Rhythm draws from stress science, occupational health, controlled-breathing research, mindfulness research, and organizational psychology. This curated library prioritizes peer-reviewed studies and current guidance from recognized public institutions—and describes the evidence without promising more than the research supports."
  },

  sections: [
    {
      id: "stress-cognition",
      eyebrow: "STRESS SCIENCE",
      title: "Stress, Cognition, and Decision-Making",
      description:
        "Stress does not affect every person or task in the same way. Across reviews, however, acute and occupational stress can influence working memory, cognitive flexibility, attention, and decision-making—capacities that matter in complex work.",
      articles: [
        {
          title: "The Effects of Acute Stress on Core Executive Functions: A Meta-Analysis and Comparison with Cortisol",
          source: "Neuroscience & Biobehavioral Reviews",
          year: "2016",
          category: "Executive Function",
          description:
            "A meta-analysis finding that acute stress impaired working memory and cognitive flexibility, while effects on inhibition varied with timing and cortisol response.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27371161/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Decision Making Under Stress: A Selective Review",
          source: "Neuroscience & Biobehavioral Reviews",
          year: "2012",
          category: "Decision-Making",
          description:
            "A review showing that stress can alter decision processes, with outcomes depending on the task, context, timing, and characteristics of the decision-maker.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22342781/",
          type: "review",
          credibility: "peer-reviewed"
        },
        {
          title: "The Effects of Work on Cognitive Functions: A Systematic Review",
          source: "Frontiers in Psychology",
          year: "2024",
          category: "Occupational Stress",
          description:
            "A systematic review of longitudinal evidence examining how occupational exposures—including stress, shift work, and long hours—relate to cognitive functioning over time.",
          url: "https://pubmed.ncbi.nlm.nih.gov/38784613/",
          type: "systematic-review",
          credibility: "peer-reviewed"
        },
        {
          title: "The Brain on Stress: Toward an Integrative Approach to Brain, Body, and Behavior",
          source: "Perspectives on Psychological Science",
          year: "2014",
          category: "Allostatic Load",
          description:
            "An integrative review of allostasis and allostatic load, explaining how repeated stress exposure can affect the brain and body across time.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25221612/",
          type: "review",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "burnout-recovery",
      eyebrow: "OCCUPATIONAL HEALTH",
      title: "Burnout, Recovery, and Work Design",
      description:
        "Burnout is not a medical diagnosis or a simple measure of personal toughness. The strongest guidance treats it as an occupational phenomenon and pairs individual support with changes to working conditions, job demands, resources, and recovery opportunities.",
      articles: [
        {
          title: "Burn-out an Occupational Phenomenon: International Classification of Diseases",
          source: "World Health Organization",
          year: "2019",
          category: "Burnout Definition",
          description:
            "WHO's ICD-11 explanation defines burnout as an occupational phenomenon resulting from chronic workplace stress that has not been successfully managed—not as a medical condition.",
          url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
          type: "framework",
          credibility: "institutional"
        },
        {
          title: "Understanding the Burnout Experience: Recent Research and Its Implications for Psychiatry",
          source: "World Psychiatry",
          year: "2016",
          category: "Burnout Research",
          description:
            "A review of the burnout construct, its relationship with work, and the importance of addressing mismatches between people and their work environment.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27265691/",
          type: "review",
          credibility: "peer-reviewed"
        },
        {
          title: "Safety at Work: A Meta-Analytic Investigation of the Link Between Job Demands, Job Resources, Burnout, Engagement, and Safety Outcomes",
          source: "Journal of Applied Psychology",
          year: "2011",
          category: "Job Demands and Resources",
          description:
            "A meta-analysis linking job demands and resources with burnout and engagement, reinforcing the need to examine working conditions alongside individual practices.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21171732/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "A Meta-Analysis on Antecedents and Outcomes of Detachment from Work",
          source: "Frontiers in Psychology",
          year: "2017",
          category: "Recovery",
          description:
            "A meta-analysis of 86 publications connecting psychological detachment from work with lower exhaustion and better well-being, sleep, and several performance-related outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28133454/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Organizational Interventions and Occupational Burnout: A Meta-Analysis with Focus on Exhaustion",
          source: "International Archives of Occupational and Environmental Health",
          year: "2023",
          category: "Organizational Intervention",
          description:
            "A meta-analysis finding a small reduction in exhaustion from organizational interventions, while rating the overall evidence very low in quality and calling for stronger studies.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37758838/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "breathing-regulation",
      eyebrow: "REGULATION PRACTICES",
      title: "Breathing and Autonomic Regulation",
      description:
        "Controlled breathing is a practical way to influence respiratory patterns and physiological arousal. Current evidence is promising for stress reduction and vagally mediated heart-rate variability, but study quality and protocols vary.",
      articles: [
        {
          title: "Effects of Voluntary Slow Breathing on Heart Rate and Heart Rate Variability: A Systematic Review and Meta-Analysis",
          source: "Neuroscience & Biobehavioral Reviews",
          year: "2022",
          category: "Slow Breathing and HRV",
          description:
            "A review of 223 studies finding increases in vagally mediated heart-rate variability during slow breathing, immediately after a session, and after repeated practice.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35623448/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Brief Structured Respiration Practices Enhance Mood and Reduce Physiological Arousal",
          source: "Cell Reports Medicine",
          year: "2023",
          category: "Brief Breathing Practice",
          description:
            "A randomized remote study comparing five minutes of daily structured breathing with mindfulness meditation over one month; exhale-focused cyclic sighing showed the strongest improvement in mood and respiratory rate.",
          url: "https://pubmed.ncbi.nlm.nih.gov/36630953/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Effect of Breathwork on Stress and Mental Health: A Meta-Analysis of Randomised-Controlled Trials",
          source: "Scientific Reports",
          year: "2023",
          category: "Breathwork Outcomes",
          description:
            "A meta-analysis reporting small-to-medium improvements in self-reported stress, anxiety, and depression, while emphasizing moderate risk of bias and the need for cautious interpretation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/36624160/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "mindfulness-workplace",
      eyebrow: "ATTENTION & AWARENESS",
      title: "Mindfulness and Workplace Stress",
      description:
        "Mindfulness programs have evidence for modest improvements in several stress-related outcomes. Evidence for direct changes in job performance, burnout, or organizational results is less consistent and should be communicated carefully.",
      articles: [
        {
          title: "Meditation Programs for Psychological Stress and Well-Being: A Systematic Review and Meta-Analysis",
          source: "JAMA Internal Medicine",
          year: "2014",
          category: "Meditation Evidence",
          description:
            "A widely cited review finding moderate evidence for improvements in anxiety, depression, and pain, with smaller or insufficient evidence for several other outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24395196/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "A Systematic Review and Meta-Analysis of Workplace Mindfulness Training Randomized Controlled Trials",
          source: "Journal of Occupational Health Psychology",
          year: "2019",
          category: "Workplace Mindfulness",
          description:
            "A review finding benefits for stress, anxiety, psychological distress, well-being, and sleep, while finding insufficient evidence for burnout and work-performance outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30714811/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Mindfulness-Based and Mindfulness-Informed Interventions at the Workplace: A Systematic Review and Meta-Regression Analysis of Randomised Controlled Trials",
          source: "Work & Stress",
          year: "2023",
          category: "Employee Health",
          description:
            "A large review of workplace randomized trials examining employee health outcomes and the substantial variation across intervention designs and study results.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37362186/",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "leadership-psychological-safety",
      eyebrow: "LEADERSHIP & TEAMS",
      title: "Leadership, Psychological Safety, and Team Performance",
      description:
        "Leadership behavior shapes how pressure is experienced and discussed at work. Research connects leadership with follower stress and well-being, while psychological safety supports learning, voice, and team effectiveness.",
      articles: [
        {
          title: "Leadership and Stress: A Meta-Analytic Review",
          source: "The Leadership Quarterly",
          year: "2017",
          category: "Leadership and Stress",
          description:
            "A meta-analysis examining the relationship between leadership and stress, including how leader behavior can function as either a resource or a demand for followers.",
          url: "https://doi.org/10.1016/j.leaqua.2016.10.006",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Leadership, Followers' Mental Health and Job Performance in Organizations: A Comprehensive Meta-Analysis",
          source: "Journal of Organizational Behavior",
          year: "2017",
          category: "Leadership and Well-Being",
          description:
            "A meta-analysis connecting constructive and destructive leadership styles with follower mental health and job performance outcomes.",
          url: "https://doi.org/10.1002/job.2124",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Psychological Safety: A Meta-Analytic Review and Extension",
          source: "Personnel Psychology",
          year: "2017",
          category: "Psychological Safety",
          description:
            "A meta-analysis synthesizing evidence on the antecedents and outcomes of psychological safety across individuals, teams, and organizations.",
          url: "https://doi.org/10.1111/peps.12183",
          type: "meta-analysis",
          credibility: "peer-reviewed"
        },
        {
          title: "Psychological Safety and Learning Behavior in Work Teams",
          source: "Administrative Science Quarterly",
          year: "1999",
          category: "Team Learning",
          description:
            "A foundational field study connecting team psychological safety with learning behavior and showing how leader coaching and context contribute to it.",
          url: "https://doi.org/10.2307/2666999",
          type: "study",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "workforce-guidance",
      eyebrow: "CURRENT WORKFORCE EVIDENCE",
      title: "Workforce Surveys and Action Frameworks",
      description:
        "Current workforce surveys help organizations understand employee experience, while public-health frameworks translate evidence into actions leaders can take. Survey findings describe populations and should not be treated as diagnoses of any one organization.",
      articles: [
        {
          title: "State of the Global Workplace: 2026 Report",
          source: "Gallup",
          year: "2026",
          category: "Global Workforce Survey",
          description:
            "Gallup's current global report, based on 2025 data, tracks employee engagement, life evaluation, daily emotions, and labor-market experiences across countries and regions.",
          url: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
          type: "survey",
          credibility: "institutional"
        },
        {
          title: "2025 Work in America Survey: Working in a Time of Change",
          source: "American Psychological Association",
          year: "2025",
          category: "U.S. Workforce Survey",
          description:
            "A national survey of more than 2,000 U.S. working adults examining organizational change, workplace mental health, trust, and gaps between leadership and frontline experience.",
          url: "https://www.apa.org/pubs/reports/work-in-america/2025/full-report-working-times-change",
          type: "survey",
          credibility: "institutional"
        },
        {
          title: "Framework for Workplace Mental Health & Well-Being",
          source: "U.S. Surgeon General",
          year: "2022",
          category: "Workplace Framework",
          description:
            "A practical framework organized around five essentials: protection from harm, connection and community, work-life harmony, mattering at work, and opportunity for growth.",
          url: "https://www.hhs.gov/surgeongeneral/reports-and-publications/workplace-well-being/index.html",
          type: "framework",
          credibility: "institutional"
        },
        {
          title: "Mental Health at Work: Policy Brief",
          source: "World Health Organization and International Labour Organization",
          year: "2022",
          category: "Policy Guidance",
          description:
            "Evidence-informed guidance for governments, employers, workers, and their organizations on preventing risks, protecting mental health, and supporting participation at work.",
          url: "https://www.who.int/publications-detail-redirect/9789240057944",
          type: "policy-brief",
          credibility: "institutional"
        }
      ]
    }
  ],

  evidenceNote:
    "Research findings vary by population, context, intervention, and study quality. This library is educational and is not medical advice. Performance Rhythm uses the evidence to inform program design—not to guarantee individual or organizational outcomes.",

  futureSection: {
    title: "Turn Evidence Into Practical Action",
    description:
      "The research is most useful when it is paired with the realities of your people, roles, workload, and culture. We can help you identify an appropriate starting point and define what responsible measurement should look like.",
    cta: "Schedule a Conversation"
  }
};
