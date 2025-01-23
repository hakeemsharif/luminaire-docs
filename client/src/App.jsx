// Package
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthContext } from './hooks/useAuthContext';

// Pages
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage'
import DocumentPage from './pages/DocumentPage/DocumentPage'
import AddDocument from './pages/DocumentPage/AddDocument/AddDocument'
import ViewDocument from './pages/DocumentPage/ViewDocument/ViewDocument'
import UpdateDocument from './pages/DocumentPage/UpdateDocument/UpdateDocument';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import UserPage from './pages/UserPage/UserPage'
import AddUser from './pages/UserPage/AddUser/AddUser'
import UpdateUser from './pages/UserPage/UpdateUser/UpdateUser';

// Layout
import Sidebar from './component/layout/Sidebar/Sidebar';
import MobileBar from './component/layout/MobileBar/MobileBar'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * (6 * 1000)
    }
  }
});

function App() {

  const { user } = useAuthContext()

  if (user === undefined) {
    return <div>Loading...</div>; // Show a global loading spinner
  }
  
  return (
    <QueryClientProvider client={client}>
      <main className="grid">
        <Router>
            {user && ( <>
              <Sidebar/> 
              <MobileBar />
            </>)}

            <Routes>
                  <Route path='/' element={!user ? <LoginPage />  : <Navigate to="/home"/> } />
                  <Route path='/home' element={user ? <HomePage /> : <Navigate to="/"/> } />

                  {/* Document Routes */}
                  {/* <Route path='/documents' element={<DocumentPage/>} /> */}
                  <Route path='/documents' element={user ? <DocumentPage /> : <Navigate to="/"/> } />
                  <Route path='/documents/add' element={user ? <AddDocument /> : <Navigate to="/"/> } />
                  <Route path='/documents/update/:id' element={user ?  <UpdateDocument /> : <Navigate to="/"/> } />
                  <Route path='/documents/:id' element={user ? <ViewDocument /> : <Navigate to="/"/> } />
                  
                  {/* User Routes */}
                  <Route path='/users' element={user ? <UserPage /> : <Navigate to="/"/> } />
                  <Route path='/users/add' element={user ? <AddUser /> : <Navigate to="/"/> } />
                  <Route path='/users/update/:id' element={user ? <UpdateUser /> : <Navigate to="/"/> } />
                  <Route path='/users/:id' element={user ? <UserPage /> : <Navigate to="/"/> } />

                  {/* Settings Route */}
                  <Route path='/settings' element={user ? <SettingsPage /> : <Navigate to="/"/> } />

                  {/* Redirect Pages Not Found */}
                  <Route path='*' element={ <Navigate to="/"/> } />
            </Routes>   
        </Router>
      </main>
    </QueryClientProvider>
  )
}

export default App
