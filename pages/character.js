import SingleCharacter from "../components/SingleCharacter";

const Character = props => (
  <>
    <SingleCharacter id={props.query.id} />
  </>
);

export default Character;
