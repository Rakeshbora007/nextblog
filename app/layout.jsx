import AuthProvider from '@components/providers/AuthProvider'
import Navbar from '../components/Navbar'
import { Partytown } from '@builder.io/partytown/react'
import '@styles/globals.css'
import Footer from '@components/Footer'

export const metadata = {
  title: 'Blogs',
  description: 'Discover & share blogs'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Partytown debug={true} forward={['dataLayer.push']}></Partytown>
          <div className="flex flex-col">
            <Navbar />
            <div className="mt-32 max-sm:mt-[80px]">
              {children}
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
