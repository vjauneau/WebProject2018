import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './jeu.reducer';
import { IJeu } from 'app/shared/model/jeu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJeuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JeuDetail extends React.Component<IJeuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jeuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="perudoOnlineApp.jeu.detail.title">Jeu</Translate> [<b>{jeuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nbDe">
                <Translate contentKey="perudoOnlineApp.jeu.nbDe">Nb De</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.nbDe}</dd>
            <dt>
              <span id="valeur1">
                <Translate contentKey="perudoOnlineApp.jeu.valeur1">Valeur 1</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur1}</dd>
            <dt>
              <span id="valeur2">
                <Translate contentKey="perudoOnlineApp.jeu.valeur2">Valeur 2</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur2}</dd>
            <dt>
              <span id="valeur3">
                <Translate contentKey="perudoOnlineApp.jeu.valeur3">Valeur 3</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur3}</dd>
            <dt>
              <span id="valeur4">
                <Translate contentKey="perudoOnlineApp.jeu.valeur4">Valeur 4</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur4}</dd>
            <dt>
              <span id="valeur5">
                <Translate contentKey="perudoOnlineApp.jeu.valeur5">Valeur 5</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur5}</dd>
            <dt>
              <span id="valeur6">
                <Translate contentKey="perudoOnlineApp.jeu.valeur6">Valeur 6</Translate>
              </span>
            </dt>
            <dd>{jeuEntity.valeur6}</dd>
          </dl>
          <Button tag={Link} to="/entity/jeu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/jeu/${jeuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ jeu }: IRootState) => ({
  jeuEntity: jeu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JeuDetail);
