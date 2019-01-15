import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICardGameProps {
  nbPlayer: number;
  idTable: number;
  actualPlayer: number;
  prejoin: Function;
  joinable: any;
  joinGame: Function;
}

export class CardGame extends React.Component<ICardGameProps> {
  state = {
    toTable: false
  };

  constructor(props) {
    super(props);
    this.prejoin = this.prejoin.bind(this);
  }

  prejoin() {
    this.props.prejoin(this.props.idTable);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.joinable !== undefined) {
      if (newProps.joinable.id === this.props.idTable) {
        this.setState({ toTable: newProps.joinable.joinable });
      }
    }
  }

  render() {
    const { nbPlayer, idTable, actualPlayer } = this.props;

    if (this.state.toTable === true) {
      this.props.joinGame(idTable);
      return (
        <Redirect
          to={{
            pathname: '/Game',
            state: { idGame: idTable }
          }}
        />
      );
    }
    return (
      <div>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Table n°
              {idTable}
            </Typography>
            <Typography variant="h5" component="h2">
              Nombre de Joueur : {actualPlayer} / {nbPlayer}
            </Typography>
          </CardContent>
          <CardActions>
            {actualPlayer < nbPlayer ? (
              <Button onClick={this.prejoin} size="small" variant="outlined">
                Rejoindre
              </Button>
            ) : (
              <Button size="small" variant="outlined" disabled>
                Rejoindre
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}
