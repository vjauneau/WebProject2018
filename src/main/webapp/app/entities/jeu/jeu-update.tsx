import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { getEntities as getUtilisateurs } from 'app/entities/utilisateur/utilisateur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './jeu.reducer';
import { IJeu } from 'app/shared/model/jeu.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJeuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IJeuUpdateState {
  isNew: boolean;
  utilisateurId: string;
}

export class JeuUpdate extends React.Component<IJeuUpdateProps, IJeuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      utilisateurId: '0',
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

    this.props.getUtilisateurs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { jeuEntity } = this.props;
      const entity = {
        ...jeuEntity,
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
    this.props.history.push('/entity/jeu');
  };

  render() {
    const { jeuEntity, utilisateurs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="perudoOnlineApp.jeu.home.createOrEditLabel">
              <Translate contentKey="perudoOnlineApp.jeu.home.createOrEditLabel">Create or edit a Jeu</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jeuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="jeu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nbDeLabel" for="nbDe">
                    <Translate contentKey="perudoOnlineApp.jeu.nbDe">Nb De</Translate>
                  </Label>
                  <AvField id="jeu-nbDe" type="string" className="form-control" name="nbDe" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur1Label" for="valeur1">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur1">Valeur 1</Translate>
                  </Label>
                  <AvField id="jeu-valeur1" type="string" className="form-control" name="valeur1" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur2Label" for="valeur2">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur2">Valeur 2</Translate>
                  </Label>
                  <AvField id="jeu-valeur2" type="string" className="form-control" name="valeur2" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur3Label" for="valeur3">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur3">Valeur 3</Translate>
                  </Label>
                  <AvField id="jeu-valeur3" type="string" className="form-control" name="valeur3" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur4Label" for="valeur4">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur4">Valeur 4</Translate>
                  </Label>
                  <AvField id="jeu-valeur4" type="string" className="form-control" name="valeur4" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur5Label" for="valeur5">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur5">Valeur 5</Translate>
                  </Label>
                  <AvField id="jeu-valeur5" type="string" className="form-control" name="valeur5" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeur6Label" for="valeur6">
                    <Translate contentKey="perudoOnlineApp.jeu.valeur6">Valeur 6</Translate>
                  </Label>
                  <AvField id="jeu-valeur6" type="string" className="form-control" name="valeur6" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/jeu" replace color="info">
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
  utilisateurs: storeState.utilisateur.entities,
  jeuEntity: storeState.jeu.entity,
  loading: storeState.jeu.loading,
  updating: storeState.jeu.updating,
  updateSuccess: storeState.jeu.updateSuccess
});

const mapDispatchToProps = {
  getUtilisateurs,
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
)(JeuUpdate);
