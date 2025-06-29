import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchNames, fetchNamesForAdmin } from "../../store/namesSlice";

import NameTable from "../../components/admin/NameTable";
import { deleteName } from "../../firebase/services/nameService";

import LoadingScreen from "../../components/LoadingScreen";

export default function Names() {
  const { adminNames: names, error, status } = useAppSelector((state) => state.names);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNamesForAdmin());
  }, [dispatch]);

  const handleViewClick = (nameSlug: string): void => {
    navigate(`/admin/names/${nameSlug}`);
  };

  const handleEditClick = (nameSlug: string): void => {
    navigate(`/admin/names/${nameSlug}/edit`);
  };

  const handleDeleteClick = async (nameSlug: string) => {
    const canDelete = confirm(`Are you sure you want to delete the name: ${nameSlug}?`);
    try {
      if (canDelete) {
        await deleteName(nameSlug);
        dispatch(fetchNames());
        console.log(`Name: ${nameSlug} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting name:", error);
    }
  };

  if (status === "loading") return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;
  if (!names || names.length === 0) return <p>பெயர்கள் இல்லை.</p>;

  return (
    <>
      <main>
        <h1>
          அனைத்து பெயர்கள் - <strong>{names.length}</strong>
        </h1>
        <NameTable names={names} handleView={handleViewClick} handleEdit={handleEditClick} handleDelete={handleDeleteClick} />
      </main>
    </>
  );
}
