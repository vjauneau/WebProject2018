import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { Translate, translate } from 'react-jhipster';

const logo = require('../../../static/images/logo-perudo.png');
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    this.props.login(username, password, rememberMe);
  };

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="7">
          <h2>
            <h2>
              {' '}
              <img className="logo-img" src={logo} alt="logo" width={'10%'} /> Bienvenue sur Perudo Online
            </h2>
          </h2>
          <p>
            <p>Perudo Online est une application gratuite afin de jouer au Perudo.</p>
          </p>
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
            ''
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  loginError: storeState.authentication.loginError
});

const mapDispatchToProps = { getSession, login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
