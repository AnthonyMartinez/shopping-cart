import React from 'react';
import './App.css';

const CartHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Shopping Cart</a>
    </nav>
  );
};

const CartFooter = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">&copy; { props.year }</a>
    </nav>
  );

}

const ItemsContainter = ({props}) => {
  let generator = (stuff) => {
    return props.map( (item, idx) => {
      return <CartItem key={idx} props={ item } />
    })
  } 

  return (
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-8">Product</div>
            <div className="col-md-2">Price</div>
            <div className="col-md-2">Quantity</div>
          </div>
        </div>
      {generator(props)}
      </div>
  );
};


const CartItem = ({props}) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-md-8">{ props.product.name }</div>
        <div className="col-md-2">${ Math.floor(props.product.priceInCents / 100)}.{props.product.priceInCents % 100}</div>
        <div className="col-md-2">{ props.quantity }</div>
      </div>
    </div>
  )
};

const Price = (props) => {
  return <p>Total: ${Math.floor(props.number / 100)}.{props.number % 100}</p>
}

class AddItem extends React.Component {
  state = {}
  options = (stuff) => {
    return stuff.map( (item, idx) => {
      return <option value={idx} key={idx}>{item.name}</option>
    })
  }

  saveSelection = (e) => {
    e.preventDefault();
    console.log(e.target.value, e.target.name);
    if( !this.state.quantity ){
      this.setState((prevState) => { return { quantity: 0, ...prevState }})
    }
    this.setState({[e.target.name]: e.target.value})
  }

  addSelection = (e) => {
    e.preventDefault();
    console.log(this.state);
    
    if( this.state.product ) {
      this.props.addThing(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={ this.addSelection }>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input type="text" className="form-control" name="quantity" onChange={this.saveSelection}/>
      </div>
      <div className="form-group">
        <label htmlFor="product">Products:</label>
        <select className="form-control" name="product" onChange={this.saveSelection}>
          <option value=""></option>
          { this.options(this.props.products) }
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

class App extends React.Component{
  state = {
    cart: [
      { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
      { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
      { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
    ],

    products: [
      { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
      { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
      { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
      { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
      { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
      { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
      { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
      { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
      { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
    ],

    maxid: 3,

    total: 399 + 499 + 499 + 1999 

  }


  addThing = (thing) => {
    this.setState(prevState => {
      let product = prevState.products[thing.product]
      return {
        maxid : prevState["maxid"] + 1,
        cart: prevState.cart.concat(
          {
            id: prevState["maxid"] + 1, 
            product: product, 
            quantity: thing.quantity
          }
        ),
        products: prevState.products,
        total: prevState.total + product.priceInCents * thing.quantity
      }
    });
  }

  render() {
    return (
      <div className="App">
      <CartHeader />
      <div className="containter">
        <div className="col-md-10">
        <h1>Cart Items</h1>
        <ItemsContainter props={this.state.cart}/>
        <Price number={this.state.total} />
        <AddItem products={this.state.products} addThing={this.addThing} />
        </div>
      </div>
      <CartFooter year="2019" />
      </div>
    );
  }
}

export default App;
