import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUtilisateurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UtilisateurDetail extends React.Component<IUtilisateurDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { utilisateurEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="perudoOnlineApp.utilisateur.detail.title">Utilisateur</Translate> [<b>{utilisateurEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="pseudo">
                <Translate contentKey="perudoOnlineApp.utilisateur.pseudo">Pseudo</Translate>
              </span>
            </dt>
            <dd>{utilisateurEntity.pseudo}</dd>
            <dt>
              <span id="points">
                <Translate contentKey="perudoOnlineApp.utilisateur.points">Points</Translate>
              </span>
            </dt>
            <dd>{utilisateurEntity.points}</dd>
            <dt>
              <span id="credit">
                <Translate contentKey="perudoOnlineApp.utilisateur.credit">Credit</Translate>
              </span>
            </dt>
            <dd>{utilisateurEntity.credit}</dd>
            <dt>
              <span id="couleur">
                <Translate contentKey="perudoOnlineApp.utilisateur.couleur">Couleur</Translate>
              </span>
            </dt>
            <dd>{utilisateurEntity.couleur}</dd>
            <dt>
              <Translate contentKey="perudoOnlineApp.utilisateur.jeu">Jeu</Translate>
            </dt>
            <dd>{utilisateurEntity.jeu ? utilisateurEntity.jeu.id : ''}</dd>
            <dt>
              <Translate contentKey="perudoOnlineApp.utilisateur.plateau">Plateau</Translate>
            </dt>
            <dd>{utilisateurEntity.plateau ? utilisateurEntity.plateau.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/utilisateur" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/utilisateur/${utilisateurEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ utilisateur }: IRootState) => ({
  utilisateurEntity: utilisateur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UtilisateurDetail);
