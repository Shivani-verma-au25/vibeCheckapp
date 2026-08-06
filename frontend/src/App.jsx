import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import router from './routes/app.routes'
import { AuthProvider } from './features/auth/state/auth.context'
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} ></RouterProvider>
        <Toaster />
    </AuthProvider>
    
  )
}

export default App