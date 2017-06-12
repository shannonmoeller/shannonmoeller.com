import './shim/feature-detection';
import './shim/native-custom-elements';
import '@webcomponents/custom-elements';
import 'dom4';

import { MoePerspectiveElement } from '../moe-perspective/moe-perspective-element';

customElements.define('moe-perspective', MoePerspectiveElement);
