import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import Product from '../components/product'
import Analytics from '../components/Analytics'
import Customers from '../components/Customers'




function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)




  useEffect(() => {
   

    if (!user) {
      navigate('/login')
    }



    return () => {
    
    }
  }, [user, navigate, dispatch])



  return (
    <>
    <Layout>
      <Customers/>
      <Analytics/>
  
    </Layout>
   
    
    </>
  )
}

export default Dashboard
