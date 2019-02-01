import React from 'react';
import './game.css';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getGameState, whereAmI } from '../../entities/game/game.reducer';
import { IDe } from 'app/shared/model/de.model';
import { Container, Row, Col, Button, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
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
    console.log(this.props);
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
    console.log(newProps);
    if (newProps.gameState !== this.props.gameState) {
      this.state.IdTable = newProps.gameState.game.id;
      this.state.main.push(newProps.gameState.jeu.valeur1);
      this.state.main.push(newProps.gameState.jeu.valeur2);
      this.state.main.push(newProps.gameState.jeu.valeur3);
      this.state.main.push(newProps.gameState.jeu.valeur4);
      this.state.main.push(newProps.gameState.jeu.valeur5);
      this.state.main.push(newProps.gameState.jeu.valeur6);
      this.forceUpdate();
    }

    if (newProps.idGame !== this.props.idGame) {
      this.state.IdTable = newProps.idGame;
      this.props.getGameState(this.state.IdTable);
    }
  }

  render() {
    const { gameState } = this.props;
    return (
      <div>
        <Row>
          <Col md={2} className=" game_corporate">
            {' '}
            <Controller nbPlayer={3} nbDe={6} />{' '}
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
  whereAmI
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
