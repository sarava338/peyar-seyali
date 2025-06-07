import { useAuthActions } from "../store/hooks";

export default function DropDown() {
  const { logout } = useAuthActions();

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
}
