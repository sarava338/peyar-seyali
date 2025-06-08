import { useAppSelector, useAuthActions } from "../store/hooks";

export default function DropDown() {
  const user = useAppSelector((state) => state.user.currentUser);
  const { logout } = useAuthActions();

  return !user ? null : (
    <div>
      <p>{user.name}</p>

      <button onClick={logout}>logout</button>
    </div>
  );
}
