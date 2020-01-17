import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Button, Modal, Skeleton, Tag } from "antd";
import 'antd/dist/antd.css';


const CHARACTERS_QUERY = gql`
  {
    allPeople  {
        edges {
            node {
              birthYear
              eyeColor
              gender
              hairColor
              height
              homeworld { name }
              mass
              name
              skinColor
              filmConnection { edges { node { 
                title 
                director
                openingCrawl
                planetConnection { edges { node {
                  name 
                }}}
              }}}
            }
        }
    }
  }
`;

const initialState = { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false };


const gridStyle = {
  width: '50%',
  textAlign: 'center',
  backgroundColor: 'black',
  color: 'rgba(255, 198, 0, 1)',
  fontSize: '36px'
};

const cardStyle = {
  opacity: '0.7',
  margin: '25px',
  backgroundColor: 'black',
  color: 'rgba(255, 255, 255, 1)'
};

function CharacterList() {

  const [characters, setCharacters] = useState([]);
  const [state, setState] = useState(initialState);

  const showModal = e => {
    e.preventDefault();
    const name = e.target.id
    setState({ ...state, [name]: true })
  };

  const handleOk = e => {
    e.preventDefault();
    setState(initialState)
  };

  const handleCancel = e => {
    e.preventDefault();
    setState(initialState)
  };

  const getCharacters = () => {
    return (
      <Query query={CHARACTERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return (
            <Card style={cardStyle}>
              <Skeleton loading={loading} avatar active></Skeleton>
            </Card>
          )
          if (error) {
            console.log(error)
            return <div>Error</div>
          }

          setCharacters(data.allPeople.edges)


          return (
            <Card style={cardStyle}>
              {characters.map((card, index) =>

                <Card.Grid style={gridStyle} key={index}>
                  {card.node.name}
                  <br />
                  <Button id={index} onClick={showModal} ghost>Mas información</Button>
                  <Modal
                    title={card.node.name}
                    visible={state[index]}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    key={index}
                  >
                    <p>Nombre: {card.node.name}</p>
                    <p>Año de nacimiento: {card.node.birthYear}</p>
                    <p>Genero: {card.node.gender}</p>
                    <p>Color de pelo: {card.node.hairColor}</p>
                    <p>Estatura: {card.node.height}</p>
                    <p>Planeta de nacimiento: {card.node.homeworld.name}</p>
                    <p>Masa: {card.node.mass}</p>
                    <p>Color de piel: {card.node.skinColor}</p>
                    <h1>Participa en las siguientes peliculas:</h1>

                    {card.node.filmConnection.edges.map(film =>
                      <div>
                        <h1>{film.node.title}</h1>
                        <h2>Director: {film.node.director}</h2>
                        <p>{film.node.openingCrawl}</p>
                        {film.node.planetConnection.edges.map(planet => <Tag color="purple">{planet.node.name}</Tag>)}
                      </div>)
                    }
                  </Modal>
                </Card.Grid>)}

            </Card>
          )

        }}
      </Query>
    )
  };

  return (
    getCharacters()
  );
}

export default CharacterList;
