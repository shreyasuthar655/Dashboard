import React from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import EditUser

const UserList = ({ users, currentPage, paginate, pageNumbers, itemsPerPage, setItemsPerPage, totalUsers, handleSort, sortConfig }) => {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge bg-success';
      case 'Pending':
        return 'badge bg-warning';
      case 'Banned':
        return 'badge bg-danger';
      case 'Rejected':
        return 'badge bg-secondary';
      default:
        return '';
    }
  };

  const getAvatarIndex = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const getAvatarUrl = (email, gender) => {
    const avatarIndex = getAvatarIndex(email);
    if (gender === 'Female') {
      const adjustedIndex = (avatarIndex % 50) + 51; // Female avatars are from 51 to 100
      return `https://avatar.iran.liara.run/public/${adjustedIndex}`;
    } else {
      const adjustedIndex = (avatarIndex % 50) + 1; // Male avatars are from 1 to 50
      return `https://avatar.iran.liara.run/public/${adjustedIndex}`;
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Name {getSortIndicator('name')}
              </th>
              <th>Phone Number</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td className="text-left">
                  <div className="d-flex align-items-center">
                    <div className="profile-image mr-2">
                      <img
                        className="rounded-circle"
                        alt="avatar"
                        src={getAvatarUrl(user.email, user.gender)}
                        style={{ width: "50px", marginRight: "15px" }}
                      />
                    </div>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-muted">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.company}</td>
                <td>{user.role}</td>
                <td><span className={getStatusClass(user.status)}>
                    {user.status}
                  </span></td>
                <td>
                  <button className="btn btn-transparent" onClick={()=>navigate(`/edit-user/${user.id}`)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <span>Rows per page: </span>
          <Form.Select 
            className="mx-2"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            style={{ width: 'auto' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
        <div className="d-flex align-items-center">
          <span>Page {currentPage} of {pageNumbers.length}</span>
          <button 
            className="btn btn-outline-secondary mx-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
