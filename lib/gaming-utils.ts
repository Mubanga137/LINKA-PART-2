// Gaming utility functions and constants

export const GAME_CATEGORIES = {
  SPORTS: "Sports",
  FIGHTING: "Fighting", 
  MOBILE: "Mobile Gaming",
  FPS: "FPS",
  BATTLE_ROYALE: "Battle Royale",
  STRATEGY: "Strategy",
  RACING: "Racing",
  RPG: "RPG"
} as const

export const TOURNAMENT_TYPES = {
  TOURNAMENT: "Tournament",
  LEAGUE: "League", 
  EXHIBITION: "Exhibition",
  QUALIFIER: "Qualifier",
  TRAINING: "Training",
  CASUAL: "Casual"
} as const

export const TOURNAMENT_STATUS = {
  LIVE: "Live Now",
  OPEN: "Registration Open", 
  COMING_SOON: "Coming Soon",
  ALMOST_FULL: "Almost Full",
  FULL: "Tournament Full",
  ENDED: "Ended"
} as const

export const DIFFICULTY_LEVELS = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate", 
  ADVANCED: "Advanced",
  EXPERT: "Expert",
  PROFESSIONAL: "Professional"
} as const

export const GAMING_PLATFORMS = {
  PC: "PC",
  PLAYSTATION: "PlayStation",
  XBOX: "Xbox", 
  NINTENDO: "Nintendo Switch",
  MOBILE: "Mobile",
  CROSS_PLATFORM: "Cross-Platform"
} as const

// Utility functions
export function getStatusColor(status: string): string {
  switch (status) {
    case TOURNAMENT_STATUS.LIVE:
      return "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
    case TOURNAMENT_STATUS.OPEN:
      return "bg-green-500 text-white shadow-lg shadow-green-500/50"
    case TOURNAMENT_STATUS.ALMOST_FULL:
      return "bg-yellow-500 text-white shadow-lg shadow-yellow-500/50"
    case TOURNAMENT_STATUS.COMING_SOON:
      return "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
    case TOURNAMENT_STATUS.FULL:
      return "bg-gray-500 text-white"
    case TOURNAMENT_STATUS.ENDED:
      return "bg-gray-400 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case DIFFICULTY_LEVELS.BEGINNER:
      return "bg-green-100 text-green-700 border-green-200"
    case DIFFICULTY_LEVELS.INTERMEDIATE:
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case DIFFICULTY_LEVELS.ADVANCED:
      return "bg-orange-100 text-orange-700 border-orange-200"
    case DIFFICULTY_LEVELS.EXPERT:
      return "bg-red-100 text-red-700 border-red-200"
    case DIFFICULTY_LEVELS.PROFESSIONAL:
      return "bg-purple-100 text-purple-700 border-purple-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function getPlatformIcon(platform: string): string {
  switch (platform) {
    case GAMING_PLATFORMS.PC:
      return "💻"
    case GAMING_PLATFORMS.PLAYSTATION:
      return "🎮"
    case GAMING_PLATFORMS.XBOX:
      return "🎮"
    case GAMING_PLATFORMS.NINTENDO:
      return "🎮"
    case GAMING_PLATFORMS.MOBILE:
      return "📱"
    case GAMING_PLATFORMS.CROSS_PLATFORM:
      return "🌐"
    default:
      return "🎮"
  }
}

export function formatCurrency(amount: number, currency: string = "ZMW"): string {
  return `${currency} ${amount.toLocaleString()}`
}

export function formatPlayerCount(current: number, max: number): string {
  return `${current}/${max} players`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-ZM", {
    year: "numeric",
    month: "short", 
    day: "numeric"
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-ZM", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export function calculateDaysUntil(dateString: string): number {
  const targetDate = new Date(dateString)
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isRegistrationOpen(registrationDeadline: string): boolean {
  const deadline = new Date(registrationDeadline)
  const now = new Date()
  return now < deadline
}

export function getTournamentProgress(participants: number, maxParticipants: number): number {
  return Math.round((participants / maxParticipants) * 100)
}

export function generateTournamentSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Gaming achievement levels
export const ACHIEVEMENT_LEVELS = {
  BRONZE: { name: "Bronze", color: "from-orange-600 to-yellow-600", minPoints: 0 },
  SILVER: { name: "Silver", color: "from-gray-400 to-gray-600", minPoints: 100 },
  GOLD: { name: "Gold", color: "from-yellow-400 to-yellow-600", minPoints: 500 },
  PLATINUM: { name: "Platinum", color: "from-blue-400 to-blue-600", minPoints: 1000 },
  DIAMOND: { name: "Diamond", color: "from-cyan-400 to-blue-500", minPoints: 2500 },
  MASTER: { name: "Master", color: "from-purple-400 to-purple-600", minPoints: 5000 },
  GRANDMASTER: { name: "Grandmaster", color: "from-red-400 to-pink-600", minPoints: 10000 }
} as const

export function getPlayerLevel(points: number) {
  const levels = Object.values(ACHIEVEMENT_LEVELS).reverse()
  return levels.find(level => points >= level.minPoints) || ACHIEVEMENT_LEVELS.BRONZE
}

// Tournament bracket utilities
export function generateBracket(playerCount: number): number {
  return Math.pow(2, Math.ceil(Math.log2(playerCount)))
}

export function calculateRounds(playerCount: number): number {
  return Math.ceil(Math.log2(playerCount))
}

// Gaming session utilities
export function formatGameDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

export function calculateXP(placement: number, totalPlayers: number, tournamentTier: string): number {
  const baseXP = 50
  const placementMultiplier = Math.max(0.1, (totalPlayers - placement + 1) / totalPlayers)
  const tierMultiplier = {
    "beginner": 1,
    "intermediate": 1.5,
    "advanced": 2,
    "expert": 2.5,
    "professional": 3
  }[tournamentTier.toLowerCase()] || 1
  
  return Math.round(baseXP * placementMultiplier * tierMultiplier)
}

// Validation utilities
export function isValidGameTag(tag: string): boolean {
  return /^[a-zA-Z0-9_-]{3,16}$/.test(tag)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhoneNumber(phone: string): boolean {
  // Zambian phone number format
  return /^(\+260|0)?[9|7][0-9]{8}$/.test(phone.replace(/\s/g, ""))
}

// Prize pool calculations
export function calculatePrizeDistribution(totalPrize: number, playerCount: number) {
  const distributions = {
    small: [0.6, 0.3, 0.1], // 3 places
    medium: [0.5, 0.25, 0.15, 0.1], // 4 places  
    large: [0.4, 0.25, 0.15, 0.1, 0.05, 0.05] // 6 places
  }
  
  const type = playerCount <= 16 ? "small" : playerCount <= 64 ? "medium" : "large"
  const dist = distributions[type]
  
  return dist.map(percentage => Math.floor(totalPrize * percentage))
}

// Team formation utilities  
export function generateTeamCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function validateTeamName(name: string): boolean {
  return name.length >= 3 && name.length <= 20 && /^[a-zA-Z0-9\s-_]+$/.test(name)
}
