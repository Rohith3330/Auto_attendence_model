import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircle } from '@fortawesome/free-regular-svg-icons'

export default function CircleIcon({ number, color, name, onChange }) {
  return (
    <div onClick={() => onChange(name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesomeIcon  icon={faCircle} size="50" style={{height: "40px", color: color === true ? "#02A499" : "#D1193E",}}/>
      <span style={{ fontSize: 20, position: 'absolute' }}>{number}</span>
    </div>
  );
}
