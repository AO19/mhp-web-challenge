import styled from 'styled-components';
import Houses from '../components/Houses';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  letter-spacing: 2px;
  line-height: 2rem;
  color: #FCFEF0;
  text-align: center;
  background-image: linear-gradient(to right, #000000, #313131, #616161, #959595, #cccccc);
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

function Home(props) {
  return (
    <Center>
      <Title>
        Houses of Ice and Fire
      </Title>
      <Houses />
    </Center>
  );
}

export default Home;