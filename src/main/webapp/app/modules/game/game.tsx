import React from 'react';
import './game.css';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getGameState, whereAmI, setPari, callLier } from '../../entities/game/game.reducer';
import { Container, Row, Col, Button, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import Controller from './controller';
import Platal from './Platal';
import Chat from './chat';
import ShowGame from './showGame';
export interface IGameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Game extends React.Component<IGameProps> {
  state = {
    IdTable: 0,
    main: []
  };
  interval: any;

  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
  }
  componentDidMount() {
    if (this.state.IdTable === 0) {
      if (this.props.location.state) this.state.IdTable = this.props.location.state.idGame;
      this.props.getGameState(this.state.IdTable);
      this.interval = setInterval(() => this.props.getGameState(this.state.IdTable), 5000);
    }
  }

  handleclick() {
    this.props.getGameState(this.state.IdTable);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.game) {
      if (newProps.game.id !== this.state.IdTable) {
        this.state.IdTable = newProps.game.id;
      }
    }
    if (newProps.idGame !== this.props.idGame) {
      this.state.IdTable = newProps.idGame;
      this.props.getGameState(this.state.IdTable);
    }
  }

  render() {
    const { gameState } = this.props;
    // console.log(gameState);
    return (
      <div>
        <Row>
          <Col md={2} className=" game_corporate">
            {' '}
            <Controller
              nbPlayer={3}
              nbDe={6}
              idGame={this.state.IdTable}
              game={gameState.game}
              setPari={this.props.setPari}
              pseudoJoueur={this.props.gameState.pseudoJoueur}
              joueur2p={this.props.gameState.joueurToPlay}
              callLier={this.props.callLier}
            />{' '}
          </Col>
          <Col md={7} className="">
            <Col md={12} className="game_corporate">
              <Platal users={this.props.gameState.user} />
            </Col>
            <Col md={12} className="game_corporate">
              <ShowGame jeu={this.props.gameState.jeu} ptsJoueur={this.props.gameState.pointsJoueur} />{' '}
            </Col>
          </Col>
          <Col md={3} className="game_corporate">
            {' '}
            <Chat />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ game }: IRootState) => ({
  gameState: game.stateGame,
  idGame: game.idGame
});

const mapDispatchToProps = {
  getGameState,
  whereAmI,
  setPari,
  callLier
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
