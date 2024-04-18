import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useGetPizzaOrdersQuery } from '../state/pizzasApi'
import { filterSize } from '../state/pizzasSlice';

export default function OrderList() {
  const {data: orders, isLoading: orderLoading, isFetching: orderRefreshing } = useGetPizzaOrdersQuery()
  console.log(orders);
  const selectedSize = useSelector(st => st.pizzasSlice.pizzaSize)
  console.log('sizeSlice', selectedSize);
  const dispatch = useDispatch()

  const filterBySize = orders?.filter(order => {
    if (selectedSize === 'All') {
      return true
    } else {
        return order.size === selectedSize
    }
  })

  return (
    <div id="orderList">
      <h2>Pizza {(orderRefreshing || orderRefreshing) && 'Being updated...'}</h2>
      <ol>
        {
          orderLoading ? 'Order loading...' :
          filterBySize?.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} with ${order?.toppings?.length ? order?.toppings?.length : 'no'} toppings`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === selectedSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              onClick={() => dispatch(filterSize(size))}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
