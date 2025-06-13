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
            className="user-serch"
          />

          <div className='controls'>
            <label>
              <input
                  type="checkbox"
                  checked={true} // This should be controlled by state
                  // onChange={() => onCheck(user.id)}
                />
                0 items selected
            </label>

            <button className="select-all">Select All</button>
            <button className="deselect-all">Deselect All</button>
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
                <button className="view-button" onClick={() => console.log(user)} >
                  View Profile
                </button>
            </li>
            ))}
          </ul>
        </section>
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
                <h1>{user.login}</h1> 
              </div>
              <button onClick={() => console.log(user)} className="view-button">
                View Profile
              </button>
          </li>
          ))}
        </ul>
      </main>
      <footer>
        More Data
      </footer>
      
    </>
  )
}

export default App
