import type { User } from '../types/User';

type UserCardProps = {
  user: User;
  checked: boolean;
  onCheck: (id: number) => void;
};

export default function UserCard({ user, checked, onCheck }: UserCardProps) {
  return (
    <li className="card">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(user.id)}
      />
      <img src={user.avatar_url} alt={user.login} />
      <div className="info">
        <p>ID: {user.id}</p>
        <h1 className="card-title">{user.login}</h1>
      </div>
      <button className="main-button" onClick={() => console.log(user)}>
        View Profile
      </button>
    </li>
  );
}