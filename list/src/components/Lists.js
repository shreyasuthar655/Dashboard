import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DropdownButton, Form } from 'react-bootstrap';
import UserList from './userList';
import usersData from '../usersData';
// import CreateUser

const Lists = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    setUsers(usersData);
  }, []);

  useEffect(() => {
    if (!['all', 'active', 'pending', 'banned', 'rejected'].includes(status)) {
      navigate('/users/all');
    } else {
      setCurrentPage(1); 
    }
  }, [status, navigate]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleRoleFilterChange = (event) => {
    const { value, checked } = event.target;
    setRoleFilter(prev => checked ? [...prev, value] : prev.filter(role => role !== value));
    setCurrentPage(1); 
  };

  const handleSort = () => {
    let direction = 'asc';
    if (sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: 'name', direction });
  };
  

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesStatus = status === 'all' || user.status.toLowerCase() === status;
    const matchesSearchTerm = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);

    return matchesStatus && matchesSearchTerm && matchesRole;
  });

  const getNumberOfUsersByStatus = (status) => {
    return users.filter((user) => user.status.toLowerCase() === status).length;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    <div id="container1" className='container'>
    <div className="d-flex justify-content-between align-items-center my-4">
        <h3>User Lists</h3>
        <button className="btn btn-dark" onClick={()=>navigate('/create-user')}>+ New User</button>
      </div>
    </div>
    <div id="container2" className="container">
      <div className="row mb-3">
        <ul className="nav nav-tabs col-12">
          <li className="nav-item">
            <Link className={`nav-link ${status === 'all' ? 'active' : ''}`} to="/users/all">
              All <span className="badge bg-dark">{users.length}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${status === 'active' ? 'active' : ''}`} to="/users/active">
              Active <span className="badge bg-success">{getNumberOfUsersByStatus('active')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${status === 'pending' ? 'active' : ''}`} to="/users/pending">
              Pending <span className="badge bg-warning">{getNumberOfUsersByStatus('pending')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${status === 'banned' ? 'active' : ''}`} to="/users/banned">
              Banned <span className="badge bg-danger">{getNumberOfUsersByStatus('banned')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${status === 'rejected' ? 'active' : ''}`} to="/users/rejected">
              Rejected <span className="badge bg-secondary">{getNumberOfUsersByStatus('rejected')}</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="input-group col-sm-4 my-3">
        <DropdownButton variant="light" style={{border: "1px solid #e2e5e9", borderRadius: "6px"}} id="dropdown-basic-button" title="Filter by Role">
          <div className='dropdown-menu-custom mx-3'>
            <Form.Check
              type="checkbox"
              label="Sales Representative"
              value="Sales Representative"
              onChange={handleRoleFilterChange}
            />
            <Form.Check
              type="checkbox"
              label="Customer Service Associate"
              value="Customer Service Associate"
              onChange={handleRoleFilterChange}
            />
            <Form.Check
              type="checkbox"
              label="Content Strategist"
              value="Content Strategist"
              onChange={handleRoleFilterChange}
            />
            <Form.Check
              type="checkbox"
              label="Software Developer"
              value="Software Developer"
              onChange={handleRoleFilterChange}
            />
            <Form.Check
              type="checkbox"
              label="Creative Director"
              value="Creative Director"
              onChange={handleRoleFilterChange}
            />
          </div>
        </DropdownButton>
        <input
          style={{borderRadius: "6px"}}
          type="text"
          className="form-control mx-3"
          placeholder="Search.."
          onChange={handleSearch}
        />
      </div>
      <UserList
        users={currentItems}
        currentPage={currentPage}
        paginate={paginate}
        pageNumbers={pageNumbers}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalUsers={filteredUsers.length}
        handleSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
    </>
  );
};

export default Lists;
