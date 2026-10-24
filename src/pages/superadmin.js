import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SuperadminPage() {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  // 1. Fetch users from Supabase
  async function fetchUsers() {
    setLoading(true)
    const { data, error } = await supabase
      .from('app_user') // or 'USERS' depending on your schema
      .select('*')

    if (error) {
      setMessage(`Error fetching users: ${error.message}`)
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  // 2. Approve Pending Users
  async function handleApproveUser(userId) {
    const { error } = await supabase
      .from('app_user')
      .update({ status: 'Active' })
      .eq('id', userId)

    if (error) {
      setMessage(`Failed to approve user: ${error.message}`)
    } else {
      setMessage('User approved successfully!')
      fetchUsers()
    }
  }

  // 3. Toggle Block / Unblock with Last Superadmin Safeguard
  async function handleToggleBlock(user) {
    const superadminCount = users.filter(
      (u) => u.role === 'Superadmin' && u.status === 'Active'
    ).length

    // Safeguard: Do not allow disabling the last remaining Superadmin
    if (user.role === 'Superadmin' && user.status === 'Active' && superadminCount <= 1) {
      alert('Cannot disable or block the last remaining Superadmin.')
      return
    }

    const newStatus = user.status === 'Blocked' ? 'Active' : 'Blocked'
    const { error } = await supabase
      .from('app_user')
      .update({ status: newStatus })
      .eq('id', user.id)

    if (error) {
      setMessage(`Failed to update status: ${error.message}`)
    } else {
      setMessage(`User ${user.email} status changed to ${newStatus}`)
      fetchUsers()
    }
  }

  // 4. Role Assignment with Last Superadmin Safeguard
  async function handleRoleChange(user, newRole) {
    const superadminCount = users.filter(
      (u) => u.role === 'Superadmin' && u.status === 'Active'
    ).length

    // Safeguard: Do not allow demoting the last remaining Superadmin
    if (user.role === 'Superadmin' && newRole !== 'Superadmin' && superadminCount <= 1) {
      alert('Cannot demote the last remaining Superadmin.')
      return
    }

    const { error } = await supabase
      .from('app_user')
      .update({ role: newRole })
      .eq('id', user.id)

    if (error) {
      setMessage(`Failed to update role: ${error.message}`)
    } else {
      setMessage(`Updated role for ${user.email} to ${newRole}`)
      fetchUsers()
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Superadmin User Management</h2>
      <p style={{ color: 'gray' }}>
        Approve pending users, assign roles, and manage permissions.
      </p>

      {message && <div style={{ marginBottom: '15px', color: 'blue' }}>{message}</div>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.first_name || u.name} {u.last_name || ''}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role || 'User'}
                    onChange={(e) => handleRoleChange(u, e.target.value)}
                  >
                    <option value="User">USER</option>
                    <option value="Admin">ADMIN</option>
                    <option value="Superadmin">SUPERADMIN</option>
                  </select>
                </td>
                <td>
                  <span style={{ 
                    color: u.status === 'Blocked' ? 'red' : u.status === 'Pending' ? 'orange' : 'green',
                    fontWeight: 'bold' 
                  }}>
                    {u.status || 'Active'}
                  </span>
                </td>
                <td>
                  {u.status === 'Pending' && (
                    <button onClick={() => handleApproveUser(u.id)} style={{ marginRight: '5px' }}>
                      Approve
                    </button>
                  )}
                  <button onClick={() => handleToggleBlock(u)}>
                    {u.status === 'Blocked' ? 'Unlock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}