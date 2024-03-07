import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigation } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Grid } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import chevronSVG from './chevron-right.svg';
import cx from 'classnames';

import './styles.less';

const View = (props) => {
  const { className, data, editable } = props;
  const dispatch = useDispatch();
  const max_depth = data.depth || 2;

  const subnavigation = useSelector((state) => state.navigation?.items);
  const path = getBaseUrl(props?.pathname || props?.path) || null;

  React.useEffect(() => {
    dispatch(getNavigation(path, 7));
  }, [dispatch, path]);

  const renderItems = (items) => {
    // Split into two even rows
    const midIndex = Math.ceil(items.length / 2);
    const firstRow = items.slice(0, midIndex);
    const secondRow = items.slice(midIndex);

    const itemRow = (item) => (
      <div key={item.url} className={cx('navitem', item.cssclass)}>
        <Icon size="16px" name={chevronSVG} className={cx('linkprefix')} />
        <Link to={item.url}>{item.title}</Link>
      </div>
    );

    return (
      <>
        <Grid.Column>{firstRow.map((item) => itemRow(item))}</Grid.Column>
        <Grid.Column>{secondRow.map((item) => itemRow(item))}</Grid.Column>
      </>
    );
  };

  const flatten = (items, depth = 1) => {
    let results = [];
    items.forEach((item) => {
      if (depth > 1) {
        item.cssclass = `level-${depth}`;
      }
      results.push(item);
      if (depth < max_depth) {
        results.push(...flatten(item.items, depth + 1));
      }
    });
    return results;
  };

  const filterTree = (items) => {
    if (!path) {
      return [];
    }
    for (const item of items) {
      if (!path.includes(item.url) || !item?.items?.length) {
        continue;
      } else if (path === item.url) {
        return item.items;
      } else if (path.includes(item.url) && item.items) {
        return filterTree(item.items, path);
      }
    }
    return [];
  };
  const subNavItems = filterTree(subnavigation);
  const flatitem = flatten(subNavItems);
  return (
    <div className={cx('block subnavigation', className)}>
      {data.title && <h3>{data.title}</h3>}
      {subNavItems.length > 0 && (
        <Grid divided="vertically">
          <Grid.Row columns={2}>{renderItems(flatitem)}</Grid.Row>
        </Grid>
      )}
      {editable && subNavItems.length === 0 && (
        <em>Is this block needed? No Subnavigation items to display</em>
      )}
    </div>
  );
};

export default View;
