import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth) 

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')

  }

  return (
    <header className='header' >
      <div className="log">
       </div>
       <ul>
        {user ? (
           <li>
            <button className="text-white" onClick={onLogout}>
             <FaSignInAlt /> 
             </button>
         
     </li> 
     ) : (
     <>
         <li>
      
     </li> 
     <li>
        
     </li>   
     
     </>
     
     )}
          
       </ul>
    </header>
  )
}

export default Header