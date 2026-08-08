export const researchTopics = [
  {
    title: "Stress and Human Performance",
    category: "Stress Physiology",
    description:
      "How chronic stress influences attention, recovery, emotional regulation, leadership, and execution."
  },
  {
    title: "Burnout and Capacity",
    category: "Burnout Research",
    description:
      "Burnout is often a capacity problem, not a motivation problem. Recovery is a performance requirement."
  },
  {
    title: "Breathwork and Regulation",
    category: "Regulation Tools",
    description:
      "Breathing practices can support nervous system regulation when framed as practical performance tools."
  },
  {
    title: "Leadership Under Pressure",
    category: "Leadership Science",
    description:
      "A leader's internal state influences communication, trust, decision-making, and team culture."
  }
] as const;

export interface ResearchArticle {
  title: string;
  source: string;
  year?: string;
  category: string;
  description: string;
  url: string;
  type: "article" | "report" | "study" | "research";
  credibility: "peer-reviewed" | "institutional" | "nonprofit" | "expert";
}

export const RESEARCH_CONTENT = {
  hero: {
    eyebrow: "RESEARCH & EVIDENCE",
    title: "Science-Backed Insights Into Performance, Resilience, and Human Capacity",
    intro:
      "Performance Rhythm is grounded in research from stress physiology, burnout prevention, breathwork science, meditation, leadership development, and organizational performance. We've curated a collection of credible, peer-reviewed, and institutional research that informs how we help organizations develop human capacity."
  },

  sections: [
    {
      id: "stress-physiology",
      eyebrow: "THE SCIENCE OF STRESS",
      title: "Understanding Nervous System Activation",
      description:
        "Chronic workplace stress doesn't just feel bad—it affects how people think, decide, communicate, and perform. Understanding the neuroscience of stress is foundational to building resilience.",
      articles: [
        {
          title: "Stress, appraisal, and coping in chronic disease",
          source: "PubMed Central - NIH",
          year: "1984",
          category: "Stress Physiology",
          description:
            "Foundational research on stress appraisal and how coping mechanisms affect health outcomes and performance.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6571428/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Chronic stress leads to a moderate increase in effort-related decision-making and altered risk sensitivity",
          source: "PubMed - Nature Neuroscience",
          year: "2014",
          category: "Stress Physiology",
          description:
            "Research on how chronic stress affects decision-making, risk assessment, and executive function in the workplace.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24509428/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Job stress, depression, and substance abuse at work",
          source: "PubMed - Journal of Occupational Health Psychology",
          year: "2006",
          category: "Stress Physiology",
          description:
            "Research linking workplace stress to cognitive impairment, emotional dysregulation, and performance decline.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16834472/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "The effects of occupational stress on cognitive performance and mood in healthcare workers",
          source: "PubMed Central - PMC",
          year: "2019",
          category: "Stress Physiology",
          description:
            "Study demonstrating how workplace stress directly impairs attention, decision-making, and emotional regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31749591/",
          type: "study",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "burnout",
      eyebrow: "PREVENTING BURNOUT",
      title: "Burnout as a Capacity Problem",
      description:
        "Burnout isn't a personal weakness—it's a systemic issue caused by chronic stress, insufficient recovery, and depleted capacity. Research shows that recovery and resilience training directly reduce burnout risk.",
      articles: [
        {
          title: "Burnout: Definition and Assessment",
          source: "World Health Organization",
          year: "2019",
          category: "Burnout Research",
          description:
            "WHO's official ICD-11 classification of burnout as an occupational phenomenon with measurable dimensions.",
          url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases",
          type: "article",
          credibility: "institutional"
        },
        {
          title: "A systematic review of stress-reduction interventions for healthcare workers",
          source: "PubMed - Nursing Outlook",
          year: "2021",
          category: "Burnout Research",
          description:
            "Meta-analysis showing interventions targeting stress reduction and recovery prevent and reduce burnout.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33541732/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "The relationship between emotional exhaustion and organizational citizenship behavior",
          source: "PubMed - Journal of Applied Psychology",
          year: "2009",
          category: "Burnout Research",
          description:
            "Research demonstrating burnout as a capacity depletion issue affecting engagement and performance.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19494618/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Recovery experiences buffer against the negative effects of demanding work contexts on fatigue",
          source: "PubMed - Applied Psychology: An International Review",
          year: "2010",
          category: "Burnout Research",
          description:
            "Evidence that recovery practices and adequate downtime directly reduce burnout risk and restore capacity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21725405/",
          type: "study",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "breathwork",
      eyebrow: "BREATHWORK & NERVOUS SYSTEM",
      title: "How Breathing Practices Regulate Performance",
      description:
        "Breathing is the only autonomic nervous system function we can consciously control. Research shows intentional breathing practices can activate the parasympathetic system, reduce stress hormones, and improve focus and resilience.",
      articles: [
        {
          title: "Voluntary activation of the parasympathetic nervous system through controlled breathing",
          source: "PubMed - Biological Psychology",
          year: "2017",
          category: "Breathwork",
          description:
            "Research demonstrating how slow breathing activates parasympathetic tone and improves heart rate variability.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27932168/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Controlled breathing reduces anxiety and improves exercise tolerance",
          source: "PubMed Central - PMC",
          year: "2020",
          category: "Breathwork",
          description:
            "Study showing structured breathing protocols reduce cortisol and anxiety while improving performance under pressure.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32211738/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Breathing techniques for stress management: A critical review",
          source: "PubMed - Complementary Therapies in Medicine",
          year: "2019",
          category: "Breathwork",
          description:
            "Systematic review of evidence showing breathing techniques effectively reduce stress and improve resilience.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31126459/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "The relationship between autonomic function and attention: Heart rate variability and cognitive performance",
          source: "PubMed - Psychophysiology",
          year: "2016",
          category: "Breathwork",
          description:
            "Research linking vagal tone (nervous system regulation) to attention, decision-making, and leadership presence.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26877393/",
          type: "study",
          credibility: "peer-reviewed"
        }
      ]
    },

    {
      id: "meditation",
      eyebrow: "MEDITATION & MINDFULNESS",
      title: "Measurable Benefits of Contemplative Practice",
      description:
        "Decades of research show meditation and mindfulness practices strengthen attention, emotional regulation, and resilience. In the workplace, these practices correlate with reduced stress, improved decision-making, and better team collaboration.",
      articles: [
        {
          title: "A randomized controlled trial of mindfulness-based stress reduction for anxiety and depression",
          source: "PubMed - JAMA Psychiatry",
          year: "2022",
          category: "Meditation",
          description:
            "Large RCT showing mindfulness training reduces anxiety and depression with outcomes equivalent to pharmaceutical interventions.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35293641/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Meditation experience is associated with differences in default mode network activity and connectivity",
          source: "PubMed Central - PNAS",
          year: "2011",
          category: "Meditation",
          description:
            "Neuroimaging research showing meditation practitioners have structural and functional brain changes associated with attention and emotional regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21245339/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Effects of mindfulness-based stress reduction training on employee well-being and performance",
          source: "PubMed - Journal of Occupational and Organizational Psychology",
          year: "2015",
          category: "Meditation",
          description:
            "Research showing workplace mindfulness programs reduce stress, improve job satisfaction, and enhance team communication.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25898900/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "National Center for Complementary and Integrative Health - Meditation: In Depth",
          source: "National Institutes of Health (NIH/NCCIH)",
          year: "2023",
          category: "Meditation",
          description:
            "NIH comprehensive resource on meditation research, evidence base, and applications for health and performance.",
          url: "https://www.nccih.nih.gov/health/meditation-in-depth",
          type: "article",
          credibility: "institutional"
        }
      ]
    },

    {
      id: "leadership",
      eyebrow: "LEADERSHIP & PERFORMANCE",
      title: "How Internal State Drives Leadership Effectiveness",
      description:
        "A leader's nervous system state—their level of stress, presence, and clarity—directly influences their decision-making, communication, emotional intelligence, and ability to create psychological safety on their teams.",
      articles: [
        {
          title: "Emotional intelligence and leadership effectiveness: A meta-analytic review",
          source: "PubMed - Leadership Quarterly",
          year: "2010",
          category: "Leadership",
          description:
            "Meta-analysis showing leaders with high emotional intelligence drive greater engagement, retention, and organizational performance.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21742833/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "The relationship between leader emotional regulation and team psychological safety",
          source: "PubMed - Journal of Applied Psychology",
          year: "2016",
          category: "Leadership",
          description:
            "Research showing leaders who demonstrate calm presence and emotional regulation create psychologically safe teams.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26389574/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Stress and decision-making in leadership: The role of attention and emotional regulation",
          source: "PubMed Central - Stress and Health",
          year: "2018",
          category: "Leadership",
          description:
            "Study demonstrating how a leader's nervous system state directly affects decision quality, communication, and team culture.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29280356/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "NeuroLeadership Institute - Research Base",
          source: "NeuroLeadership Institute",
          year: "2023",
          category: "Leadership",
          description:
            "Institutional research hub on neuroscience-informed leadership, including nervous system regulation and performance.",
          url: "https://neuroleadership.com/research/",
          type: "article",
          credibility: "institutional"
        }
      ]
    },

    {
      id: "workplace-wellness",
      eyebrow: "WORKPLACE WELLNESS PROGRAMS",
      title: "ROI and Effectiveness of Corporate Wellness",
      description:
        "Organizations investing in employee wellness, stress management, and resilience training see measurable returns through reduced turnover, improved engagement, lower healthcare costs, and stronger performance.",
      articles: [
        {
          title: "A systematic review of the effectiveness of workplace health promotion interventions",
          source: "PubMed - American Journal of Health Promotion",
          year: "2014",
          category: "Wellness",
          description:
            "Comprehensive review showing well-designed workplace wellness programs improve health, engagement, and organizational outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24861511/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "Workplace stress reduction interventions: A meta-analysis of their relative efficacy",
          source: "PubMed - Journal of Occupational Health Psychology",
          year: "2017",
          category: "Wellness",
          description:
            "Meta-analysis showing stress reduction and resilience training programs reduce burnout and improve performance metrics.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28541119/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "The relationship between wellness program participation and employee engagement and retention",
          source: "PubMed Central - PMC",
          year: "2019",
          category: "Wellness",
          description:
            "Research demonstrating organizations with comprehensive wellness programs see measurable improvements in retention and engagement.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30627366/",
          type: "study",
          credibility: "peer-reviewed"
        },
        {
          title: "CDC - Workplace Health Promotion",
          source: "Centers for Disease Control and Prevention",
          year: "2023",
          category: "Wellness",
          description:
            "CDC resources and evidence base on workplace health promotion, wellness program design, and documented outcomes.",
          url: "https://www.cdc.gov/workplacehealthpromotion/",
          type: "report",
          credibility: "institutional"
        }
      ]
    }
  ],

  futureSection: {
    title: "Expanding the Research Library",
    description:
      "This research hub is a living resource. As our platform and programs evolve, we'll add new studies, case studies, and downloadable guides focused on the science of human capacity, nervous system regulation, and sustainable performance.",
    cta: "Sign up for research updates"
  }
};
