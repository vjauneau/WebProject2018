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
import { IDe } from 'app/shared/model/de.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Divider, Checkbox, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export interface IControllerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
  nbPlayer: any;
  nbDe: any;
}

export class Controller extends React.Component<IControllerProps> {
  state = {
    de: 0,
    value: 0
  };
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickParier(event) {}

  handleClickMenteur(event) {}

  render() {
    const {} = this.props;
    return (
      <div>
        <h2> Controller </h2>
        <Label>Actions</Label>
        <div>
          <TextField id="de-number" label="NbDés" value={this.state.de} onChange={this.handleChange('de')} type="number" margin="normal" />

          <TextField
            id="values-number"
            label="Valeurs"
            value={this.state.value}
            onChange={this.handleChange('value')}
            type="number"
            margin="normal"
          />
          <Button onClick={this.handleClickParier} variant="outlined">
            Parier !
          </Button>
          <Button onClick={this.handleClickMenteur} variant="outlined">
            Menteur !
          </Button>
        </div>
      </div>
    );
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
)(Controller);
