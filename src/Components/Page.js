import React from "react";
import { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [resData, setResData] = useState("");

  const handleUserInput = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    setUsername("");

    fetch("https://api.github.com/users/" + username)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResData(data);
      });
    setUsername("");
  };
  return (
    <div>  
        
      <div className="container">
      <h1>GIT HUB USER EXPLORER </h1>
        <form onSubmit={handleSubmit} className="formCard">
          <input
            type="text"
            onChange={handleUserInput}
            value={username}
            placeholder="Search here"
          />
          <button>Submit</button>
        </form>

        {resData.message}

        {/*conditional rendaring*/}
        {resData && resData.message !== "Not Found" && (
          <div className="userDetailCard">
            <div className="userDetailBody">
              <h1 className="name">{resData.name}</h1>
              <em className="username">{resData.login}</em>
              <p>Public-repository:{resData.public_repos}</p>
              <div className="follow">
                <p>Followers : {resData.followers}</p>
                <p>Following : {resData.following}</p>
              </div>
              <div>Location:{resData.location}</div>
              <div className="profDetail">
                <p>🏢{resData.company}</p>
                <p>🗒️{resData.bio}</p>
              </div>
            </div>
            
            
            <div className="userImage">
              <img src={resData.avatar_url} alt="avatar" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
