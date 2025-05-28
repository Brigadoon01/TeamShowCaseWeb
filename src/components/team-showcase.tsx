"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Linkedin, Twitter, ChevronLeft, ChevronRight, Search, Mail, Phone } from "lucide-react"
import teamMembersData from ".././data/team-data.json"

interface TeamMember {
  id: number
  name: string
  jobTitle: string
  photo: string
  bio?: string
  email?: string
  phone?: string
  socialLinks: {
    linkedin?: string
    twitter?: string
  }
  skills?: string[]
}

interface TeamShowcaseProps {
  itemsPerPage?: number
}

export default function TeamShowcase({ itemsPerPage = 6 }: TeamShowcaseProps) {
  const [allTeamMembers] = useState<TeamMember[]>(teamMembersData as TeamMember[])
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(allTeamMembers)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter by search query, bio, and skills
  useEffect(() => {
    const results = allTeamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.bio && member.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.skills && member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    setFilteredMembers(results)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchQuery, allTeamMembers])

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get to know the talented individuals who make our company great. Each member brings unique skills and
          expertise to our team.
        </p>
      </div>

      {/* Search Controls */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by name, job title, bio, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="flex justify-center sm:justify-end items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"} (out of {allTeamMembers.length} total)
            </div>
          </div>
        )}
      </div>

      {/* No Results Message */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-600">Try adjusting your search query.</p>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentMembers.map((member) => (
          <Card
            key={member.id}
            className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
          >
            <CardContent className="p-6 text-center">
              {/* Photo */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={member.photo || "/placeholder.svg"}
                  alt={`${member.name} profile photo`}
                  fill
                  className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>

              {/* Job Title */}
              <p className="text-gray-600 mb-3">{member.jobTitle}</p>

              {/* Bio */}
              {member.bio && <p className="text-sm text-gray-500 mb-4 italic">{member.bio}</p>}

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Contact & Social Links */}
              <div className="flex justify-center items-center space-x-3">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={20} />
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone size={20} />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.socialLinks?.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label={`${member.name}'s Twitter profile`}
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
            Previous
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  )
}
