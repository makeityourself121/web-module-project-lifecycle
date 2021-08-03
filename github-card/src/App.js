import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    user: "makeityourself121",
    avatar: [],
    avatarf: [],
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.user}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          avatar: res.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      user: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.user}`).then((res) => {
      console.log(res.data);
      this.setState({
        ...this.state,
        avatar: res.data,
      });
    });
  };

  handleclicks = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.user}/followers`)
      .then((res) => {
        const follow = res.data.map((i) => {
          console.log(i);
          return i;
        });
        this.setState({
          ...this.state,
          avatarf: follow,
        });
      });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <h1>Github Cards</h1>
        <input onChange={this.handleChange} placeholder="Search User" />
        <button
          style={{ borderRadius: "25%", marginLeft: "10px" }}
          onClick={this.handleClick}
        >
          Get User
        </button>
        <p>Click on user to see followers</p>
        <div onClick={this.handleclicks} className="image-container">
          <h2 style={{ color: "black", fontFamily: "serif" }}>
            {this.state.avatar.name}
          </h2>
          <img
            style={{ width: "150px", borderRadius: "25%" }}
            src={this.state.avatar.avatar_url}
            alt={this.state.avatar.name}
          />
          <h4 style={{ color: "black" }}>
            Username: {this.state.avatar.login}
          </h4>
          <h4 style={{ color: "black" }}>
            {" "}
            Location: 🌴 {this.state.avatar.location}🌴
          </h4>
          <a
            style={({ color: "navyblue" }, { textDecoration: "none" })}
            href={this.state.avatar.html_url}
          >
            👉 Check Out My Github! 👈
          </a>
        </div>
        <div className="follow">
          {this.state.avatarf.map((i) => (
            <div key={i.id} className="follower-card">
              <img
                style={{ width: "200px", borderRadius: "25%", margin: "10px" }}
                src={i.avatar_url}
                alt={i.name}
              />
              <h4 style={{ color: "black" }}>{i.login}</h4>
              <a
                style={({ color: "navyblue" }, { textDecoration: "none" })}
                href={i.html_url}
              >
                👉 Check Out My Github! 👈
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
