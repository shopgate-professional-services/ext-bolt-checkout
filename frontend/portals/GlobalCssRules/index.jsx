import { css } from 'glamor';
// needed to counter effects of tracking iframe added
// by bolt tracking script on add-to-cart-bar rendering
css.global('#bolt-tracking-frame', {
  display: 'none',
});

export default () => null;
