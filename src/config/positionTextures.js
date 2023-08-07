import config from "./config.js";
const TexturesPosition = {
    'diaperControl' : {
        'x' : config.width/2,
        'y' : config.height - 200
    },
    'diaperControlShadow' : {
        'x' : config.width/2,
        'y' : config.height - 200
    },
    'podiumStand' : {
        'x' : config.width/2,
        'y' : config.height - 80
    },
    'gifLayerPosition': {
        'x' : config.width/2 - 145,
        'y' : config.height/2 - 38,
        box : {
            x : config.width/2 - 145  + 308,
            y : config.height/2 - 38 + 10
        },
        gif : {
            x : config.width/2 - 145 - 2,
            y : config.height/2 - 38 - 2
        },
        shadowEllipse : {
            x : config.width/2 - 145 + 8.5,
            y : config.height/2 - 38 + 8
        },
        'border' : {
            r : 142 + 20
        }
    },
    'gifLayerFinalPosition' : {
        'x' : config.width/2 - 165,
        'y' : config.height/2 - 165,
        box : {
            x : config.width/2 - 165  + 308 - 10,
            y : config.height/2 - 165 - 40
        },
        gif : {
            x : config.width/2 - 165 - 2,
            y : config.height/2 - 165 - 2
        },
        shadowEllipse : {
            x : config.width/2 - 165 + 8,
            y : config.height/2 - 165 + 8
        },
        'border' : {
            r : 142 + 20
        }
    },
    'diaperBobby' : {
        'x' : config.width/2,
        'y' : config.height - 375 - 20
    },
    'diaperBobbyGrid' : {
        'x' : config.width/2,
        'y' : config.height - 320 - 20
    },
    'diaperBobbyBorder' : {
        'x' : config.width/2 - 7,
        'y' : config.height - 375 - 20 - 19
    },
    'dashedLineBobby' : {
        lineIn : 265,
        lineOut : 180,
    },
    'arcFollowBorderBobby' : {
        radius : 240 + 30
    }
}
export default TexturesPosition;
