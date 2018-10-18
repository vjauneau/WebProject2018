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
import { IPlateau } from 'app/shared/model/plateau.model';
import { getEntities as getPlateaus } from 'app/entities/plateau/plateau.reducer';
import { getEntity, updateEntity, createEntity, reset } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUtilisateurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUtilisateurUpdateState {
  isNew: boolean;
  jeuId: string;
  plateauId: string;
}

export class UtilisateurUpdate extends React.Component<IUtilisateurUpdateProps, IUtilisateurUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      jeuId: '0',
      plateauId: '0',
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
    this.props.getPlateaus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { utilisateurEntity } = this.props;
      const entity = {
        ...utilisateurEntity,
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
    this.props.history.push('/entity/utilisateur');
  };

  render() {
    const { utilisateurEntity, jeus, plateaus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="perudoOnlineApp.utilisateur.home.createOrEditLabel">
              <Translate contentKey="perudoOnlineApp.utilisateur.home.createOrEditLabel">Create or edit a Utilisateur</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : utilisateurEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="utilisateur-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="pseudoLabel" for="pseudo">
                    <Translate contentKey="perudoOnlineApp.utilisateur.pseudo">Pseudo</Translate>
                  </Label>
                  <AvField id="utilisateur-pseudo" type="text" name="pseudo" />
                </AvGroup>
                <AvGroup>
                  <Label id="pointsLabel" for="points">
                    <Translate contentKey="perudoOnlineApp.utilisateur.points">Points</Translate>
                  </Label>
                  <AvField id="utilisateur-points" type="string" className="form-control" name="points" />
                </AvGroup>
                <AvGroup>
                  <Label id="creditLabel" for="credit">
                    <Translate contentKey="perudoOnlineApp.utilisateur.credit">Credit</Translate>
                  </Label>
                  <AvField id="utilisateur-credit" type="string" className="form-control" name="credit" />
                </AvGroup>
                <AvGroup>
                  <Label id="couleurLabel" for="couleur">
                    <Translate contentKey="perudoOnlineApp.utilisateur.couleur">Couleur</Translate>
                  </Label>
                  <AvField id="utilisateur-couleur" type="text" name="couleur" />
                </AvGroup>
                <AvGroup>
                  <Label for="jeu.id">
                    <Translate contentKey="perudoOnlineApp.utilisateur.jeu">Jeu</Translate>
                  </Label>
                  <AvInput id="utilisateur-jeu" type="select" className="form-control" name="jeu.id">
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
                <AvGroup>
                  <Label for="plateau.id">
                    <Translate contentKey="perudoOnlineApp.utilisateur.plateau">Plateau</Translate>
                  </Label>
                  <AvInput id="utilisateur-plateau" type="select" className="form-control" name="plateau.id">
                    <option value="" key="0" />
                    {plateaus
                      ? plateaus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/utilisateur" replace color="info">
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
  plateaus: storeState.plateau.entities,
  utilisateurEntity: storeState.utilisateur.entity,
  loading: storeState.utilisateur.loading,
  updating: storeState.utilisateur.updating,
  updateSuccess: storeState.utilisateur.updateSuccess
});

const mapDispatchToProps = {
  getJeus,
  getPlateaus,
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
)(UtilisateurUpdate);
