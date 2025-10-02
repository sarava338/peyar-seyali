import { useAppSelector } from "../store/hooks";

export default function User() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <h1>User</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
