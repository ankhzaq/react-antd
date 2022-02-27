import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from 'antd';
import { ArrowLeftOutlined, ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { HeaderStyled } from './style';

const translations = {
  en: {
    goBack: 'Go back',
    goParent: 'Go parent screen',
  },
  es: {
    goBack: 'Volver atrás',
    goParent: 'Volver a la pantalla padre'
  }
}

interface HeaderProps {
  back?: boolean | string;
  lang: 'en' | 'es';
  title: string;
};

const defaultProps: HeaderProps = {
  lang: 'en',
  title: 'Default title'
}

export const Header = (props = defaultProps) => {
  const { back, lang, title } = props;
  const navigate = useNavigate();

  const isBack = typeof back === "boolean";
  const iconButton = isBack ? <ArrowLeftOutlined /> : <ArrowUpOutlined />;
  const tooltip = isBack ? 'goBack' : 'goParent';

  return (
    <HeaderStyled>
      {
        back && (
          <Tooltip title={translations[lang][tooltip]}>
            <Button
              icon={iconButton}
              onClick={() => {
                if (isBack) navigate(-1);
                else navigate(back);
              }}
            />
          </Tooltip>
        )
      }
      { title }
    </HeaderStyled>
  );
}

Header.defaultProps = {
  lang: 'en',
  title: 'Default title'
}
