import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './de.reducer';
import { IDe } from 'app/shared/model/de.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DeDetail extends React.Component<IDeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { deEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="perudoOnlineApp.de.detail.title">De</Translate> [<b>{deEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valeur">
                <Translate contentKey="perudoOnlineApp.de.valeur">Valeur</Translate>
              </span>
            </dt>
            <dd>{deEntity.valeur}</dd>
            <dt>
              <Translate contentKey="perudoOnlineApp.de.jeu">Jeu</Translate>
            </dt>
            <dd>{deEntity.jeu ? deEntity.jeu.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/de" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/de/${deEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ de }: IRootState) => ({
  deEntity: de.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeDetail);
