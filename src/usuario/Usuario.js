const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['DEFAULT', 'ADMIN'],
        default: ['DEFAULT']
    }    
});

UserSchema.methods.verificarSenha = (senha) => {
    return (UserSchema.senha === senha);
};

module.exports = mongoose.model('Usuario', UserSchema);
