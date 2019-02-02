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
import de0 from './imgs/de0.png';
import de1 from './imgs/de1.png';
import de2 from './imgs/de2.png';
import de3 from './imgs/de3.png';
import de4 from './imgs/de4.png';
import de5 from './imgs/de5.png';
import de6 from './imgs/de6.png';

export interface IControllerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
  nbPlayer: any;
  nbDe: any;
  game: any;
  pseudoJoueur: any;
  joueur2p: any;
  setPari: any;
  idGame: any;
}

export class Controller extends React.Component<IControllerProps> {
  state = {
    de: 0,
    value: 0
  };
  constructor(props) {
    super(props);
    this.handleClickParier = this.handleClickParier.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getSrcImg(idx) {
    switch (idx) {
      case 0:
        return de0;
        break;
      case 1:
        return de1;
        break;
      case 2:
        return de2;
        break;
      case 3:
        return de3;
        break;
      case 4:
        return de4;
        break;
      case 5:
        return de5;
        break;
      case 6:
        return de6;
        break;
      default:
        break;
    }
  }

  handleClickParier(event) {
    console.log(this.props.game.valeurDePari);
    console.log(this.state.value);
    const valeur = +this.state.value;
    console.log(valeur);
    if (valeur === this.props.game.valeurDePari) {
      console.log('meme valeur ');
      if (this.state.de > this.props.game.nbDePari) {
        console.log('Pari ');
        this.props.setPari(this.props.idGame, this.state.de, this.state.value);
      } else {
        console.log('Pari impossible');
      }
    } else {
      console.log('valeur differente ');
      if (valeur > this.props.game.valeurDePari && this.state.de !== 0) {
        console.log('Pari ');
        this.props.setPari(this.props.idGame, this.state.de, this.state.value);
      } else {
        console.log('Pari impossible');
      }
    }
  }

  handleClickMenteur(event) {}

  componentWillReceiveProps(newProps) {}

  render() {
    const { game, pseudoJoueur, joueur2p } = this.props;
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
          {game ? (
            pseudoJoueur === joueur2p ? (
              <div>
                <Button onClick={this.handleClickParier} variant="outlined">
                  Parier !
                </Button>
                <Button onClick={this.handleClickMenteur} variant="outlined">
                  Menteur !
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={this.handleClickParier} variant="outlined" disabled>
                  Parier !
                </Button>
                <Button onClick={this.handleClickMenteur} variant="outlined" disabled>
                  Menteur !
                </Button>
              </div>
            )
          ) : (
            ''
          )}
        </div>

        <Label>Informations</Label>
        {game ? (
          <h2>
            Mise actuelle :{' '}
            <div className="center spacedTop">
              {game.nbDePari} X <img src={this.getSrcImg(game.valeurDePari)} className="imgDePari" />{' '}
            </div>
          </h2>
        ) : (
          <h2>Attente des données serveur</h2>
        )}
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
