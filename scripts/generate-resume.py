import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak

def generate_resume(output_path="public/Moaz-Shahin-Resume.pdf"):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=50,
        rightMargin=50,
        topMargin=46,
        bottomMargin=46,
    )
    styles = {
        'Name': ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#111827'), spaceAfter=2),
        'SubTitle': ParagraphStyle('SubTitle', fontName='Helvetica', fontSize=11, leading=15, textColor=colors.HexColor('#4b5563'), spaceAfter=5),
        'Contact': ParagraphStyle('Contact', fontName='Helvetica', fontSize=9.5, leading=14, textColor=colors.HexColor('#1f2937'), spaceAfter=12),
        'SectionHeader': ParagraphStyle('SectionHeader', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor('#111827'), spaceBefore=9, spaceAfter=4, keepWithNext=True),
        'RoleTitle': ParagraphStyle('RoleTitle', fontName='Helvetica-Bold', fontSize=9.5, leading=13.5, textColor=colors.HexColor('#111827'), spaceBefore=6, spaceAfter=2.5, keepWithNext=True),
        'Body': ParagraphStyle('Body', fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor('#374151'), spaceAfter=4),
        'Bullet': ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor('#374151'), leftIndent=12, firstLineIndent=-8, spaceAfter=2),
        'SkillsCategory': ParagraphStyle('SkillsCategory', fontName='Helvetica', fontSize=9, leading=13.5, textColor=colors.HexColor('#374151'), spaceAfter=3.5),
    }
    story = []
    story.append(Paragraph("Moaz Shahin (Cody Axton)", styles['Name']))
    story.append(Paragraph("AI Automation Specialist &amp; Funnel Engineer", styles['SubTitle']))
    contact_text = (
        'Egypt (Remote) &nbsp;|&nbsp; codyaxton@outlook.com<br/>'
        '<a href="https://www.linkedin.com/in/moaz-shahin/"><font color="#1d4ed8">LinkedIn Profile</font></a> &nbsp;|&nbsp; '
        '<a href="https://codyaxton.netlify.app/"><font color="#1d4ed8">Portfolio Website</font></a> &nbsp;|&nbsp; '
        '<a href="https://www.upwork.com/freelancers/~0172d37f52443b52d9"><font color="#1d4ed8">Upwork Portfolio</font></a>'
    )
    story.append(Paragraph(contact_text, styles['Contact']))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#e5e7eb'), spaceAfter=6))
    story.append(Paragraph("PROFESSIONAL SUMMARY", styles['SectionHeader']))
    summary_text = (
        "Results-driven AI Automation Specialist and Funnel Engineer with 6+ years of experience "
        "designing and implementing advanced automation systems, high-converting sales funnels, and "
        "scalable AI-driven infrastructures. Specialized in GoHighLevel (GHL), n8n, Make.com, and Zapier "
        "to build complete business ecosystems that automate lead generation, client communication, and "
        "revenue operations. Proven track record of increasing operational efficiency by 30–40% and "
        "delivering high-ROI sales funnels and automation architectures from scratch."
    )
    story.append(Paragraph(summary_text, styles['Body']))
    story.append(Spacer(1, 3))
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", styles['SectionHeader']))
    # 1. Fusion 44X
    story.append(Paragraph("Lead Funnel Engineer &amp; Automation Architect — Fusion 44X (2026)", styles['RoleTitle']))
    story.append(Paragraph("• Architected the flagship Fusion 44X direct-response funnel backed by Supabase database and a real-time metrics dashboard.", styles['Bullet']))
    story.append(Paragraph("• Engineered full Meta event tracking with per-visit session creation and lead source attribution across all acquisition channels.", styles['Bullet']))
    story.append(Paragraph("• Built automated multi-channel follow-up sequences triggered instantly after form and calendar submissions, ensuring zero missed leads.", styles['Bullet']))

    # 2. LingoVantage
    story.append(Paragraph("Full-Stack LMS &amp; Automation Architect — LingoVantage (2025 – 2026)", styles['RoleTitle']))
    story.append(Paragraph("• Engineered a comprehensive online English learning platform with automated signup/login and tiered student portals (A1, A2, etc.).", styles['Bullet']))
    story.append(Paragraph("• Built Supabase database infrastructure with an admin dashboard for granting and revoking student access.", styles['Bullet']))
    story.append(Paragraph("• Deployed an auto-graded placement exam, interactive tests, and homework submission pipelines with real-time Telegram-to-WhatsApp registration dispatch.", styles['Bullet']))

    # 2. Mortal VA
    story.append(Paragraph("Founder &amp; AI Automation Specialist — Mortal VA (2023 – Present)", styles['RoleTitle']))
    story.append(Paragraph("• Founded and scaled a virtual assistant agency focused on AI-powered automation solutions for global clients.", styles['Bullet']))
    story.append(Paragraph("• Built and managed a remote team handling operations, automation, and client support.", styles['Bullet']))
    story.append(Paragraph("• Developed AI chatbots and voice agents for lead generation, customer service, and appointment setting.", styles['Bullet']))
    story.append(Paragraph("• Created complete automation systems including CRM pipelines, onboarding flows, and internal workflows.", styles['Bullet']))
    story.append(Paragraph("• Built 5+ automated websites and funnels with integrated lead capture and follow-up systems.", styles['Bullet']))
    story.append(Paragraph("• Delivered measurable results including 30–40% efficiency improvements and cost reduction.", styles['Bullet']))

    # 3. GMC LLC
    story.append(Paragraph("AI Automation Consultant — GMC LLC (2024 – 2026)", styles['RoleTitle']))
    story.append(Paragraph("• Built and launched full business infrastructure from scratch using GoHighLevel, n8n, Make.com, Zapier, and Hostinger.", styles['Bullet']))
    story.append(Paragraph("• Developed a complete website and funnel ecosystem including Book-a-Call funnel (with upsell/downsell), eBook funnel, and high-ticket offer funnel.", styles['Bullet']))
    story.append(Paragraph("• Fully configured GoHighLevel CRM including smart lists, tagging, pipelines, calendars, forms, and products.", styles['Bullet']))
    story.append(Paragraph("• Integrated AI agents, WhatsApp automation, phone systems, and marketing campaigns.", styles['Bullet']))
    story.append(Paragraph("• Designed advanced automation workflows for lead management, follow-ups, and onboarding.", styles['Bullet']))
    story.append(Paragraph("• Recruited and managed a team for invoicing, customer service, and administrative operations.", styles['Bullet']))
    story.append(Paragraph("• Delivered a fully automated, scalable system supporting business growth.", styles['Bullet']))

    # 4. Helping Hands Systems
    story.append(Paragraph("AI Automation Specialist — Helping Hands Systems (2025)", styles['RoleTitle']))
    story.append(Paragraph("• Designed and implemented automation systems for digital business operations.", styles['Bullet']))
    story.append(Paragraph("• Built workflows for lead generation, onboarding, and communication.", styles['Bullet']))
    story.append(Paragraph("• Integrated APIs and tools to streamline operations.", styles['Bullet']))

    story.append(PageBreak())
    story.append(Paragraph("PROFESSIONAL EXPERIENCE (CONTINUED)", styles['SectionHeader']))

    # 5. Total Post N Print
    story.append(Paragraph("Sales &amp; Client Operations Lead — Total Post N Print (2024 – 2025)", styles['RoleTitle']))
    story.append(Paragraph("• Managed client relationships, closed enterprise deals, and handled invoicing, support, and internal coordination.", styles['Bullet']))
    story.append(Paragraph("• Mentored and trained incoming team members in pipeline management and support.", styles['Bullet']))

    # 6. Real Estate & Solar
    story.append(Paragraph("Lead Generation &amp; Cold Outreach Specialist — Wholesale Real Estate &amp; Solar (2019 – 2022)", styles['RoleTitle']))
    story.append(Paragraph("• Generated high-quality leads and booked qualified appointments across real estate and solar sectors.", styles['Bullet']))
    story.append(Paragraph("• Mastered phone sales negotiation, establishing the core domain expertise used in voice AI agent scripting.", styles['Bullet']))

    story.append(Spacer(1, 3))

    # Core Skills
    story.append(Paragraph("CORE SKILLS", styles['SectionHeader']))
    story.append(Paragraph("<b>Automation &amp; AI:</b> GoHighLevel (GHL), n8n, Make.com, Zapier, AI Chatbots, Voice Agents, Prompt Engineering", styles['SkillsCategory']))
    story.append(Paragraph("<b>Systems &amp; Funnels:</b> High-Converting Sales Funnels, Fusion 44X Architecture, CRM Systems, Lead Routing", styles['SkillsCategory']))
    story.append(Paragraph("<b>Business &amp; Operations:</b> Team Leadership, Client Management, Project Execution, Revenue Operations", styles['SkillsCategory']))

    story.append(Spacer(1, 3))

    # Key Achievements
    story.append(Paragraph("KEY ACHIEVEMENTS", styles['SectionHeader']))
    story.append(Paragraph("• Delivered 15+ automation systems with measurable ROI and 30–40% efficiency gains", styles['Bullet']))
    story.append(Paragraph("• Built and deployed 6+ high-converting funnels including the flagship Fusion 44X Lead Engine", styles['Bullet']))
    story.append(Paragraph("• Developed 10+ advanced automation workflows and multi-branch communication pipelines", styles['Bullet']))
    story.append(Paragraph("• Built full end-to-end automation infrastructure for GMC LLC and international clients", styles['Bullet']))
    story.append(Paragraph("• 6+ years of combined experience in sales funnels, CRM engineering, and direct outreach", styles['Bullet']))

    story.append(Spacer(1, 3))

    # Languages
    story.append(Paragraph("LANGUAGES", styles['SectionHeader']))
    story.append(Paragraph("English: Fluent &nbsp;|&nbsp; Arabic: Native &nbsp;|&nbsp; German: Intermediate", styles['Body']))

    doc.build(story)
    print(f"Successfully generated {output_path}")

if __name__ == "__main__":
    generate_resume()
