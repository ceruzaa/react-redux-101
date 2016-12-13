// Här använder vi ES5 Syntax för att webpack inte stödjer ES6
module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            // Detta är ett reguljärt uttryck som identifierar alla dina .js-filer
            test: /\.js?$/,
            // Vi vill inte kolla i node_modules, så vi exkluderar den mappen.
            exclude: /node_modules/,
            // Vi lägger till vår babel-loader...
            loader: "babel",
            // ... och berättar för den vilka presets vi vill använda.
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};
