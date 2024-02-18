import './index.less';

interface SvgIconProps {
  className?: string;
  style?: React.CSSProperties;
  name: string;
}

const SvgIcon = ({ className, style, name }: SvgIconProps) => {
  return (
    <svg className={`svg-icon ${className}`} style={style} aria-hidden="true">
      <use xlinkHref={name} />
    </svg>
  );
};

export default SvgIcon;
