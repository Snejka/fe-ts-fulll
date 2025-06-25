import { useEditMode } from "../hooks/useEditMode";
import type { User } from '../types/User';
import Button from './ui/Button';
import Checkbox from "./ui/Checkbox";

import '../styles/user-card.css';

//Learn best use cases for enoms vs types in TypeScript:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums-vs-unions
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

export type UserCardProps = {
  user: User;
  checked: boolean;
  onCheck: (id: number) => void;
};

export default function UserCard({ user, checked, onCheck }: UserCardProps) {

    const { isEditMode } = useEditMode();

    return (
        <li className="card">
            {isEditMode && <Checkbox
                type="checkbox"
                aria-label={`Select user ${user.login}`}
                checked={checked}
                onChange={() => onCheck(user.id)}
            />}
            <img src={user.avatar_url} alt={user.login} />
            <div className="info">
                <p>ID: {user.id}</p>
                <h1 className="card-title">{user.login}</h1>
            </div>
            <Button className="main-button" onClick={() => console.log(user)}>
                View Profile
            </Button>
        </li>
    );
}