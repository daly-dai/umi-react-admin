import { useRef } from 'react';
import './index.less';

const multiple = 20;

const TransformCard: React.FC = () => {
  const ref = useRef(null) as any;
  const imgRef = useRef(null) as any;

  const handleMouseMove = (e: any) => {
    if (!ref.current || !imgRef.current) return;

    let box = ref.current?.getBoundingClientRect();
    let calcX = -(e.clientY - box.y - box.height / 2) / multiple;
    let calcY = (e.clientX - box.x - box.width / 2) / multiple;
    const percentage =
      parseInt(
        (((e.clientX - box.x) / box.width) * 1000) as unknown as string,
      ) / 10;

    ref.current.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    // 额外增加一个控制 --per 的变量写入
    imgRef.current.style = `--per: ${percentage}%`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      className="home"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div id="element" className="home-card" ref={ref}>
        <div className="home-card-img" ref={imgRef}></div>
      </div>
    </div>
  );
};

export default TransformCard;
