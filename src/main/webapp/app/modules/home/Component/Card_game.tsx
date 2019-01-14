import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICardGameProps extends DispatchProps, RouteComponentProps<{ url: string }> {}

export class CardGame extends React.Component<ICardGameProps> {
  componentDidMount() {}

  render() {
    const { deList, match } = this.props;
    return <div />;
  }
}

const mapDispatchToProps = {
  getEntities
};

type DispatchProps = typeof mapDispatchToProps;

export default connect(mapDispatchToProps)(CardGame);
