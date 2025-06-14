import { useState } from 'react';
import rawData from './mocks/users.json';
import type { User } from './types/User';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import Footer from './components/Footer';

import './App.css';

type UserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

function App() {
  const data = rawData as UserResponse;
  const typedUsers = data.items;

  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setCheckedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header />
      <main>
        <SearchBar selectedCount={checkedUsers.length} />
        <UserList users={typedUsers} checkedUsers={checkedUsers} onCheck={handleCheck} />
      </main>
      <Footer />
    </>
  );
}

export default App;