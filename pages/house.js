import SingleHouse from '../components/SingleHouse';

const House = props => (
  <div>
    <SingleHouse id={props.query.id} />
  </div>
);

export default House;
