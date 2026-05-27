const mongoose  = require("mongoose");

const urlSchema = new mongoose.Schema(//it take two things- first one is schemafield amd second one is schemaoptions
    {
        originalUrl: {
            type: String,
            required: true
        },

        shortCode: {
            type: String,
            required: true,
            unique: true
        },

        customAlias: {
            type: String,
            unique: true,
            sparse: true
        },

        clicks: {
            type: Number,
            default: 0
        },

        isActive: {
            type: Boolean,
            default: true
        },

        expiresAt: {
            type: Date
        },

        visitHistory: [
            {
                timestamp: {
                    type: Date,
                    default: Date.now
                },
            },
        ],
    },

    {
        timestamps: true
    }
);


const Url = mongoose.model("Url", urlSchema);

module.exports = Url;