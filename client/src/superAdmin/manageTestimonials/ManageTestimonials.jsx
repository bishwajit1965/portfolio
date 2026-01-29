import { useEffect, useState } from "react";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import api from "../../services/api";
import UpdateTestimonialModal from "./UpdateTestimonialModal";
import MiniButton from "../../components/buttons/MiniButton";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Function to fetch users data from the backend with pagination
  const fetchTestimonials = async (page, limit) => {
    try {
      const response = await api.get("/testimonials", {
        params: {
          page,
          limit,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Attach the JWT token
      });
      console.log("Responses:", response);
      // Update the users and pagination state
      setTestimonials(response?.data?.data); // Use the data field from the backend response
      setTotalRows(response?.data?.data?.totalRows); // Set total number of rows for pagination
    } catch (error) {
      console.error("Failed to fetch users", error);
      Swal.fire("Error", "Failed to fetch users data", "error");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch users initially and when page or rows per page changes
  useEffect(() => {
    fetchTestimonials(currentPage, rowsPerPage); // Fetch users with current pagination
  }, [currentPage, rowsPerPage]);

  // Define columns for DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, // Serial number
      width: "50px",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "90px",
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      width: "90px",
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
      width: "90px",
    },
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photo}
          alt={row.name}
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      ),
      sortable: true,
      width: "90px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "90px",
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      width: "60px",
    },
    {
      name: "Project Name",
      selector: (row) => row.projectName,
      sortable: true,
      width: "80px",
    },
    {
      name: "Testimonial",
      selector: (row) => row.testimonial,
      sortable: true,
      width: "80px",
    },
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
      width: "60px",
    },
    {
      name: "Social Links",
      selector: (row) => row.socialLinks?.map((sl) => sl),
      sortable: true,
      width: "90px",
    },
    {
      name: "Tags",
      selector: (row) => row.tags?.map((t) => t.concat(", ")),
      sortable: true,
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="lg:flex items-center grid gap-1">
          <MiniButton
            icon={<FaEdit />}
            variant="default"
            onClick={() => handleEditTestimonialFormToggle(row)}
            label="Edit"
          />
          <MiniButton
            icon={<FaTrashAlt />}
            variant="danger"
            onClick={() => handleDeleteTestimonial(row?._id)}
            label="Delete"
          />
        </div>
      ),
    },
  ];

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page in the state
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage); // Update rows per page in the state
  };

  // Add testimonial handler
  const handleAddTestimonialFormToggle = () => {
    setIsOpenModal(true);
  };

  // Edit Handler
  const handleEditTestimonialFormToggle = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsOpenModal(true);
  };

  const handleDeleteTestimonial = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await api.delete(`/testimonials/${id}`);
        setTestimonials(
          testimonials.filter((testimonial) => testimonial._id !== id),
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Testimonial deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the testimonial.",
          icon: "error",
        });
        console.error("Encountered an error!", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Modal close handler
  const handleCloseModal = () => {
    setEditingTestimonial(null);
    setIsOpenModal(false);
  };

  // Add testimonial handler
  const handleAddTestimonial = async (testimonial) => {
    try {
      setLoading(true);
      const response = await api.post("/testimonials", testimonial, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Testimonial added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchTestimonials();
      } else {
        const errorResponse = await response.json();
        Swal.fire({
          title: "Error!",
          text: `Error: ${errorResponse.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error in inserting testimonial!", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update handler
  const handleUpdateTestimonial = async (id, data) => {
    try {
      setLoading(true);
      console.log("Updating testimonial id", data?._id);

      const response = await api.patch(`/testimonials/${id}`, data);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Testimonial data updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setIsOpenModal(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating testimonial.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Testimonials"
        subtitle="Super admin only!"
      />
      <div className="flex justify-between items-center lg:mb-4 bg-base-200 p-2 shadow-sm">
        <MiniButton
          onClick={handleAddTestimonialFormToggle}
          icon={<FaPlusCircle />}
          variant="default"
          label="Add Testimonial"
          className=""
        />

        <div className="lg:block hidden">
          <h2 className="lg:text-xl text-lg font-bold text-center   text-base-content">
            Hello
          </h2>
        </div>

        <div className="">
          <h2 className="lg:text-xl text-lg font-bold text-center   text-base-content">
            Testimonials: {testimonials?.length > 0 ? testimonials?.length : 0}
          </h2>
        </div>
      </div>
      <div className="table-container">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <DataTable
            title={testimonials.length > 0 ? "Testimonials List" : ""}
            columns={columns}
            data={testimonials}
            pagination
            paginationServer
            paginationTotalRows={totalRows} // Total rows fetched from backend
            onChangePage={handlePageChange} // Handle page change
            onChangeRowsPerPage={handleRowsPerPageChange} // Handle rows per page change
            paginationPerPage={rowsPerPage} // Set rows per page
            highlightOnHover
            dense
          />
        )}
      </div>

      {/* Editing modal */}
      {isOpenModal && (
        <UpdateTestimonialModal
          selectedTestimonial={editingTestimonial}
          title={editingTestimonial?.name}
          onClick={handleCloseModal}
          onAdd={handleAddTestimonial}
          onUpdate={handleUpdateTestimonial}
          onClose={handleCloseModal}
          formToggler={setIsOpenModal}
        />
      )}
    </div>
  );
};

export default ManageTestimonials;
