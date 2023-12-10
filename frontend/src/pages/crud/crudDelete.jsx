import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function CrudDelete() {
  const [crud, setCrud] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCrudById() {
      try {
        const response = await axios.get(`/api/cruds/${_id}`);
        setCrud(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchCrudById();
  }, [_id]);

  async function handleDelete() {
    try {
      await axios.delete(`/api/cruds/${_id}`);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container bg-white p-4">
      <p>
        <b>Name:</b> {crud.name}
      </p>

      <p className="bg-white">
        <b>Description:</b> <p className="bg-white">{crud.description}</p>
      </p>

      <p>
        <b>Price:</b> ${crud.price}
      </p>

      <p>
        <b>Category:</b> {crud.category}
      </p>

      <p>
        <small>
          <b>ID:</b> {crud._id}
        </small>
      </p>

      <div className="btn-group">
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <Link to="/profile" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default CrudDelete;
