import { Link } from "react-router-dom"

import Card from "../../../../components/library/card/component"
import styles from "./styles.module.css"

const Project = ({ project }) => {
  
  return (
    <Link to={ `/project/${ project._id }/equipment` } className={ styles.link }> {/* Added '/equipment' to the url */}
      <div key={ project._id } className={ styles.project }>
        <div className={ styles.name }>{ project.name }</div>
        <div>Client: { project.client }</div>
        <div>Location: { project.location }</div>
        {/* <div>Circuits: { project.circuits.length }</div> */}
        <div>{ project.description }</div>
      </div>
    </Link>
  );
}

export default Project