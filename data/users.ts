import type { User } from "@/types/user";

export const currentUser: User = {
  id: "user-001",
  name: "Aarav Mehta",
  email: "aarav.mehta@bitscale.io",
  role: "Growth Lead",
  company: "Bitscale",
  location: "Bengaluru, India",
  initials: "AM",
};

export const teamMembers: User[] = [
  currentUser,
  {
    id: "user-002",
    name: "Nina Rao",
    email: "nina.rao@bitscale.io",
    role: "Operations Manager",
    company: "Bitscale",
    location: "Mumbai, India",
    initials: "NR",
  },
  {
    id: "user-003",
    name: "Kabir Sethi",
    email: "kabir.sethi@bitscale.io",
    role: "Customer Success",
    company: "Bitscale",
    location: "Delhi, India",
    initials: "KS",
  },
  {
    id: "user-004",
    name: "Maya Iyer",
    email: "maya.iyer@bitscale.io",
    role: "Product Analyst",
    company: "Bitscale",
    location: "Pune, India",
    initials: "MI",
  },
];

export const peopleDirectory: User[] = [
  {
    id: "person-001",
    name: "Sarah Chen",
    email: "sarah.chen@northstar.ai",
    role: "VP of Marketing",
    company: "Northstar AI",
    location: "San Francisco, USA",
    initials: "SC",
  },
  {
    id: "person-002",
    name: "Daniel Foster",
    email: "daniel.foster@lighthouse.co",
    role: "Head of Demand Gen",
    company: "Lighthouse",
    location: "Austin, USA",
    initials: "DF",
  },
  {
    id: "person-003",
    name: "Anika Sharma",
    email: "anika.sharma@vertexcloud.com",
    role: "Director of Growth",
    company: "Vertex Cloud",
    location: "London, UK",
    initials: "AS",
  },
  {
    id: "person-004",
    name: "Ethan Brooks",
    email: "ethan.brooks@orbithealth.com",
    role: "Founder",
    company: "Orbit Health",
    location: "New York, USA",
    initials: "EB",
  },
  {
    id: "person-005",
    name: "Priya Nair",
    email: "priya.nair@finflow.in",
    role: "Marketing Lead",
    company: "FinFlow",
    location: "Bengaluru, India",
    initials: "PN",
  },
];
