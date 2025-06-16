import { useEffect, useState } from "react"
import { getUser } from "../../../services/auth";

import styles from './styles.module.css';

const Profile = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUser = async () => {
        try {
          const data = await getUser();
          console.log(data);
          setUser(data);
        } catch (err) {
          console.error(err);
          setError(err.message || 'Error loading projects');
        } finally {
        setLoading(false);
      }
      };
      loadUser();
    }, []);
  
    if (loading) return <p>Loading projects...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div className={ styles.container }>
      <h1>Your profile</h1>
      <p>{ user.name }</p>
      <p>{ user.username }</p>
      <p>{ user.email }</p>
      <p>{ user.role }</p>
      <p>{ user.organization }</p>
      <p>{ user.location }</p>
    </div>
  )
}

export default Profile