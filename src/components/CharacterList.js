import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Button, Modal } from "antd";
import 'antd/dist/antd.css';

const CHARACTERS_QUERY = gql`
  {
    allPeople (first: 10){
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
              species { name }
              filmConnection { edges { node { title } } }
            }
        }
    }
  }
`;

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

  const [state, setState] = useState([{ visible: false }]);
  const [characters, setCharacters] = useState([]);

  const showModal = e => {
    e.preventDefault();
    setState({ visible: true })
  };

  const handleOk = e => {
    e.preventDefault();
    setState({ visible: false })
  };

  const handleCancel = e => {
    e.preventDefault();
    setState({ visible: false })
  };

  return (
    <Query query={CHARACTERS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return (
          <Card style={cardStyle}>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
            <Card.Grid style={gridStyle}>Loading ...</Card.Grid>
          </Card>
        )
        if (error) return <div>Error</div>

        setCharacters(data.allPeople.edges)
        console.log(characters);


        return (
          <Card style={cardStyle}>
            {characters.map(card => <Card.Grid
              style={gridStyle}
              key={card.node.id}
            >
              {card.node.name}
              <br />
              <Button onClick={showModal} ghost>Mas información</Button>
              <Modal
                title={card.node.name}
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Nombre: {card.node.name}</p>
              </Modal>
            </Card.Grid>)}
          </Card>
        )

      }}
    </Query>
  );
}

export default CharacterList;
