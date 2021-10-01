import UIkit from 'uikit/src/js/api/index';
import core from '@/base/core/index';

// The VERSION variable is provided through the WebpackDefinePlugin
UIkit.version = VERSION;
core(UIkit);

export default UIkit;
