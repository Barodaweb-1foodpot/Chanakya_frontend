import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSidbarDashboard from '../component/AccountSidbarDashboard'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'

const MyOrder = ({ userData }) => {

  useEffect(() => {
    fetchOrder()
  }, [userData])

  const [order, setorder] = useState([])
  const [loading , setLoading] = useState(false)

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/get/order-history-user/${userData._id}`)
      console.log(res)
      setLoading(false)
      setorder(res.data)
    }
    catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const calculateSubtotal = (items) => {
    const totalPrice = items.reduce((accumulator, item) => {
      const itemTotal = item.productDetails.newPrice * item.quantity;
      return accumulator + itemTotal;
    }, 0);
    return totalPrice
  };

  return (
    <React.Fragment>
     {loading ? (
        // Loader component while loading
        <div className="loader-container">
          <Puff
            color="#a01e20"
            height={50}
            width={50}
            timeout={0} // 0 means no timeout, loader will be displayed until setIsLoading(false) is called
          />
        </div>
      ) : ( 
      

      <div className="tab-content mb-6">
        <div className="tab-pane mb-4 active in" id="account-orders">
          <div className="icon-box icon-box-side">
            <span className="icon-box-icon icon-orders">
              <i className="w-icon-orders" />
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{ fontSize: '2rem' }}>My Orders</h4>
            </div>
          </div>
          <div className="order-info">
            <h4 className="title title-password ls-25 font-weight-bold">Your Order Information Below.</h4>
            <hr />
            {!loading && order && order.length === 0 ?
              <div className="no-order mb-10">
                <h6 className="text-center">There is No Items In Your Order History</h6>
                <div className="text-center">
                  <Link to="/checkout" className="btn btn-dark btn-rounded">
                    Proceed to Checkout
                  </Link>
                </div>
              </div> :
               <div className="table-responsive">

               <table className="shop-table account-orders-table mb-6">
                 <thead>
                   <tr className="text-left">
                     <th className="order-id">Order #</th>
                     <th className="order-date">Ordered On</th>
                     <th className="order-total">Total</th>
                     <th className="order-actions">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {order && order.length > 0 && order.map((items, index) => (
                     <tr key={index}>
                       <td className="order-id">{items.orderNo}</td>
                       <td className="order-date">{new Date(items.createdAt).toLocaleDateString()}</td>
                       <td className="order-total">
                         <span className="order-price">{calculateSubtotal(items.cart)}</span>
                         {/* Add logic to display total price based on items */}
                         {/* <span className="order-quantity">1</span> item */}
                       </td>
                       <td className="order-action">
                         <Link to={`/printStatment/${items._id}`} target='_blank' className="btn btn-outline btn-default btn-block btn-sm btn-rounded">View</Link>
                       </td>
                     </tr>
                   ))}
 
 
 
                 </tbody>
               </table>
             </div>
             }

           
            <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">
              Go
              To Home<i className="w-icon-long-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
       )}



    </React.Fragment>
  )
}

export default MyOrder