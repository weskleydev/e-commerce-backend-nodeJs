'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    number: { type: Number },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    price: { type: Number, required: true },
    payment: { type: String, required: true, enum: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Pix'] },
    createDate: { type: Date, required: true, default: Date.now },
    status: {
        type: String, required: true,
        enum: ['Pedido Recebido', 'Em Preparação', 'Pendente Pagamento', 'Pagamento Recebido', 'Pedido Finalizado', 'Pedido Cancelado'],
        default: 'Pedido Recebido'
    },
    items: [{
        // cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
        cart: {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            size: { type: String, required: true }
        },
        fixedPrice: { type: Number }
    }],
});
schema.plugin(AutoIncrement, { inc_field: 'number' });

module.exports = mongoose.model('Order', schema);