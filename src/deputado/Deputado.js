const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepSchema = new Schema({
    Nome: {
        type: String,
        required: true
    },
    Partido: {
        type: String,
        required: true,
        enum: ['S/P', 'PDT', 'PSC', 'REDE', 'PSOL', 'PSL', 'MDB', 'PT', 'PSDB',
        'PROS', 'NOVO', 'PATRI', 'PSB', 'PC do B', 'PCB', 'PTB', 'PP', 'DEM',
        'PV', 'PDC'],
        default: ['S/P']
    },
    votos: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Deputado', DepSchema);
