import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './utilisateur.reducer';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUtilisateurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Utilisateur extends React.Component<IUtilisateurProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { utilisateurList, match } = this.props;
    return (
      <div>
        <h2 id="utilisateur-heading">
          <Translate contentKey="perudoOnlineApp.utilisateur.home.title">Utilisateurs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="perudoOnlineApp.utilisateur.home.createLabel">Create new Utilisateur</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.pseudo">Pseudo</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.points">Points</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.credit">Credit</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.couleur">Couleur</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.jeu">Jeu</Translate>
                </th>
                <th>
                  <Translate contentKey="perudoOnlineApp.utilisateur.plateau">Plateau</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {utilisateurList.map((utilisateur, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${utilisateur.id}`} color="link" size="sm">
                      {utilisateur.id}
                    </Button>
                  </td>
                  <td>{utilisateur.pseudo}</td>
                  <td>{utilisateur.points}</td>
                  <td>{utilisateur.credit}</td>
                  <td>{utilisateur.couleur}</td>
                  <td>{utilisateur.jeu ? <Link to={`jeu/${utilisateur.jeu.id}`}>{utilisateur.jeu.id}</Link> : ''}</td>
                  <td>{utilisateur.plateau ? <Link to={`plateau/${utilisateur.plateau.id}`}>{utilisateur.plateau.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${utilisateur.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ utilisateur }: IRootState) => ({
  utilisateurList: utilisateur.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Utilisateur);
