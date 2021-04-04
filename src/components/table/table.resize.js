import {$} from '../../core/dom';
import {excelConfig} from '../../core/constants';

export const resizeHandler = ($root, event) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === excelConfig.COL ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === excelConfig.COL) {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: `${-delta}px`});
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: `${-delta}px`});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      if (type === excelConfig.COL) {
        $parent.css({
          width: `${value}px`,
        });

        $root.findAll(`[data-col="${$parent.data.col}"`)
            .forEach((el) => el.style.width = value + 'px');
      } else {
        $parent.css({
          height: `${value}px`,
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resizer.cssClear([
        'opacity',
        'height',
        'width',
        'zIndex',
        'right',
        'bottom',
      ]);
    };
  });
};
