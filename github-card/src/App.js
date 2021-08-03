import React from 'react'
import axios from 'axios'
import './App.css';

class App extends React.Component{
state={
  user: 'makeityourself121',
  avatar: [],
  avatarf: []
}

  componentDidMount(){
    axios.get(`https://api.github.com/users/${this.state.user}`)
    .then(res=>{
      console.log(res.data)
      this.setState({
        ...this.state,
        avatar: res.data.avatar_url
      })
    })
    .catch(err=>{
      alert(err)
    })
  }

  handleChange=(e)=>{
    this.setState({
      ...this.state,
      user:e.target.value,
      
    })
  }

  handleClick=(e)=>{
    e.preventDefault()
    
    axios.get(`https://api.github.com/users/${this.state.user}`)
    .then(res=>{
      
      this.setState({
        ...this.state,
        avatar: res.data.avatar_url,
        
      })
    })
  }

  handleclicks=(e)=>{
    e.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.user}/followers`)
    .then(res=>{
      
      const follow=res.data.map(i=>{
        console.log(i)
        return i
      })
      this.setState({
        ...this.state,
        avatarf: follow
      })
      
    })
  }

  render(){
  return (
    <div className="App">
     <h1>Github Cards</h1>
     <input onChange={this.handleChange}/>
     <button onClick={this.handleClick}>Get User</button>
     <div onClick={this.handleclicks} className='image-container'>
     <img width={200} src={this.state.avatar} alt=''/>
     </div>
     {this.state.avatarf.map(i=>{
       return (<img width={200} key={i.avatar_url} src={i.avatar_url} alt=''/>
       )
       
     })}
     
  
    </div>
  );
  }
}

export default App;
