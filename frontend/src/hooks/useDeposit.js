import { useState } from "react";
import { depositApi } from "../api/transaction";

const useDeposit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerDeposit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await depositApi(data);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Deposit failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { triggerDeposit, loading, error };
};

export default useDeposit;
