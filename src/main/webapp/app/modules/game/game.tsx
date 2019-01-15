import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getGameState } from '../../entities/game/game.reducer';
import { IDe } from 'app/shared/model/de.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Game extends React.Component<IGameProps> {
  state = {
    IdTable: 0,
    main: []
  };

  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
  }
  componentDidMount() {
    if (this.state.IdTable === 0 && this.props.location.state) {
      this.state.IdTable = this.props.location.state.idGame;
      this.props.getGameState(this.state.IdTable);
    }
  }
  handleclick() {
    this.props.getGameState(this.state.IdTable);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.gameState !== this.props.gameState) {
      this.state.main.push(newProps.gameState.jeu.valeur1);
      this.state.main.push(newProps.gameState.jeu.valeur2);
      this.state.main.push(newProps.gameState.jeu.valeur3);
      this.state.main.push(newProps.gameState.jeu.valeur4);
      this.state.main.push(newProps.gameState.jeu.valeur5);
      this.state.main.push(newProps.gameState.jeu.valeur6);
      this.forceUpdate();
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const { gameState } = this.props;
    return (
      <div>
        <p>Game</p>
        <Button onClick={this.handleclick}>refresh</Button>
        {this.state.main.map(val => {
          return <h2>{val}</h2>;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ game }: IRootState) => ({
  gameState: game.stateGame
});

const mapDispatchToProps = {
  getGameState
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
