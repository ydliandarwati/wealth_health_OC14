import { Link } from "react-router-dom"
import './error.css'

// Error components: when path doesn't exist
export default function Error() {
  return (
    <main className="error">
        <h1 className="error_title">404</h1>      
        <p className="error_text">This page doesn't exist.</p>
        <Link to="/" className="error_link">Return to the home page</Link>
    </main>
  )
}
