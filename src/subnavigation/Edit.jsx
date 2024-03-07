import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';
import View from './View';

const Edit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <View {...props} />
      <SidebarPortal selected={selected}>
        <Data
          key={block}
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
