import { Link } from "react-router-dom"

import Card from "../../../../components/library/card/component"
import styles from "./styles.module.css"

const Project = ({ project }) => {
  
  return (
    <Link to={ `/project/${ project._id }/equipment` } className={ styles.link }> {/* Added '/equipment' to the url */}
      <div key={ project._id } className={ styles.project }>
        <div className={ styles.name }>{ project.name }</div>
        <div style={{ fontSize: '0.9rem', paddingTop: '10px'}}>{ project.description ? project.description : 'No  description' }</div>
        <div style={{ paddingTop:'20px' }}><strong>Client :</strong> { project.client }</div>
        {/* <div>Location: { project.location }</div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop:'5px' }}>
          <div><strong>Equipment :</strong> { project.equipment.length }</div>
          <div><strong>Circuits :</strong> { project.circuit ? project.circuit.length : 0 }</div>
          {/* <div>Equipment: { project.equipment.length }</div> */}
        </div>
      </div>
    </Link>
  );
}

export default Project