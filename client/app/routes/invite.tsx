import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function InvitePage() {
  const { inviteId } = useParams<{ inviteId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!inviteId) return;

    const joinBoard = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/boards/join/${inviteId}`,
          {},
          { withCredentials: true }
        );
        navigate("/");
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message || "Не удалось присоединиться к борду"
        );
      } finally {
        setLoading(false);
      }
    };

    joinBoard();
  }, [inviteId, navigate]);

  if (loading) return <p>Присоединение к борду...</p>;
  if (error) return <p>{error}</p>;

  return null;
}
