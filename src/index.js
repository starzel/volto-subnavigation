import SubnavigationEdit from './subnavigation/Edit';
import SubnavigationView from './subnavigation/View';
import navSVG from '@plone/volto/icons/nav.svg';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const applyConfig = (config) => {

  config.blocks.blocksConfig.subnavigation = {
    id: 'subnavigation',
    title: 'Subnavigation',
    icon: navSVG,
    group: 'common',
    view: SubnavigationView,
    edit: SubnavigationEdit,
    schema: BlockSettingsSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };


  return config;
};

export default applyConfig;
