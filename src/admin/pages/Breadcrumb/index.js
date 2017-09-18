import React from 'react';
import { Breadcrumb } from 'antd';
import { connect, Link } from 'mirrorx';
import compose from 'recompose/compose';
import split from 'lodash/split';
import { translate } from '../../i18n';
import "./style.css";

const BreadcrumbItem = Breadcrumb.Item;

const AppBreadcrumb = ({ translate, routes }) => (
  <Breadcrumb className="breadcrumb">
    <BreadcrumbItem>
      <Link to="/">{translate("page.home")}</Link>
    </BreadcrumbItem>
    {routes.map(({url, name}, index) => (
      <BreadcrumbItem key={index}>
        {url ?
          <Link to={url}>{translate(name)}</Link> :
          translate(name)
        }
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);

const getRoutes = ({ pathname }) => {
  const keys = split(pathname, "/", 4);
  const entity = keys[1];
  let action = keys[2];
  const routes = [];
  if (entity && entity !== "login") {
    routes.push({
      name: `models.${entity}.name`,
      url: keys.length > 2 ? `/${entity}` : ""
    });
  }
  if (action) {
    if (action === "create") {
      routes.push({
        name: `actions.create`,
        url: ""
      });
    }
    action = keys[3];
    if (action) {
      routes.push({
        name: `actions.${action}`,
        url: ""
      });
    }
  }
  return routes;
};

const enhance = compose(
  connect(({ routing: { location }}) => ({
    routes: getRoutes(location)
  })),
  translate
);

export default enhance(AppBreadcrumb);