import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Router,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import NoteState from "./contexts/notes/NotesState.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import AlertState from "./contexts/alerts/AlertState.jsx";
import { AuthState } from "./contexts/auth/AuthState.jsx";

function App() {
  return (
    <>
      <AuthState>
        <AlertState>
          <NoteState>
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<About />} />
              </Routes>
            </div>
          </NoteState>
        </AlertState>
      </AuthState>
    </>
  );
}

export default App;
