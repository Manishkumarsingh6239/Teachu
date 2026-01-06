import { SignInButton, SignedOut, SignedIn, SignOutButton, UserButton} from '@clerk/clerk-react'

import React from 'react'

const HomePage = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" className="bg-blue-500 text-white px-4 py-2 rounded-md"/>
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </div>
  )
}

export default HomePage
