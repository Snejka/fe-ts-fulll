// import { useState } from 'react'
import rawData from './mocks/users.json';
import type { User } from './types/User';
import './App.css';

type UserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

function App() {

  const data = rawData as UserResponse;
  const typedUsers = data.items;
  
  return (
    <>
      <header className="app-header">
        <h1>GitHub Search</h1>
      </header>

      <main>
        <section className='search-section'>
          <input
            type="text"
            placeholder="Search users..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="user-search"
          />

          <div className='control-bar'>
            <label className="select-all">
              <input
                  type="checkbox"
                  checked={true} // This should be controlled by state
                  // onChange={() => onCheck(user.id)}
                />
                0 items selected
            </label>
            <div className='btn-group'>
              <button className="copy-all"><i className="fa-regular fa-copy"></i></button>
              <button className="delete-all"><i className="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </section>

        <section className='results-section'>
          <ul>
            {typedUsers.map(user => (
              <li key={user.id} className="card">
                <input
                  type="checkbox"
                  checked={true} // This should be controlled by state
                  // onChange={() => onCheck(user.id)}
                />
                <img src={user.avatar_url} alt={user.login} />
                <div className='info'>
                  <p>ID: {user.id}</p>
                  <h1 className='card-title'>{user.login}</h1> 
                </div>
                <button className="main-button" onClick={() => console.log(user)} >
                  View Profile
                </button>
            </li>
            ))}
          </ul>
        </section>
        
      </main>
      <footer>
        More Data
      </footer>
      
    </>
  )
}

export default App
