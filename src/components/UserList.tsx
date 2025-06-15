import UserCard from './UserCard';
import type { User } from '../types/User';

type UserListProps = {
  users: User[];
  checkedUsers: number[];
  onCheck: (id: number) => void;
};

export default function UserList({ users, checkedUsers, onCheck }: UserListProps) {
  return (
    <section className="results-section">
      <ul>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            checked={checkedUsers.includes(user.id)}
            onCheck={onCheck}
          />
        ))}
      </ul>
    </section>
  );
}