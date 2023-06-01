import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    avatar_url: string
    created_at: Date
  }

  interface Session {
    user: User
  }
}


