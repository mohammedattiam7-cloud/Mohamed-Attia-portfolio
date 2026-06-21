import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mohamed",
  lastName: "Attia",
  name: `Mohamed Attia`,
  role: "UI/UX Designer",
  avatar: "/images/profile.PNG",
  email: "example@gmail.com",
  location: "Africa/Cairo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Arabic"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mohamed-atia1/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/_mohamd_ahemd/",
    essential: false,
  },
  {
    name: "Dribbble",
    icon: "dribbble",
    link: "https://dribbble.com/mohammed-attia",
    essential: true,
  },
  {
    name: "Behance",
    icon: "behance",
    link: "https://www.behance.net/mohamedatia11",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Crafting Digital Experiences<br />That Make Sense</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Portfolio</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/tappya-restaurant-pos",
  },
  subline: (
    <>
    I'm a UI/UX Designer based in Egypt, focused on creating user-centered digital products<br />that solve real problems and deliver smooth, meaningful experiences.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Mohamed Attia is a UI/UX Designer based in Egypt with 4 years of experience. I design digital products that feel intuitive and actually solve real problems — not just look good. I enjoy taking messy, complex challenges and turning them into clear, simple experiences. My approach mixes research, strategy, and visual design to keep both users and the business happy.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Current Work Experience",
    experiences: [
      {
        company: "Tappya",
        timeframe: "May 2025 – Present",
        role: "UI/UX Designer",
        achievements: [
          <>
            Lead designer for a full B2B SaaS ecosystem (POS, ERP, KDS, digital menus), owning the product from MVP to V2 across web, iOS, and Android.
          </>,
          <>
            Built a scalable design system with tokens and Figma variables, and designed AI-powered F&B analytics backed by competitor and user research across MENA.
          </>,
        ],
        images: [],
      },
      {
        company: "OO Design Community",
        timeframe: "Jul 2025 – Present",
        role: "Design Systems Mentor · Volunteer",
        achievements: [
          <>
            Mentored 30+ designers across 3 training rounds on design tokens and scalable system architecture.
          </>,
          <>
            Led deep-dive sessions that bridged the gap between UI design and developer handoff, clearing common misconceptions around tokens and components.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University Of Fayoum",
        description: <>Bachelor of Art Education</>,
      },
      {
        name: "Information Technology Institute (ITI)",
        description: <>UI/UX Design Track</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "UI/UX Design",
        description: (
          <>Designing complex digital products across web, iOS, and Android — from research to high-fidelity UI.</>
        ),
        tags: [
          {
            name: "Figma",
          },
          {
            name: "Prototyping",
          },
          {
            name: "Wireframing",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "UX Architecture",
        description: (
          <>Structuring complex flows with heuristic evaluation, IA, and JTBD.</>
        ),
        tags: [
          {
            name: "Heuristic Evaluation",
          },
          {
            name: "Information Architecture",
          },
          {
            name: "User Flows",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
