import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddServiceForm from "../components/AddServiceForm";

const AddServicePage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const handleAdd = (newService) => {
    alert("✅ Service added successfully!");
    navigate("/dashboard");
  };

  const handleUpdate = (updatedService) => {
    alert("✅ Service updated successfully!");
    navigate("/dashboard");
  };

  return (
    <AddServiceForm
      onAdd={handleAdd}
      onUpdate={handleUpdate}
    />
  );
};

export default AddServicePage;
