import { TeamHistorySection } from "@/components/team/TeamHistory"
import { TeamPhilosophySection } from "@/components/team/TeamPhilosophy"
import { StaffGridSection } from "@/components/team/StaffGrid"
import { Metadata } from "next"
import { Team, Staff } from "@pawn-stars/shared-types"

// Mock data for development - this would come from API in production
const mockTeam: Team = {
  id: "pawn-stars-main",
  slug: "pawn-stars",
  name: "Pawn Stars Chess Organization",
  shortName: "PS",
  description: "A premier chess organization dedicated to developing talent and achieving excellence in competitive chess.",
  foundedYear: 2021,
  history: [
    {
      year: 2024,
      title: "National Championship Victory",
      description: "Pawn Stars A Team claims the National Chess Championship title in a breathtaking final round.",
      achievements: ["National Champions 2024", "Best Team Performance"]
    },
    {
      year: 2023,
      title: "International Expansion",
      description: "Expanded our roster with 5 international players and established partnerships.",
      achievements: ["15 New International Players", "European Academy Partnership"]
    },
    {
      year: 2022,
      title: "Training Center Inauguration",
      description: "Opened our state-of-the-art training facility with dedicated analysis rooms.",
      achievements: ["New Training Facility", "Grandmaster Coaching Staff"]
    },
    {
      year: 2021,
      title: "Foundation Year",
      description: "Pawn Stars Chess Organization was founded with a mission to develop chess talent.",
      achievements: ["Organization Founded", "First 20 Players Signed"]
    }
  ],
  philosophy: "At Pawn Stars, we believe that chess is more than just a game—it's a discipline that builds character, strategic thinking, and lifelong skills.",
  values: ["Excellence", "Integrity", "Growth", "Teamwork", "Innovation", "Discipline"],
  isActive: true,
  createdAt: new Date("2021-01-15"),
  updatedAt: new Date("2024-01-01")
}

const mockStaff: Staff[] = [
  {
    id: "1",
    slug: "john-smith",
    firstName: "John",
    lastName: "Smith",
    role: "head_coach",
    bio: "Former Grandmaster with 15+ years of coaching experience.",
    photoUrl: "/staff/john-smith.jpg",
    email: "john.smith@pawnstars.com",
    specialization: ["Opening Theory", "Endgame Technique"],
    teamId: "pawn-stars-main",
    joinedAt: new Date("2021-02-01"),
    isActive: true,
    createdAt: new Date("2021-02-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "2",
    slug: "maria-garcia",
    firstName: "Maria",
    lastName: "Garcia",
    role: "assistant_coach",
    bio: "International Master specializing in tactical training.",
    photoUrl: "/staff/maria-garcia.jpg",
    email: "maria.garcia@pawnstars.com",
    specialization: ["Tactics", "Middlegame Strategy"],
    teamId: "pawn-stars-main",
    joinedAt: new Date("2021-06-01"),
    isActive: true,
    createdAt: new Date("2021-06-01"),
    updatedAt: new Date("2024-01-01")
  }
]

export const metadata: Metadata = {
  title: "Our Team",
  description: mockTeam.description || "Learn about Pawn Stars, our philosophy, history, and the dedicated staff who make our chess organization exceptional.",
  alternates: { canonical: "https://pawnstars.com/team" },
  openGraph: {
    title: "Our Team — Pawn Stars",
    description: mockTeam.description || "Philosophy, history, and the dedicated staff behind Pawn Stars Chess Organization.",
    type: "website",
    url: "https://pawnstars.com/team",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Team" }],
  },
}

export default function TeamPage() {
  const team = mockTeam
  const staff = mockStaff

  return (
    <div className="min-h-screen">
      {/* Hero section for team page */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 to-accent-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {team.name}
          </h1>
          <p className="text-xl sm:text-2xl text-primary-200 max-w-3xl mx-auto mb-8">
            {team.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-accent-400 font-semibold">
              Founded {team.foundedYear}
            </div>
            <div className="text-primary-300">•</div>
            <div className="text-accent-400 font-semibold">
              {staff.length} Team Members
            </div>
          </div>
        </div>
      </section>

      {/* Team History */}
      <TeamHistorySection 
        history={team.history}
        showTimeline={true}
      />

      {/* Philosophy & Values */}
      <TeamPhilosophySection 
        philosophy={team.philosophy}
        values={team.values}
        showIcons={true}
      />

      {/* Staff Grid */}
      <StaffGridSection 
        staff={staff.map(s => ({
          id: s.id,
          slug: s.slug,
          firstName: s.firstName,
          lastName: s.lastName,
          role: s.role,
          photoUrl: s.photoUrl,
          specialization: s.specialization,
          teamId: s.teamId
        }))}
        showContact={false}
        maxStaff={12}
      />
    </div>
  )
}
