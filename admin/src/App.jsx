import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/clerk-react'

function App() {
  return (
    <div>
    <h1>Home</h1>
    <SignedIn>
      <UserButton />
    </SignedIn>

    <SignedOut>
      <SignInButton mode = "modal" />
    </SignedOut>
    </div>
  )
}

export default App