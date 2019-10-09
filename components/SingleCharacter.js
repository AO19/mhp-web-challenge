import React, { Component } from 'react';
import styled from 'styled-components';
import { getCharacter } from '../helpers/apiFunctions';
import { Center } from './SingleHouse';

const BiggerCenter = styled(Center)`
  height: 90vh;
  width: auto;
`;

const CharacterStyles = styled.div`
  max-width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 10px solid gold;
  border-radius: 50%;
  padding: 8rem;
  background: white;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  letter-spacing: 0.25rem;
  @media (max-width: 600px) {
    border-radius: 5px;
    border: 1px solid gold;
    padding: none;
    box-shadow: none;
  }
`;

export default class SingleCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
  }

  async componentDidMount() {
    const character = await getCharacter(`https://www.anapioficeandfire.com/api/characters/${this.props.id}`);
    this.setState({
      character,
    });
  }

  render() {
    const { character } = this.state;
    if (character === null) {
      return null;
    }
    return (
      <BiggerCenter>
        <CharacterStyles>
          <p>{character.name} ({character.born} - †{character.died})</p>
          <p>{character.gender}</p>
          {character.father || character.mother ? <p>{character.father.name ? character.father.name : 'Unknown'} (Father) and {character.mother.name ? character.mother.name : 'Unknown'} (Mother)</p> : <p>Unknown Parents</p>}
        </CharacterStyles>
      </BiggerCenter>
    )
  }
}
