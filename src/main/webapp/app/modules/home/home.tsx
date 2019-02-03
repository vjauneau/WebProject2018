import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { getSession, login } from 'app/shared/reducers/authentication';
import { Translate, translate } from 'react-jhipster';
import { CardGame } from './Component/Card_game';
import { getEntities, isGameJoinable, JoinGame } from 'app/entities/game/game.reducer';
// tslint:disable-next-line
const logo = require('../../../static/images/logo-perudo.png');
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  state = {
    gamePreJoin: {
      id: 0,
      joinable: false
    },
    gameJoinable: {
      id: null,
      joinable: null
    }
  };

  constructor(props) {
    super(props);
    this.handlePrejoin = this.handlePrejoin.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
    if (this.props.account && this.props.account.login) this.props.getEntities();
  }
  componentWillReceiveProps(newProps) {
    if (this.props.account.login !== newProps.account.login) {
      if (newProps.account && newProps.account.login) this.props.getEntities();
    }
    if (newProps.joinable !== undefined) {
      if (this.props.joinable !== newProps.joinable) {
        this.setState({ gameJoinable: { id: this.state.gamePreJoin.id, joinable: newProps.joinable } });
      }
    }
  }

  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    this.props.login(username, password, rememberMe);
  };

  handlePrejoin(idTable) {
    this.state.gamePreJoin.id = idTable;
    this.props.isGameJoinable(idTable);
  }

  render() {
    const { account, gameList, joinable, isAuthenticated, isAdmin } = this.props;
    return (
      <Row>
        <Col md="7">
          <h2>
            <img className="logo-img" src={logo} alt="logo" width={'10%'} /> Bienvenue sur Perudo Online
          </h2>

          <p>Perudo Online est une application gratuite permettant de jouer au Perudo.</p>
          <h4>Règles</h4>

          <p>Chaque joueur a un jeu de dés que seul lui connait,</p>
          <p>Chaque joueur enchérit sur le nombre de dés totaux sur la table</p>
          <p>Si un joueur pensent que le précédent à menti sur les dés de la table</p>
          <p>il le déclare menteur. Si le joueur a effectivement mentit il prend un point sinon</p>
          <p>c'est le joueur actuel qui prend un point, l'objectif est de finir avec le moins de points</p>

          {account && account.login ? (
            <div>
              <Alert color="success">
                <p>Vous êtes connecté en tant que {account.login}.</p>
              </Alert>
            </div>
          ) : (
            ''
          )}
        </Col>
        <Col md="5" className="pad">
          {account && !account.login ? (
            <AvForm onSubmit={this.handleSubmit}>
              <ModalHeader id="login-title">
                <Translate contentKey="login.title">Sign in</Translate>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    {/* {loginError ? (
                  <Alert color="danger">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                  </Alert>
                ) : null} */}
                  </Col>
                  <Col md="12">
                    <AvField
                      name="username"
                      label={translate('global.form.username')}
                      placeholder={translate('global.form.username.placeholder')}
                      required
                      errorMessage="Username cannot be empty!"
                      autoFocus
                    />
                    <AvField
                      name="password"
                      type="password"
                      label={translate('login.form.password')}
                      placeholder={translate('login.form.password.placeholder')}
                      required
                      errorMessage="Password cannot be empty!"
                    />
                    <AvGroup check inline>
                      <Label className="form-check-label">
                        <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
                      </Label>
                    </AvGroup>
                  </Col>
                </Row>
                <div className="mt-1">&nbsp;</div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" tabIndex="1">
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
                </Button>{' '}
                <Button color="primary" type="submit">
                  <Translate contentKey="login.form.button">Sign in</Translate>
                </Button>
              </ModalFooter>
            </AvForm>
          ) : (
            // tslint:disable-next-line
            gameList.map(game => {
              return (
                <div key={game.id}>
                  <CardGame
                    idTable={game.id}
                    actualPlayer={game.actualPlayer}
                    nbPlayer={game.nbPlayer}
                    prejoin={this.handlePrejoin}
                    joinable={this.state.gameJoinable}
                    joinGame={JoinGame}
                  />
                  {isAuthenticated && isAdmin && <Button>Add new Game</Button>}
                </div>
              );
            })
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  loginError: storeState.authentication.loginError,
  gameList: storeState.game.entities,
  joinable: storeState.game.joinable,
  isAdmin: storeState.authentication.isAdmin
});

const mapDispatchToProps = { getSession, login, getEntities, isGameJoinable, JoinGame };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
