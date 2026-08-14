export interface BlogArticle {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image: string;
  aspectRatioClass: string;
  href: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-01",
    date: "JUN 24, 2026",
    category: "ENGINEERING",
    title: "Building HIPAA-Compliant Systems at Scale",
    description: "How we built a compliant healthcare platform handling 50K+ concurrent users.",
    image: "/images/blog1.png",
    aspectRatioClass: "aspect-square",
    href: "#article-01",
  },
  {
    id: "blog-02",
    date: "MAY 30, 2025",
    category: "DESIGN",
    title: "How We Reduced Cloud Costs by 40% for Enterprise Clients",
    description: "Strategic cloud optimization that delivered measurable ROI for enterprise systems.",
    image: "/images/blog2.png",
    aspectRatioClass: "aspect-[0.72/1]",
    href: "#article-02",
  },
  {
    id: "blog-03",
    date: "APR 7, 2026",
    category: "DEVELOPMENT",
    title: "The Future of AI-Powered Development Workflows",
    description: "A practical look at responsive layouts, clean components & the CMS structure.",
    image: "/images/blog3.png",
    aspectRatioClass: "aspect-square",
    href: "#article-03",
  },
  {
    id: "blog-04",
    date: "MAR 23, 2026",
    category: "BRANDING",
    title: "Creating A Digital Presence That Feels Clear",
    description: "How strong messaging, consistent visuals, and a focused website experience.",
    image: "/images/blog4.png",
    aspectRatioClass: "aspect-[0.75/1]",
    href: "#article-04",
  },
];

