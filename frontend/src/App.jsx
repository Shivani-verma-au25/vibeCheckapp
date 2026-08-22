import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/app.routes'
import { AuthProvider } from './features/auth/state/auth.context'
import { Toaster } from 'react-hot-toast';
import { SongContenxtProvider } from './features/home/state/Song.context'


const App = () => {
  return (
    <AuthProvider>
      <SongContenxtProvider>
        <RouterProvider router={router} ></RouterProvider>
      </SongContenxtProvider>
        <Toaster />
    </AuthProvider>
  )
}

export default App