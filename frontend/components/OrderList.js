import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useGetPizzaOrdersQuery } from '../state/pizzasApi'
import { filterSize } from '../state/pizzasSlice';

export default function OrderList() {
  const {data: orders} = useGetPizzaOrdersQuery()
  const pizzaSize = useSelector(st => st.pizzasSlice.pizzaSize)
  console.log('sizeSlice', pizzaSize);
  const dispatch = useDispatch()
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} with ${order.toppings.length} toppings`}
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
            const className = `button-filter${size === pizzaSize ? ' active' : ''}`
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
