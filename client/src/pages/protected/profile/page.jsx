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
      <div className={ styles.card }>
      
        <h2 className={ styles.title }>{ user.name }</h2>
      
        <div className={ styles.meta }>
          <span><strong>Username:</strong> { user.username }</span>
          <span><strong>Email:</strong> { user.email }</span>
        </div>
        <div className={ styles.meta }>
          <span><strong>Organization:</strong> { user.organization }</span>
          <span><strong>Role:</strong> { user.role }</span>
        </div>
        <div className={ styles.meta }>
          <span><strong>Location:</strong> { user.location }</span>
          <span><strong>Phone:</strong> { user.phone }</span>
        </div>
      </div>
    </div>
  )
}

export default Profile