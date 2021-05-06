const DefaultEnvironment = {
    urls: {
        baseHref: ''
    }
};

module.exports = function(environmentName, preventOverrides) {
    const config = Object.assign({}, DefaultEnvironment);
    const specific = optionalRequire(`./env.${environmentName}`);
    
    if (specific == null)
        console.warn(`warning: no environment found for "${environmentName}"`);

    Object.assign(config, specific);
    
    if (!preventOverrides) {
        const overrides = optionalRequire('./env.overrides');
        Object.assign(config, overrides);
    }

    return config;
};

function optionalRequire(path) {
    try {
        return require(path);
    }
    catch (err) {
        return null;
    }
}
