import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
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
}

export class CardGame extends React.Component<ICardGameProps> {
  componentDidMount() {}

  render() {
    const { nbPlayer, idTable, actualPlayer } = this.props;
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
              <Button size="small" variant="outlined">
                Rejoindre
              </Button>
            ) : (
              <Button size="small" disabled>
                Rejoindre
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {};

type DispatchProps = typeof mapDispatchToProps;

export default connect(mapDispatchToProps)(CardGame);
