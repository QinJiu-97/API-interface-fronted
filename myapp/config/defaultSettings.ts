import {Settings as LayoutSettings} from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'The ninety-seven district',
  pwa: false,
  logo: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/285/pictureBigLogo.png',
  iconfontUrl: '',
};

export default Settings;
