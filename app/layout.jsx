import AuthProvider from '@components/providers/AuthProvider'
import Navbar from '../components/Navbar'
import { Partytown } from '@builder.io/partytown/react'
import '@styles/globals.css'

export const metadata = {
  title: 'Blogs',
  description: 'Discover & share blogs'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex flex-col justify-between h-[auto]  ">
            <Navbar />

            <div className="min-h-[100vh] mt-[131px]  max-sm:mt-[50px]">
              <Partytown debug={true} forward={['dataLayer.push']} />
              {children}
            </div>
            {/* <Footer /> */}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
