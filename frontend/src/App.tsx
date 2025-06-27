import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Blog } from './pages/blog'
import { FullBlog } from './pages/fullBlog'
import { BlogLayout } from './pages/blogLayout'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<Blog />} />
            <Route path=":id" element={<FullBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
