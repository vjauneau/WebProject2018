import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plateau.reducer';
import { IPlateau } from 'app/shared/model/plateau.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlateauDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlateauDetail extends React.Component<IPlateauDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { plateauEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="perudoOnlineApp.plateau.detail.title">Plateau</Translate> [<b>{plateauEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">
                <Translate contentKey="perudoOnlineApp.plateau.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{plateauEntity.nom}</dd>
            <dt>
              <span id="valeur">
                <Translate contentKey="perudoOnlineApp.plateau.valeur">Valeur</Translate>
              </span>
            </dt>
            <dd>{plateauEntity.valeur}</dd>
          </dl>
          <Button tag={Link} to="/entity/plateau" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/plateau/${plateauEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ plateau }: IRootState) => ({
  plateauEntity: plateau.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlateauDetail);
