import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner  from '../components/Spinner'






function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  

  const { email, password, } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (user && user.role === 'admin') {
        // Redirect to DashboardAdmin for admin users
        navigate('/dashboardadmin');
      } else {
        // Redirect to the default dashboard for non-admin users
        navigate('/');
      }

      dispatch(reset());
    }

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }

  const quitApplication = () => {
    const confirmQuit = window.confirm("Are you sure you want to close this application?");
    if (confirmQuit) {
      // Attempt to close the window
      window.close();
    }
  };

  

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

  }

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/4689/4689802.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Point of Sale in Gian
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                     
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
           
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              
              </a>
            </p>
          </div>
        </div>
        <button
        onClick={quitApplication}
        className="fixed top-0 left-0 m-2 p-2 rounded-md bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
      >
        X
      </button>

        
        

            </div>
            


    </>
  
}

export default Login