export interface ProofItem {
  id: string
  title: string
  subtitle: string
  image: string
  description: string
  tags: string[]
  badge: string
}

export const tadarabProofs: ProofItem[] = [
  {
    id: 'language-branching',
    title: 'Lead Welcoming Emails with Language Filters & Branches',
    subtitle: 'GoHighLevel Multi-Conditional Language Routing Logic',
    image: '/tadarab/lead-welcoming-language-branches.png',
    badge: 'Language Filter Workflow',
    description:
      'Engineered multi-conditional branching logic inside GoHighLevel to detect incoming lead language preferences (Arabic vs. English). Dynamically routes contacts into personalized onboarding tracks with targeted email dispatches and automatic CRM tagging.',
    tags: ['GoHighLevel', 'Language Filters', 'Conditional Logic', 'Lead Nurture'],
  },
  {
    id: 'email-templates',
    title: 'Branded Dynamic Email Marketing Templates',
    subtitle: 'Custom Responsive Email Layouts in GoHighLevel',
    image: '/tadarab/email-templates.png',
    badge: 'Email Design & Automation',
    description:
      'Designed and configured conversion-focused, brand-aligned email templates within GoHighLevel for automated student onboarding, course promotions, event reminders, and personalized lead nurture sequences.',
    tags: ['Email Templates', 'GoHighLevel', 'Dynamic Tags', 'Automated Campaigns'],
  },
  {
    id: 'pipelines',
    title: 'Multi-Stage CRM Sales & Student Onboarding Pipelines',
    subtitle: 'Structured Deal & Opportunity Tracking Architecture',
    image: '/tadarab/pipelines.png',
    badge: 'CRM Pipeline Architecture',
    description:
      'Architected comprehensive GoHighLevel CRM sales and onboarding pipelines to track student lifecycles from initial opt-in through qualification, enrollment, and post-course engagement with stage-based triggers.',
    tags: ['CRM Architecture', 'Pipelines', 'Opportunity Stages', 'GHL CRM'],
  },
  {
    id: 'workflows',
    title: 'Enterprise Workflow Automation Directory',
    subtitle: 'Centralized Multi-Trigger Execution Trees',
    image: '/tadarab/workflows.png',
    badge: 'Backend Workflow Engine',
    description:
      'Built a centralized GoHighLevel automation infrastructure managing dozens of triggers — webhook integrations, form submissions, tag assignments, multi-channel notifications, and automated follow-ups running 24/7.',
    tags: ['Workflow Engine', 'Webhooks', 'Tag Automations', 'Autonomous Operations'],
  },
]