import React from 'react';
import './game.css';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table, InputGroup, InputGroupAddon, InputGroupText, Input, Form, FormGroup, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';

import { Divider, Checkbox, Button } from '@material-ui/core';

import tablewaiting from './imgs/table3waiting.png';
export interface IPlatalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
  users: any;
}

export class Platal extends React.Component<IPlatalProps> {
  state = {
    IdTable: 0,
    main: []
  };
  users = [];
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.users !== this.props.users) {
      this.users = [];
      newProps.users.map(user => {
        this.users.push(user);
      });
    }
  }

  render() {
    const {} = this.props;
    return (
      <div className="inherit">
        <img src={tablewaiting} className="inherit" alt="tablewaiting" />

        {this.users[0] ? (
          <div className="table3player1">
            <p>{this.users[0].pseudo}</p>
          </div>
        ) : (
          ''
        )}
        {this.users[0] ? (
          <div>
            <div className="table3player1info">
              <p> score : {this.users[0].points}</p>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.users[1] ? (
          <div className="table3player2">
            <p>{this.users[1].pseudo}</p>
          </div>
        ) : (
          <div className="table3player2">
            <p>waiting for player to join ...</p>
          </div>
        )}

        {this.users[1] ? (
          <div>
            <div className="table3player2info">
              <p> score : {this.users[1].points}</p>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.users[2] ? (
          <div className="table3player3">
            <p>{this.users[2].pseudo}</p>
          </div>
        ) : (
          <div className="table3player3">
            <p>waiting for player to join ...</p>
          </div>
        )}
        {this.users[2] ? (
          <div>
            <div className="table3player3info">
              <p> score : {this.users[2].points}</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game }: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platal);
