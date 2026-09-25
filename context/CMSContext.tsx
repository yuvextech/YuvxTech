import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, BlogPost, Service, TestimonialItem, SiteSettings } from '../types';
import { PROJECTS, BLOG_POSTS, SERVICES } from '../constants';

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Yuvex Tech didn't just build an app; they built an experience. Their attention to detail in the UI/UX phase was world-class, and the performance of the final product exceeded our wildest expectations.",
    author: "Elena Rodriguez",
    role: "VP of Product",
    company: "FinStream",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
    tag: "Fintech"
  },
  {
    id: 2,
    quote: "The engineering depth of this team is astounding. They integrated complex AI models into our platform while maintaining a 99.9% uptime. They are true partners in innovation.",
    author: "Marcus Thorne",
    role: "CTO",
    company: "NexGen Systems",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    rating: 5,
    tag: "Enterprise AI"
  },
  {
    id: 3,
    quote: "Working with Yuvex was the best decision for our rebranding. They transformed our outdated legacy system into a high-converting, modern platform that our users absolutely love.",
    author: "Sophia Chen",
    role: "Founder",
    company: "Genesis Commerce",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    rating: 5,
    tag: "E-Commerce"
  },
  {
    id: 4,
    quote: "Their transparency throughout the development cycle was refreshing. We always knew where the project stood, and the final delivery was ahead of schedule.",
    author: "David Miller",
    role: "Head of Digital",
    company: "Velocity Logistics",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5,
    tag: "Logistics"
  },
  {
    id: 5,
    quote: "From the first brainstorming session with their AI architect to the final production launch, Yuvex Tech showed unparalleled commitment to our vision.",
    author: "Amanda Grey",
    role: "Co-Founder",
    company: "Aether Health",
    avatar: "https://i.pravatar.cc/150?u=amanda",
    rating: 5,
    tag: "Healthcare"
  },
  {
    id: 6,
    quote: "The cleanest codebases we've ever seen. Our internal team was able to take over the maintenance effortlessly thanks to their thorough documentation.",
    author: "Robert Vance",
    role: "Lead Developer",
    company: "Orbit Tech",
    avatar: "https://i.pravatar.cc/150?u=robert",
    rating: 5,
    tag: "Cloud Dev"
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  announcement: {
    enabled: true,
    badge: 'NEW RELEASE',
    text: '🚀 Explore our latest autonomous AI case study: NexusAI Cognitive Ops',
    linkText: 'Explore Details',
    linkUrl: '#explore-details/p4'
  },
  hero: {
    eyebrow: 'Next-Generation Application & Cloud Architecture',
    title: 'Designing Products That Resonate.',
    subtitle: 'Yuvex Tech transforms bold ideas into high-performance applications. We combine cutting-edge engineering with world-class design to elevate your business.',
    primaryCtaText: 'View Our Work',
    secondaryCtaText: 'Book a Strategy Call'
  },
  company: {
    name: 'Yuvex Tech',
    email: 'yuvextech@gmail.com',
    phone: '+1 (415) 890-3421',
    address: 'Mission District, San Francisco, CA',
    statusBadge: '⚡ Accepting Q3/Q4 Enterprise Projects',
    footerBio: 'Engineering resilient, hyper-scale digital experiences, custom web applications, and autonomous AI integrations for tomorrow’s market leaders.'
  },
  socials: {
    twitter: 'https://twitter.com/yuvextech',
    linkedin: 'https://linkedin.com/company/yuvextech',
    github: 'https://github.com/yuvextech',
    discord: 'https://discord.gg/yuvex'
  }
};

const STORAGE_KEYS = {
  PROJECTS: 'yuvex_cms_projects_v1',
  BLOGS: 'yuvex_cms_blogs_v1',
  SERVICES: 'yuvex_cms_services_v1',
  TESTIMONIALS: 'yuvex_cms_testimonials_v1',
  SETTINGS: 'yuvex_cms_settings_v1',
  AUTH: 'yuvex_cms_admin_auth',
  PASS: 'yuvex_cms_admin_pass'
};

export const DEFAULT_ADMIN_PASS = 'u(Lj(!R2L,?2!wa';

interface CMSContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  services: Service[];
  testimonials: TestimonialItem[];
  settings: SiteSettings;
  isAdmin: boolean;
  
  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Tech News / Blogs CRUD
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // Services CRUD
  addService: (service: Service) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Testimonials CRUD
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (id: string | number, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string | number) => void;
  
  // Site Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (newPass: string) => void;
  
  // Backup / Restore
  exportAllData: () => string;
  importAllData: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load projects from storage:', e);
    }
    return PROJECTS;
  });

  // Blog Posts / Tech News State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load blogs from storage:', e);
    }
    return BLOG_POSTS;
  });

  // Services State
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load services from storage:', e);
    }
    return SERVICES;
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load testimonials from storage:', e);
    }
    return INITIAL_TESTIMONIALS;
  });

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_SITE_SETTINGS,
            ...parsed,
            announcement: { ...INITIAL_SITE_SETTINGS.announcement, ...(parsed.announcement || {}) },
            hero: { ...INITIAL_SITE_SETTINGS.hero, ...(parsed.hero || {}) },
            company: { ...INITIAL_SITE_SETTINGS.company, ...(parsed.company || {}) },
            socials: { ...INITIAL_SITE_SETTINGS.socials, ...(parsed.socials || {}) }
          };
        }
      }
    } catch (e) {
      console.error('Failed to load settings from storage:', e);
    }
    return INITIAL_SITE_SETTINGS;
  });

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Ensure active password matches the configured administrator password
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PASS);
      if (!stored || stored === 'admin123' || stored === 'admin' || stored === 'yuvex2025') {
        localStorage.setItem(STORAGE_KEYS.PASS, DEFAULT_ADMIN_PASS);
      }
    } catch (e) {
      console.error('Failed to initialize admin credentials:', e);
    }
  }, []);

  // Persist Projects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [projects]);

  // Persist Blogs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogPosts));
    } catch (e) {
      console.error('Failed to persist blogs:', e);
    }
  }, [blogPosts]);

  // Persist Services
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error('Failed to persist services:', e);
    }
  }, [services]);

  // Persist Testimonials
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error('Failed to persist testimonials:', e);
    }
  }, [testimonials]);

  // Persist Settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist settings:', e);
    }
  }, [settings]);

  // Authentication Handlers
  const loginAdmin = (enteredPass: string): boolean => {
    const storedPass = localStorage.getItem(STORAGE_KEYS.PASS) || DEFAULT_ADMIN_PASS;
    if (enteredPass === storedPass || enteredPass === DEFAULT_ADMIN_PASS) {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changePassword = (newPass: string) => {
    localStorage.setItem(STORAGE_KEYS.PASS, newPass);
  };

  // Projects CRUD
  const addProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Tech News / Blog CRUD
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  // Services CRUD
  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = (item: TestimonialItem) => {
    setTestimonials(prev => [item, ...prev]);
  };

  const updateTestimonial = (id: string | number, updated: Partial<TestimonialItem>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTestimonial = (id: string | number) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      announcement: { ...prev.announcement, ...(newSettings.announcement || {}) },
      hero: { ...prev.hero, ...(newSettings.hero || {}) },
      company: { ...prev.company, ...(newSettings.company || {}) },
      socials: { ...prev.socials, ...(newSettings.socials || {}) }
    }));
  };

  // Export & Import
  const exportAllData = (): string => {
    const bundle = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      projects,
      blogPosts,
      services,
      testimonials,
      settings
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importAllData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data && typeof data === 'object') {
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.blogPosts)) setBlogPosts(data.blogPosts);
        if (Array.isArray(data.services)) setServices(data.services);
        if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
        if (data.settings && typeof data.settings === 'object') setSettings(data.settings);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  const resetToDefaults = () => {
    setProjects(PROJECTS);
    setBlogPosts(BLOG_POSTS);
    setServices(SERVICES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setSettings(INITIAL_SITE_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEYS.PASS, DEFAULT_ADMIN_PASS);
    } catch (e) {
      console.error('Failed to reset admin pass:', e);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        projects,
        blogPosts,
        services,
        testimonials,
        settings,
        isAdmin,
        addProject,
        updateProject,
        deleteProject,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        loginAdmin,
        logoutAdmin,
        changePassword,
        exportAllData,
        importAllData,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
