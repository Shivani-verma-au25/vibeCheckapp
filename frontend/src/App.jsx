import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import router from './routes/app.routes'
import { AuthProvider } from './features/auth/state/auth.context'
import toast, { Toaster } from 'react-hot-toast';
import { SongContenxtProvider } from './features/home/state/song.contens'


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