Inn = {
    description: {
        title: {
            'fr': "Auberge",
            'en': "Inn"
        },
        version: '1.0',
        format: '1.0',
        origin: 'corebox',
        copyright: 'Monolith',
        rules: [ 
            {
                title: { 
                    'fr': "Bar et tables",
                    'en': "Bar and tables"
                },
                description: {
                    'fr': "cette règle s’applique seulement si le scénario l’indique dans les règles spéciales. Un personnage peut monter sur le bar ou sur une table pour 1 point de mouvement supplémentaire, qu’il ait ou non la compétence Saut ou Escalade. Il gagne la compétence Allonge tant qu’il se trouve sur le bar ou sur une table et bénéficie du bonus de surplomb de {dice_yellow} pour ses attaques au Corps-à-corps et à distance. Le bar et les tables ne bloquent pas la ligne de vue. En descendre n’engendre pas de surcoût de points de mouvement.",
                    'en': "apply this rule only if specified in the special rules section. A character with or without Leap or Climb may move onto the bar areas or a table area by spending 1 extra movement point. These areas provide an Elevation bonus of {dice_yellow}. A character in the bar’s area or in a table’s area, with or without Reach, may attack a character in an adjacent area with a Melee Attack. These areas do not block lines of sight. A character may exit these areas with no movement penalty."
                },
                coordinates: [[20,57], [33,61], [33,85]]
            }, {
                title: {
                    'fr': "Tabourets et bancs",
                    'en': "Bar stools and benches"
                },
                description: {
                    'fr': "cette règle s’applique seulement si le scénario l’indique dans les règles spéciales. Tabourets du bar: ramasser un tabouret est gratuit et doit être réalisé lors de l’action d’attaque au corps-à-corps. Le tabouret est immédiatement utilisé par l’attaquant pour bénéficier du bonus de {dice_yellow}, en plus du bonus d’attaque de son arme s’il en utilise une. Il est ensuite défaussé.",
                    'en': "apply this rule only if specified in the special rules section. Bar Stools: A character in a chair token’s area may pick it up for free when performing a Melee Attack. The chair token is immediately returned to the box and that character benefits from the chair’s attack bonus as specified in the scenario (in addition to any weapon’s Melee Attack bonus)."
                },
                coordinates: []
            }, {
                title: {
                    'fr': "Murs",
                    'en': "Walls"
                },
                description: {
                    'fr': "tous les murs situés entre deux salles du même étage sont destructibles (par une figurine avec la compétence Défoncer les cloisons) à l’exception des murs d’enceinte de la taverne y compris ceux donnant sur la rue.",
                    'en': "A character with Wall Wrecker cannot use it to move across an outer wall of the inn or to move between areas of different elevations."
                },
                coordinates: [[20,7], [40,7], [60,7], [80,7], [95,14], [95,42], [50,60], [62,51], [62,72]]
            }, {
                title: {
                    'fr': "Saut/Escalade depuis la balustrade",
                    'en': "Leaping From/Climbing a Balcony"
                },
                description: {
                    'fr': "sauter de la balustrade inflige {dice_orange}{dice_orange} sans défense possible et {dice_orange} si la figurine possède la compétence Saut. Remonter sur la balustrade coûte 2 points de mouvement supplémentaires pour un personnage ayant la compétence Escalade.",
                    'en': "a character can move across a railing from a balcony area to a ground floor area as though it were a border. The character rolls {dice_orange}{dice_orange} for falling damage. If the character has Leap, the character rolls {dice_orange} instead. A character with Climb can move across a railing from a ground floor area to a balcony area by spending 2 extra movement points."
                },
                coordinates: [[31,23]]
            }, {
                title: {
                    'fr': "Saut/Escalade depuis un escalier",
                    'en': "Leaping From/Climbing a Stairwell"
                },
                description: {
                    'fr': "sauter des escaliers inflige {dice_yellow}{dice_yellow} sans défense possible et {dice_yellow} si la figurine possède la compétence Saut. Remonter sur la zone d’un escalier par la rambarde sur le côté coûte 1 point de mouvement supplémentaire pour un personnage ayant la compétence Escalade. Emprunter l’escalier normalement n’engendre pas de surcoût de points de mouvement.",
                    'en': "a character can move across a banister from a stair area to a ground floor area as though it were a border. The character rolls {dice_yellow}{dice_yellow} for falling damage. If the character has Leap, the character rolls {dice_yellow} instead. A character with Climb can move across a banister from a ground floor area to a stair area by spending 1 extra movement point."
                },
                coordinates: [[11,30], [49,30]]
            }
        ],
        totopic: {
            'fr': "https://the-overlord.com/index.php?/topic/23-core-carte-taverne/",
            'en': "https://the-overlord.net/index.php?/topic/28-core-inn/"
        },
        losFile: true
    },
    size: [1062, 910],
    zones: {
        "1": {
            'area': [[3.48, 3.08], [19.68, 3.3], [20.06, 15.38], [15.54, 15.6], [16.38, 17.8], [13.37, 17.8], [11.96, 15.16], [3.67, 15.38]],
            'centers': [[10.83, 8.46]],
            'links': [],
            'level': 3
        },
        "2": {
            'area': [[21.94, 3.3], [39.74, 2.97], [39.64, 15.16], [28.15, 15.49], [29, 18.13], [25.33, 17.58], [24.86, 15.71], [21.66, 15.6]],
            'centers': [[29.85, 8.24]],
            'links': [],
            'level': 3
        },
        "3": {
            'area': [[41.62, 3.19], [58.1, 2.97], [58.19, 15.16], [56.59, 15.05], [56.97, 17.25], [52.73, 17.69], [52.17, 14.95], [41.15, 15.27]],
            'centers': [[50.19, 8.35]],
            'links': [],
            'level': 3
        },
        "4": {
            'area': [[59.6, 3.3], [77.5, 3.19], [77.4, 15.27], [76.84, 15.27], [76.27, 17.69], [72.32, 17.47], [72.6, 15.05], [60.73, 14.84]],
            'centers': [[69.3, 8.24]],
            'links': [],
            'level': 3
        },
        "5": {
            'area': [[79.66, 3.08], [79.76, 14.95], [80.7, 15.16], [79.76, 17.69], [83.52, 17.36], [84.75, 15.27], [97.27, 14.95], [97.18, 3.19]],
            'centers': [[89.27, 8.24]],
            'links': [],
            'level': 3
        },
        "6": {
            'area': [[3.67, 18.13], [20.24, 17.91], [20.53, 22.97], [9.98, 23.08], [10.17, 25.27], [3.67, 25.16]],
            'centers': [[11.11, 20.33]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#19#1", "1#21#1", "1#11#1", "1#14#1", "1#7#1", "1#8#1", "1#9#1", "1#10#1"],
            'level': 3
        },
        "7": {
            'area': [[20.62, 18.02], [40.21, 18.24], [40.11, 22.86], [20.81, 22.75]],
            'centers': [[29.76, 20.55]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#19#1", "1#21#1", "1#29#1", "1#11#1", "1#14#1", "1#6#1", "1#8#1", "1#9#1", "1#10#1"],
            'level': 3
        },
        "8": {
            'area': [[40.49, 18.02], [59.7, 18.13], [59.6, 22.86], [57.91, 22.75], [57.91, 24.84], [51.13, 24.73], [50.94, 22.75], [40.58, 22.75]],
            'centers': [[50.38, 20.33]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#19#1", "1#21#1", "1#29#1", "1#11#1", "1#14#1", "1#6#1", "1#7#1", "1#9#1", "1#10#1"],
            'level': 3
        },
        "9": {
            'area': [[59.89, 17.91], [59.89, 22.53], [78.81, 22.75], [79.28, 18.02]],
            'centers': [[69.21, 20.44]],
            'links': ["1#6#1", "1#7#1", "1#8#1", "1#10#1"],
            'level': 3
        },
        "10": {
            'area': [[79.47, 18.02], [86.06, 17.91], [86.06, 24.95], [80.51, 25.05], [80.51, 22.64], [79, 22.64]],
            'centers': [[82.58, 20.77]],
            'links': ["1#6#1", "1#7#1", "1#8#1", "1#9#1", "1#38#1", "1#26#1", "1#34#1"],
            'level': 3
        },
        "11": {
            'area': [[3.86, 25.38], [10.17, 25.49], [11.77, 39.89], [5.37, 40.11]],
            'centers': [[7.16, 32.31]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#14#1", "1#6#1", "1#7#1", "1#8#1", "1#19#1", "1#21#1"],
            'level': 2
        },
        "12": {
            'area': [[10.92, 25.38], [12.15, 37.36], [30.04, 46.81], [34.09, 25.49]],
            'centers': [[22.22, 32.31]],
            'links': ["1#17#1", "1#31#1", "1#23#1", "1#13#1", "1#11#1", "1#14#1", "1#20#1", "1#22#1", "1#30#1", "1#21#1", "1#29#1", "1#19#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 1
        },
        "13": {
            'area': [[28.53, 55.27], [34.93, 55.27], [50.38, 40], [50.19, 25.49], [34.37, 25.38]],
            'centers': [[40.3, 37.03]],
            'links': ["1#31#1", "1#23#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#20#1", "1#22#1", "1#30#1", "1#21#1", "1#29#1", "1#19#1", "1#6#1", "1#7#1", "1#8#1", "1#17#1"],
            'level': 1
        },
        "14": {
            'area': [[51.13, 25.38], [57.72, 25.38], [57.91, 38.9], [51.41, 39.01]],
            'centers': [[54.43, 31.76]],
            'links': ["1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#19#1", "1#21#1", "1#29#1", "1#11#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 2
        },
        "15": {
            'area': [[58.57, 26.48], [77.78, 26.37], [77.78, 39.89], [72.79, 40.11], [72.6, 41.65], [69.68, 41.65], [69.68, 39.89], [58.47, 39.89]],
            'centers': [[68.74, 32.09]],
            'links': ["1#25#1"],
            'level': 1
        },
        "16": {
            'area': [[88.42, 17.36], [97.27, 18.35], [97.27, 41.1], [88.14, 41.65], [88.23, 30.66], [86.35, 32.09], [86.53, 28.24], [88.23, 25.49]],
            'centers': [[93.22, 28.46]],
            'links': ["1#38#1"],
            'level': 3
        },
        "17": {
            'area': [[11.96, 37.25], [29.85, 47.03], [28.25, 55.27], [11.49, 55.27], [11.11, 59.56], [4.05, 59.67], [4.14, 40.11], [11.96, 40]],
            'centers': [[16.57, 48.57]],
            'links': ["1#12#1", "1#31#1", "1#23#1", "1#13#1", "1#11#1", "1#14#1", "1#20#1", "1#22#1", "1#30#1", "1#21#1", "1#19#1", "1#18#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 1
        },
        "18": {
            'area': [[57.25, 43.52], [56.69, 49.34], [71, 49.56], [71.19, 50.44], [77.97, 50.44], [78.15, 41.87], [58.76, 42.09], [58.38, 42.75]],
            'centers': [[68.17, 45.49]],
            'links': ["1#17#1"],
            'level': 1
        },
        "19": {
            'area': [[3.95, 60], [11.3, 60], [11.39, 60.77], [18.83, 60.77], [18.74, 65.27], [4.14, 65.27]],
            'centers': [[11.3, 62.75]],
            'links': ["1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#20#1", "1#22#1", "1#21#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 1
        },
        "20": {
            'area': [[11.58, 55.27], [25.52, 55.6], [25.42, 60.33], [11.49, 60.55]],
            'centers': [[20.34, 57.58]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#22#1", "1#30#1", "1#21#1", "1#19#1", "1#32#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 2
        },
        "21": {
            'area': [[19.11, 60.66], [30.23, 60.66], [30.6, 72.97], [24.58, 73.3], [24.2, 65.49], [19.21, 65.49]],
            'centers': [[26.55, 64.29]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#20#1", "1#22#1", "1#30#1", "1#32#1", "1#19#1", "1#29#1", "1#11#1", "1#14#1", "1#33#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 1
        },
        "22": {
            'area': [[25.61, 55.49], [34.84, 55.49], [34.75, 75.82], [30.89, 75.82], [30.7, 60.22], [25.71, 60.22]],
            'centers': [[32.39, 57.69]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#20#1", "1#30#1", "1#29#1", "1#21#1", "1#19#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 2
        },
        "23": {
            'area': [[35.22, 55.38], [35.12, 73.3], [49.81, 73.19], [49.81, 49.89], [56.78, 49.78], [57.25, 39.34], [51.04, 39.56]],
            'centers': [[42.75, 61.87]],
            'links': ["1#31#1", "1#13#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#20#1", "1#22#1", "1#30#1", "1#19#1", "1#21#1", "1#29#1", "1#6#1", "1#7#1", "1#8#1"],
            'level': 1
        },
        "24": {
            'area': [[51.88, 52.75], [68.27, 52.64], [68.64, 71.1], [51.88, 71.1]],
            'centers': [[60.36, 61.21]],
            'links': [],
            'level': 1
        },
        "25": {
            'area': [[71, 50.55], [78.06, 50.77], [78.06, 73.19], [70.81, 73.19], [70.9, 59.12], [68.64, 58.79], [68.74, 55.38], [70.81, 54.62]],
            'centers': [[74.29, 61.43]],
            'links': ["1#15#1", "1#33#1"],
            'level': 1
        },
        "26": {
            'area': [[80.13, 42.09], [85.78, 42.2], [86.16, 71.65], [80.13, 71.76]],
            'centers': [[82.67, 56.04]],
            'links': ["1#10#1", "1#38#1", "1#34#1", "1#27#1"],
            'level': 3
        },
        "27": {
            'area': [[88.42, 42.64], [97.27, 43.3], [97.18, 70.88], [88.61, 70.33], [88.04, 59.23], [86.25, 58.68], [86.35, 54.73], [87.85, 54.73]],
            'centers': [[90.68, 56.15]],
            'links': ["1#26#1"],
            'level': 3
        },
        "28": {
            'area': [[3.95, 67.03], [22.13, 67.47], [22.32, 77.8], [24.01, 76.59], [24.2, 79.56], [22.03, 81.32], [22.13, 90.11], [4.9, 88.79]],
            'centers': [[12.99, 77.91]],
            'links': [],
            'level': 0
        },
        "29": {
            'area': [[24.58, 73.52], [30.51, 73.52], [30.32, 89.56], [24.39, 89.34]],
            'centers': [[27.4, 83.3]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#22#1", "1#30#1", "1#32#1", "1#21#1", "1#14#1", "1#33#1", "1#7#1", "1#8#1", "1#34#1", "1#7#1"],
            'level': 1
        },
        "30": {
            'area': [[30.79, 76.26], [34.84, 76.15], [34.93, 90.22], [30.98, 90.22]],
            'centers': [[32.39, 81.76]],
            'links': ["1#31#1", "1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#11#1", "1#14#1", "1#33#1", "1#20#1", "1#22#1", "1#29#1", "1#21#1", "1#32#1", "1#6#1", "1#7#1", "1#8#1", "1#34#1"],
            'level': 2
        },
        "31": {
            'area': [[35.03, 73.52], [50.09, 73.52], [50.19, 88.13], [35.22, 88.46]],
            'centers': [[42.47, 80.33]],
            'links': ["1#23#1", "1#13#1", "1#12#1", "1#17#1", "1#32#1", "1#11#1", "1#33#1", "1#20#1", "1#22#1", "1#30#1", "1#21#1", "1#29#1", "1#6#1", "1#7#1", "1#8#1", "1#34#1"],
            'level': 1
        },
        "32": {
            'area': [[70.9, 73.63], [77.78, 73.3], [78.06, 80.66], [64.41, 79.45], [64.31, 88.13], [50.66, 87.91], [50.66, 73.85]],
            'centers': [[58.85, 80.88]],
            'links': ["1#31#1", "1#20#1", "1#30#1", "1#29#1", "1#21#1", "1#34#1", "1#33#1"],
            'level': 1
        },
        "33": {
            'area': [[64.6, 80.33], [77.31, 82.86], [77.5, 90.44], [64.78, 87.47]],
            'centers': [[70.81, 84.73]],
            'links': ["1#31#1", "1#30#1", "1#25#1", "1#32#1", "1#21#1", "1#29#1", "1#34#1"],
            'level': 2
        },
        "34": {
            'area': [[80.23, 72.09], [85.97, 71.98], [85.78, 90.88], [77.68, 90.33], [77.78, 82.75], [79.94, 83.08]],
            'centers': [[82.02, 84.51]],
            'links': ["1#31#1", "1#30#1", "1#32#1", "1#29#1", "1#35#1", "1#33#1", "1#10#1", "1#38#1", "1#26#1"],
            'level': 3
        },
        "35": {
            'area': [[88.7, 72.64], [94.44, 72.31], [93.22, 71.1], [97.27, 70.99], [97.36, 91.54], [88.23, 91.87], [88.14, 88.57], [86.16, 86.81], [86.25, 83.41], [88.04, 83.63]],
            'centers': [[90.58, 84.51]],
            'links': ["1#34#1"],
            'level': 3
        },
        "36": {
            'area': [[0.19, 95.6], [36.72, 95.82], [36.72, 99.78], [0.28, 99.67]],
            'centers': [[11.11, 97.8]],
            'links': ["1#37#1"],
            'level': 1
        },
        "37": {
            'area': [[36.72, 95.93], [38.7, 95.93], [38.51, 88.79], [47.36, 88.57], [46.99, 96.26], [99.81, 95.82], [99.81, 99.89], [36.82, 99.78]],
            'centers': [[67.14, 97.8]],
            'links': ["1#36#1"],
            'level': 1
        },
        "38": {
            'area': [[80.23, 25.27], [85.97, 25.27], [85.78, 41.87], [80.32, 41.65]],
            'centers': [[82.58, 28.35]],
            'links': ["1#10#1", "1#26#1", "1#34#1", "1#16#1"],
            'level': 3
        }
    }
}
