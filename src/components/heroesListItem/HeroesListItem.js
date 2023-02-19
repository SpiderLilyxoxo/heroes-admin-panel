import { motion } from "framer-motion";

const HeroesListItem = ({name, description, element, onDelete}) => {

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-success bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <motion.li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`} style={{width: "560px"}}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                ease: [0, 0.71, 0.2, 1.01]
            }}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text" style={{"overflow": "hidden", width: "360px", height: "76px"}}>{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-circle bg-light" style={{width: "36px", height: "36px", display: "flex", "align-items": "center"}}>
                <button type="button" className="btn-close btn-close" aria-label="Close" onClick={onDelete} style={{width: "100%", height: "100%"}}></button>
            </span>
        </motion.li>
    )
}

export default HeroesListItem;