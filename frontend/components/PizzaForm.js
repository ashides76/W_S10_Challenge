import React, { useState } from 'react'
import { usePostNewPizzaOrderMutation } from '../state/pizzasApi'

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [],
}

export default function PizzaForm() {
  const [state, setState] = useState(initialFormState);
  const [createNewPizzaOrder, { isLoading, isError, error }] = usePostNewPizzaOrderMutation()

  const onNewPizzaOrder = e => {
    e.preventDefault()
    createNewPizzaOrder(state)
    .unwrap()
    .then(() => {
      setState({
        fullName: '',
        size: '',
        toppings: [],  
      });
    })
    .catch(err => {
      console.error(err); 
    });
  }

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target
    const newValue = type === 'checkbox' ? checked : value

    if (name === 'toppings') {
      if (checked) {
        setState((prevState) => ({
          ...prevState,
          toppings: [...prevState.toppings, value], 
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          toppings: prevState.toppings.filter((topping) => topping !== value),
        }))
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  return (
    <form onSubmit={onNewPizzaOrder}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {isError && <div className="failure">Order failed: {error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={handleInputChange}
            value={state.fullName}
          />
          {state?.fullName?.length < 3 && (
            <div className="validation-message">
              Full Name must contain at least 3 characters.
            </div>
          )}
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            data-testid="sizeSelect" 
            id="size" 
            name="size"
            onChange={handleInputChange}
            value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          {!state.size && (
            <div className="validation-message">
              Please select a size.
            </div>
          )}
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="toppings" type="checkbox" onChange={handleInputChange} value={'1'} checked={state.toppings.includes('1')}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="toppings" type="checkbox" onChange={handleInputChange} value={'2'} checked={state.toppings.includes('2')} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="toppings" type="checkbox" onChange={handleInputChange} value={'3'} checked={state.toppings.includes('3')}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="toppings" type="checkbox" onChange={handleInputChange} value={'4'} checked={state.toppings.includes('4')}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="toppings" type="checkbox" onChange={handleInputChange} value={'5'} checked={state.toppings.includes('5')}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
