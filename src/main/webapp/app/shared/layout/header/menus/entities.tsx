import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/utilisateur">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.utilisateur" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/plateau">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.plateau" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/jeu">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.jeu" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/de">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.de" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/jeu">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.jeu" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
