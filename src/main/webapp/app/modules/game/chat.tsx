import React from 'react';
import './game.css';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table, InputGroup, InputGroupAddon, InputGroupText, Input, Form, FormGroup, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getGameState } from '../../entities/game/game.reducer';

import { Divider, Checkbox, Button } from '@material-ui/core';

export interface IChatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Chat extends React.Component<IChatProps> {
  state = {
    IdTable: 0,
    main: []
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;
    return <h2>Chat</h2>;
  }
}

const mapStateToProps = ({ game }: IRootState) => ({});

const mapDispatchToProps = {
  getGameState
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
