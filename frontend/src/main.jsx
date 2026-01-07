import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import { BrowserRouter } from 'react-router'
import {Query, QueryClient, QueryClientProvider} from '@tanstack/react-query'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const queryClient = new QueryClient()

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </ClerkProvider>
  </QueryClientProvider>
)
