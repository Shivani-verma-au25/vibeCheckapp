import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import router from './routes/app.routes'
import { AuthProvider } from './features/auth/state/auth.context'


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} ></RouterProvider>
    </AuthProvider>
  )
}

export default App