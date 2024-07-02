/**
 * Valide les props d'un composant en fonction des règles fournies.
 * @param {Object} props Les props à valider.
 * @param {Object} propTypes Un objet décrivant les règles de validation pour les props.
 */
function validateProps(props, propTypes) {
    Object.keys(propTypes).forEach(key => {
        console.log(key, propTypes[key], props[key]);
        const validator = propTypes[key];
        if (!validator(props[key])) {
            console.error(`Validation failed for prop ${key}. Expected type ${validator.name}.`);
        }
    });
}

const PropValidators = {
    string: value => typeof value === 'string',
    number: value => typeof value === 'number',
    boolean: value => typeof value === 'boolean',
    array: value => Array.isArray(value),
    object: value => value !== null && typeof value === 'object',
    function: value => typeof value === 'function',
    required: value => value !== null && value !== undefined,
    enum: (...args) => value => args.includes(value),
    instanceOf: (constructor) => value => value instanceof constructor,
    arrayOf: (typeValidator) => value => Array.isArray(value) && value.every(typeValidator),
    objectOf: (typeValidator) => value => typeof value === 'object' && Object.values(value).every(typeValidator),
    shape: (shapeObj) => value => typeof value === 'object' && Object.keys(shapeObj).every(key => shapeObj[key](value[key])),
};

export { validateProps, PropValidators };