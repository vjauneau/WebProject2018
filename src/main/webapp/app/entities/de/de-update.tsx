import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJeu } from 'app/shared/model/jeu.model';
import { getEntities as getJeus } from 'app/entities/jeu/jeu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './de.reducer';
import { IDe } from 'app/shared/model/de.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDeUpdateState {
  isNew: boolean;
  jeuId: string;
}

export class DeUpdate extends React.Component<IDeUpdateProps, IDeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      jeuId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJeus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { deEntity } = this.props;
      const entity = {
        ...deEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/de');
  };

  render() {
    const { deEntity, jeus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="perudoOnlineApp.de.home.createOrEditLabel">
              <Translate contentKey="perudoOnlineApp.de.home.createOrEditLabel">Create or edit a De</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : deEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="de-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="valeurLabel" for="valeur">
                    <Translate contentKey="perudoOnlineApp.de.valeur">Valeur</Translate>
                  </Label>
                  <AvField id="de-valeur" type="string" className="form-control" name="valeur" />
                </AvGroup>
                <AvGroup>
                  <Label for="jeu.id">
                    <Translate contentKey="perudoOnlineApp.de.jeu">Jeu</Translate>
                  </Label>
                  <AvInput id="de-jeu" type="select" className="form-control" name="jeu.id">
                    <option value="" key="0" />
                    {jeus
                      ? jeus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/de" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jeus: storeState.jeu.entities,
  deEntity: storeState.de.entity,
  loading: storeState.de.loading,
  updating: storeState.de.updating,
  updateSuccess: storeState.de.updateSuccess
});

const mapDispatchToProps = {
  getJeus,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeUpdate);
