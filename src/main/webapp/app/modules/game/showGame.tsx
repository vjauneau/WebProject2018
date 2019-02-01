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
import de1 from './imgs/de1.png';
import de2 from './imgs/de2.png';
import de3 from './imgs/de3.png';
import de4 from './imgs/de4.png';
import de5 from './imgs/de5.png';
import de6 from './imgs/de6.png';
import { Divider, Checkbox, Button } from '@material-ui/core';
export interface IShowGameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
  jeu: any;
  ptsJoueur: any;
}

export class ShowGame extends React.Component<IShowGameProps> {
  jeu: any;

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.jeu) this.jeu = this.props.jeu;
  }
  componentWillReceiveProps(newProps) {
    if (newProps.jeu) this.jeu = newProps.jeu;
  }

  getSrcImg(idx) {
    switch (idx) {
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

  render() {
    const { jeu, ptsJoueur } = this.props;
    console.log(this.props);
    console.log(this.jeu);
    return (
      <div>
        <Row>
          <Col md={12} className="AlignCenter">
            <h2>Votre jeu : </h2>

            <Col md={12}>
              <div>
                {this.jeu ? (
                  <div>
                    <img src={this.getSrcImg(this.jeu.valeur1)} className="imgDe" />
                    <img src={this.getSrcImg(this.jeu.valeur2)} className="imgDe" />
                    <img src={this.getSrcImg(this.jeu.valeur3)} className="imgDe" />
                    <img src={this.getSrcImg(this.jeu.valeur4)} className="imgDe" />
                    <img src={this.getSrcImg(this.jeu.valeur5)} className="imgDe" />
                    <img src={this.getSrcImg(this.jeu.valeur6)} className="imgDe" />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>

            <p>Vos points : {ptsJoueur}</p>
          </Col>
        </Row>
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
)(ShowGame);
