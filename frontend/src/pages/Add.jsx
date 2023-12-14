import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import ProductForm from '../components/productForm'



function Add() {
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
<ProductForm/>

    </Layout>


    
    </>
  )
}

export default Add
