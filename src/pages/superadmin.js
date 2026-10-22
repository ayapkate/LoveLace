import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SuperadminPage() {
  const [pendingUsers, setPendingUsers] = useState([])

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  async function fetchPendingUsers() {
    const { data, error } = await supabase
      .from('app_user')
      .select('*')
      .eq('status', 'pending')
    
    if (!error && data) setPendingUsers(data)
  }

  async function approveUser(userId) {
    await supabase
      .from('app_user')
      .update({ status: 'approved' })
      .eq('id', userId)
    
    fetchPendingUsers()
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>Superadmin User Management</h2>
      <p>Approve pending user registrations and designate roles.</p>
      
      <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No pending user registrations found.</td>
            </tr>
          ) : (
            pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role || 'user'}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => approveUser(user.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    Approve
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}