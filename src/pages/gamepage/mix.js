/**
 * @language=zh
 * 混入属性或方法。
 * @param {Object} target 混入目标对象。
 * @param {Object} source 要混入的属性和方法来源。可支持多个来源参数。
 * @returns {Object} 混入目标对象。
 */
 export function mix(target) {
    for (let i = 1, len = arguments.length; i < len; i++) {
      const source = arguments[i];
      var defineProps;
      for (const key in source) {
        const prop = source[key];
        if (prop && typeof prop === 'object') {
          if (prop.value !== undefined || typeof prop.get === 'function' || typeof prop.set === 'function') {
            defineProps = defineProps || {};
            defineProps[key] = prop;
            continue;
          }
        }
        target[key] = prop;
      }
      if (defineProps) defineProperties(target, defineProps);
    }
    return target;
  }
  
  let defineProperty;
  let defineProperties;
  try {
    defineProperty = Object.defineProperty;
    defineProperties = Object.defineProperties;
    defineProperty({}, '$', {
      value: 0
    });
  } catch (e) {
    if ('__defineGetter__' in Object) {
      defineProperty = function (obj, prop, desc) {
        if ('value' in desc) obj[prop] = desc.value;
        if ('get' in desc) obj.__defineGetter__(prop, desc.get);
        if ('set' in desc) obj.__defineSetter__(prop, desc.set);
        return obj;
      };
      defineProperties = function (obj, props) {
        for (const prop in props) {
          if (props.hasOwnProperty(prop)) {
            defineProperty(obj, prop, props[prop]);
          }
        }
        return obj;
      };
    }
  }