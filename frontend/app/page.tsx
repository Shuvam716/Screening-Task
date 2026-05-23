"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Course = {
  id: string;
  name: string;
  category: string;
  instructor: string;
  duration: string;
  rating: number;
  modules: number;
  description: string;
  image: string;
  type: string;
};

const COURSES: Course[] = [
  { 
    id: "1", name: "AI for Lawyers & Law Students", category: "Legal Tech", instructor: "Alice Smith", duration: "12 weeks", rating: 4.8,
    modules: 13, type: "FULL COURSE",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    description: "The legal profession is being reshaped by AI. This course teaches you exactly how to use it - from the fundamentals to advanced workflows that save hours, sharpen your drafts, and make you the lawyer clients can't afford to replace."
  },
  { 
    id: "2", name: "Legal Freelancing Mastery Program", category: "Career", instructor: "Bob Johnson", duration: "10 weeks", rating: 4.7,
    modules: 17, type: "FULL COURSE",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    description: "From picking your niche and building a portfolio that makes clients say \"wow\", to mastering Upwork, Fiverr, and LinkedIn. Learn to set up payment systems, onboarding, and sustainable freelance practices."
  },
  { 
    id: "3", name: "Contract Drafting & Negotiation", category: "Law", instructor: "Charlie Brown", duration: "8 weeks", rating: 4.9,
    modules: 10, type: "FULL COURSE",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    description: "Master the art of drafting watertight contracts and negotiating favorable terms for your clients. We cover boilerplate clauses, indemnification, IP rights, and practical negotiation strategies."
  },
  { 
    id: "4", name: "Corporate Compliance 101", category: "Business Law", instructor: "Diana Prince", duration: "6 weeks", rating: 4.6,
    modules: 8, type: "CRASH COURSE",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    description: "Navigate the complex landscape of corporate compliance. Learn about data privacy regulations, anti-money laundering frameworks, and how to build effective compliance programs from scratch."
  },
  { 
    id: "5", name: "Advanced React Patterns", category: "Web Dev", instructor: "Eve Davis", duration: "4 weeks", rating: 4.9,
    modules: 6, type: "MASTERCLASS",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    description: "Take your React skills to the next level. Dive deep into custom hooks, render props, compound components, and performance optimization techniques used by top engineering teams."
  },
  { 
    id: "6", name: "Machine Learning Basics", category: "Data Science", instructor: "Frank Miller", duration: "8 weeks", rating: 4.5,
    modules: 12, type: "FULL COURSE",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    description: "A practical introduction to machine learning algorithms. Build predictive models using Python, understand supervised and unsupervised learning, and deploy your first AI application."
  },
  { 
    id: "7", name: "Graphic Design Fundamentals", category: "Design", instructor: "Grace Lee", duration: "6 weeks", rating: 4.7,
    modules: 9, type: "FULL COURSE",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    description: "Learn the core principles of design: typography, color theory, layout, and composition. Master industry-standard tools and build a stunning portfolio from the ground up."
  },
  { 
    id: "8", name: "Kubernetes for Beginners", category: "DevOps", instructor: "Hank Pym", duration: "5 weeks", rating: 4.6,
    modules: 7, type: "CRASH COURSE",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    description: "Demystify container orchestration. Learn how to deploy, scale, and manage containerized applications using Kubernetes. We cover pods, services, deployments, and ingress controllers."
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [apiResponse, setApiResponse] = useState<{success: boolean; text: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    const q = search.toLowerCase();
    return COURSES.filter(c => 
      c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse(null);
    try {
      const res = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone, message })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setApiResponse({ success: true, text: data.message });
      } else {
        setApiResponse({ success: false, text: data.error || "An error occurred." });
      }
    } catch (err) {
      setApiResponse({ success: false, text: "Network Error: Could not connect to the server." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Task 1: Course Listing */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
              <p className="text-[#5b3256] text-xs font-bold tracking-[0.2em] uppercase mb-2">WHAT WE OFFER</p>
              <h1 className="text-4xl md:text-[48px] font-heading font-black text-gray-900 mb-3">
                Our Courses
              </h1>
              <p className="text-gray-600 max-w-2xl text-base">
                Not another online course you'll abandon by week two. Every programme at Meta School is built to finish, apply, and to change how you practice law.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <input 
              type="text"
              placeholder="Search courses or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-gray-900 shadow-sm"
            />
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-[20px] border border-gray-200 hover:-translate-y-1 transition-transform duration-300 shadow-editorial flex flex-col group overflow-hidden">
                  {/* Top Image Section */}
                  <div 
                    className="h-64 relative p-6 flex flex-col justify-end bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to top, rgba(30, 27, 46, 0.95), rgba(30, 27, 46, 0.2)), url(${course.image})` }}
                  >
                    <div className="absolute top-4 right-4 bg-[#3d3248] bg-opacity-80 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {course.modules} MODULES
                    </div>
                    <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1">{course.type}</p>
                    <h2 className="font-heading text-2xl font-bold text-white leading-tight">
                      {course.name}
                    </h2>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        {course.modules} modules
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Practical & hands-on
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <Link href={`/course/${course.id}/enrol`}>
                        <button className="editorial-gradient text-white text-sm font-bold px-6 py-2.5 rounded-lg transition hover:opacity-90">
                          Enrol Now
                        </button>
                      </Link>
                      <Link href={`/course/${course.id}`}>
                        <button className="text-gray-900 text-sm font-bold flex items-center gap-1 hover:underline transition">
                          About Course <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-2xl font-heading font-bold text-gray-700 mb-2">No courses found</p>
              <p className="text-gray-500">Try adjusting your search query.</p>
            </div>
          )}
        </section>

        {/* Task 3: Floating Chat Box */}
        <div 
          className={`fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-[400px] bg-white p-6 rounded-2xl border border-gray-200 shadow-editorial z-40 transition-all duration-300 transform origin-bottom-right ${
            isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl font-black text-gray-900">Send a Message</h2>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number (10 digits)</label>
              <input 
                type="text"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-gray-900 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
              <textarea 
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition min-h-[100px] text-gray-900 text-sm resize-none"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 editorial-gradient disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {apiResponse && (
            <div className={`mt-4 p-3 rounded-lg border flex items-start gap-2 ${
              apiResponse.success 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <div className="flex-1">
                <p className="font-bold text-sm">{apiResponse.success ? "Success" : "Error"}</p>
                <p className="text-xs opacity-90 mt-0.5">{apiResponse.text}</p>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-8 right-8 w-14 h-14 editorial-gradient rounded-full shadow-editorial flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
          aria-label="Toggle chat"
        >
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          )}
        </button>

      </div>
    </main>
  );
}
