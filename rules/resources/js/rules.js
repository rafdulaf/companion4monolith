var ConanRules = {
    _i18n: {
        'fr': {
            'menu': "Regles",
            'skills': "Competences",
            
            'skills_attack': "Attaque",
            'skills_attack_reach_title': "Allonge",
            'skills_attack_reach_text': "Le personnage peut attaquer au corps-à-corps sur une zone adjacente avec ligne de vue et s’il n’y a pas d’obstacle (mur, porte, barreaux, tentures…) entre sa cible et lui.",
            'skills_attack_ambidextrous_title': "Ambidextrie",
            'skills_attack_ambidextrous_text': "S’il dispose de deux armes à une main, le personnage peut cumuler leur bonus lors de chacune de ses attaques au corps-à-corps (ne fonctionne pas en défense).",
            'skills_attack_constriction_title': "Constriction",
            'skills_attack_constriction_text': "Si, lors de son attaque, la créature obtient au moins une face avec 2 symboles sur l’un de ses dés, sa cible est « saisie », en plus des blessures éventuelles. La figurine du personnage saisi est ramenée au contact de la figurine de la créature et est considérée comme bloquée. Un personnage ayant la compétence Insaisissable ignore le blocage dû à Constriction, pas les dégâts associés à l’attaque.",
            'skills_attack_circular_strike_title': "Coup circulaire",
            'skills_attack_circular_strike_text': "Avec toute arme de corps-à-corps à deux main (dont l’encombrement est supérieur ou égal à 3), le personnage peut donner un coup circulaire. Si l’attaque, résolue normalement, tue le premier adversaire désigné, le reliquat de dégâts est reporté sur le suivant (choisit par l'attaquant) et ainsi de suite jusqu’à ce qu’il n’y ait plus de reliquat.",
            'skills_attack_precision_strike_title': "Coup precis",
            'skills_attack_precision_strike_text': "Lorsqu’il réalise une attaque au corps-à-corps, le personnage ignore systématiquement le premier point de défense de sa cible.",
            'skills_attack_attack_from_beyond_title': "Retour de l’Au-dela",
            'skills_attack_attack_from_beyond_text': "Juste après sa mort, le personnage peut porter une ultime attaque au corps-à-corps d’une puissance de {dice_red}{dice_red}{dice_red}, sans bonus d’arme et sans malus d’attaque à mains nues.",
            'skills_attack_counterattack_title': "Riposte",
            'skills_attack_counterattack_text': "Chaque fois que le personnage est attaqué au corps-à-corps (que l’attaque ait causé des dégâts ou non), il peut gratuitement riposter (s’il survit à l’attaque) de {dice_red}, sans bonus d’arme et sans malus d’attaque à mains nues.",
            'skills_attack_elite_shooter_title': "Tireur d’elite",
            'skills_attack_elite_shooter_text': "Le personnage ignore les effets du phénomène de gêne lorsqu’il réalise une attaque à distance. De plus, il ignore la compétence Sous protection de sa cible.",
            'skills_attack_precision_shot_title': "Tir precis",
            'skills_attack_precision_shot_text': "Lorsqu’il réalise une attaque à distance, le personnage ignore systématiquement le premier point de défense passive de sa cible.",
            
            'skills_movement': "Mouvement",
            'skills_movement_blocking_title': "Bloqueur",
            'skills_movement_blocking_text': "Le personnage bloque tout mouvement des adversaires présents sur sa zone, à l'exception de ceux possédant la compétence Insaisissable.",
            'skills_movement_wall_wrecker_title': "Defoncer les cloisons",
            'skills_movement_wall_wrecker_text': "Le personnage peut traverser les cloisons et les portes en bois, au cours de son mouvement, pour un surcout de 2 points de mouvement. Il laisse derrière lui une ouverture (symbolisée par un pion) : le personnage se déplace de l'autre côté de la cloison qu'il vient de défoncer. Les deux zones deviennent adjascentes sans pénalité de mouvement pour passer de l'une à l'autre et l'ouverture donne une ligne de vue entre ces deux zones.",
            'skills_movement_evasive_title': "Insaisissable",
            'skills_movement_evasive_text': "Le personnage ignore toute pénalité de mouvement liée à la présence d'adversaires dans sa zone, quand bien même ceux-ci auraient la compétence Bloqueur.",
            'skills_movement_swimming_title': "Natation",
            'skills_movement_swimming_text': "Le personnage est capable de se déplacer à travers les zones liquides. Le surcoût pour quitter une zone liquide est de 1 point de mouvement.",
            'skills_movement_intangible_title': "Intangible",
            'skills_movement_intangible_text': "Le personnage peut traverser un obstacle normalement infranchissable en dépensant ses points de mouvement comme s'il s'agissait d'une limite normale. Le personnage n'est jamais affecté par le phénomène de gêne.",
            'skills_movement_web_projection_title': "Projection de toile",
            'skills_movement_web_projection_text': "Plutôt que de réaliser une attaque classique, le personnage peut projeter une toile sur un adversaire. Pour cela il réalise une attaque à distance avec {dice_orange}{dice_orange}{dice_orange}. Si l'attaque dépasse la défense, elle n'engendre pas de blessure mais la victime est immobilisée (on place le pion Toile contre son socle). Pour s'en extraire il lui en coûtera 4 points de mouvements en un seul tour.",
            'skills_movement_leap_title': "Saut",
            'skills_movement_leap_text': "Le personnage peut sauter par-dessus les endroits prévus à cet effet. Pour ce faire, il lance {dice_red} et doit égaler ou dépasser l'indice de difficulté. Le saut n'est pas soumis au phénomène de gène. Sauter coûte 1 point de mouvement par zone traversée. Par exemple, sauter d'un bateau à l'autre coûte 2 points de mouvements.",
            'skills_movement_feline_grace_title': "Souplesse feline",
            'skills_movement_feline_grace_text': "Dans chaque zone empruntée, le personnage ignore un point de malus lié au phénomène de gêne.",
            'skills_movement_flying_title': "Vol",
            'skills_movement_flying_text': "Le personnage peut voler par-dessus les éléments du décor. Il ignore les contraintes de déplacement liés au décor. Le vol n'est pas soumis au phénomène de gène.",
            'skills_movement_climb_title': "Escalade",
            'skills_movement_climb_text': "Le personnage est capable de franchir les limites de zone qui requièrent cette compétence, en payant le surcoût de mouvement lié à la difficulté du franchissement comme décrit dans le scénario.",
            
            'skills_miscellaneous': "Diverses",
            'skills_miscellaneous_alchemy_title': "Alchimie",
            'skills_miscellaneous_alchemy_text': "Alchimie est une compétence générique pouvant être utilisée dans certains scénarios.",
            'skills_miscellaneous_leadership_title': "Commandement",
            'skills_miscellaneous_leadership_text': "Pour chaque gemme dépensée, le héros peut activer un de ses Alliés. Un Allié activé peut se déplacer et attaquer comme une unité. Il ne peut activer qu'une fois par tour chacun de ses Alliés.",
            'skills_miscellaneous_concentration_title': "Concentration",
            'skills_miscellaneous_concentration_text': "Le personnage ignore toutes les pénalités liées au phénomène de gêne pour toutes les actions nécessitant un lancer de dé.",
            'skills_miscellaneous_lock_picking_title': "Crochetage",
            'skills_miscellaneous_lock_picking_text': "Chaque fois qu'il tente une manipulation complexe pour crocheter une serrure, le personnage dispose d'un bonus de {dice_red}.",
            'skills_miscellaneous_fascination_title': "Fascination",
            'skills_miscellaneous_fascination_text': "Le personnage ne peut pas être attaqué par un autre personnage qu’il n’a pas luimême attaqué au préalable pendant la partie.",
            'skills_miscellaneous_horror_title': "Horreur",
            'skills_miscellaneous_horror_text': "Le personnage a une apparence si hideuse qu'elle provoque la terreur chez ses adversaires. Chaque adversaire qui se trouve dans sa zone voit le niveau de saturation de ses caractéristiques limité à 2 (sauf pour la défense et la relance).",
            'skills_miscellaneous_jinx_title': "Malchance",
            'skills_miscellaneous_jinx_text': "Aucune relance d’aucune sorte (payante ou gratuite) n’est autorisée dans la zone d’un adversaire ayant cette compétence.",
            'skills_miscellaneous_poison_title': "Poison",
            'skills_miscellaneous_poison_text': "Poison est une compétence générique pouvant être utilisée dans certains scénarios.",
            'skills_miscellaneous_support_title': "Soutien",
            'skills_miscellaneous_support_text': "Les figurines amies du personnage présentes sur sa zone bénéficient d'une relance gratuite à chaque fois qu'elles réalisent une action. Soutien permet la relance gratuite d’un seul dé, y compris sur un dé déjà relancé gratuitement (exception à la règle page 22).",
            
            'skills_defense': "Defense",
            'skills_defense_sacrifice_title': "Sacrfice",
            'skills_defense_sacrifice_text': "Le personnage peut décider, avant le lancé de dés, de subir une attaque à la place de la cible initiale. Il ne peut par contre ni la parer ni l'esquiver. Il ne peut utiliser que sa défense passive pour se défendre. Ce personnage encaisse donc la totalité des dégâts causés par l’attaque à la place de la cible initiale.",
            'skills_defense_untouchable_title': "Intouchable",
            'skills_defense_untouchable_text': "Le personnage ayant cette compétence ignore le premier succès d’une attaque à distance portée contre lui.",
            'skills_defense_bodyguard_title': "Garde du corps",
            'skills_defense_bodyguard_text': "Le personnage peut parer (c’est-à-dire utiliser un équipement pour défendre comme un bouclier par exemple) à leur place, les attaques portées contre ses amis présents sur sa zone. Il ne peut pas simplement esquiver. L'usage de la compétence remplace la défense active de la cible mais pas sa défense passive. C’est la cible initiale de l’attaque qui en subit les éventuelles blessures.",
            'skills_defense_protected_title': "Sous protection",
            'skills_defense_protected_text': "Le personnage ne peut être attaqué tant que demeure sur sa zone au moins l'un de ses amis dépourvu de cette compétence. Les attaques de zone ne sont pas soumises à l'effet de cette compétence.",
            
            'skills_magic': "Magie",
            'skills_magic_spell_caster_title': "Lanceur de sort",
            'skills_magic_spell_caster_text': "Le personnage est capable d'utiliser les cartes Sorts à sa disposition, en leur allouant les gemmes d'énergie requises. Lorsqu'un personnage perd la compétence (du fait de son encombrement par exemple), les sorts déjà actifs le restent jusqu'à ce qu'ils s'épuisent comme décrit par le sort.",
            'skills_magic_teleportation_title': "Teleportation",
            'skills_magic_teleportation_text': "(Clarification du sort) Le lanceur de sort n'est pas soumis au phénomène de gêne ni à la compétence Bloqueur.",
            
            'copyright': "Les règles proposés sont basées sur les règles officielles et leurs compléments mais ont été en partie reformulées.",
            
            'heroes': "Livre des héros",
            'overlord': "Livre de l'Overlord"
        },
        'en': {
            'menu': "Rules",

            'skills': "Skills",
            'skills_attack': "Attack",
            'skills_attack_reach_title': "Reach",
            'skills_attack_reach_text': "This character can attack a character in an adjacent area with a line of sight, with a Melee Attack if there is no obstacle (wall, door, bar, flap, etc.) between the characters’ areas.",
            'skills_attack_ambidextrous_title': "Ambidextrous",
            'skills_attack_ambidextrous_text': "When this character performs a Melee Attack, the character can choose 2 of their 1-handed weapon cards to attack with. Cannot be used to perform a Guard action.",
            'skills_attack_constriction_title': "Constriction",
            'skills_attack_constriction_text': "When this character's attack power is determined, if any die shows 2 or more symbols, move the defender’s model close to the attacker’s one so their bases touch. As long as they remain in the same area, the defender treats the attacker as thought the attacker has Blocking. A character with Evasive ignores Constriction’s Blocking effect, but not the damage from the attack.",
            'skills_attack_circular_strike_title': "Circular Strike",
            'skills_attack_circular_strike_text': "When this character kills an enemy character with a 2-handed Melee Attack, another enemy character in the same area suffers the excess damage from the attack (if that character is killed, repeat the process). The attacker decides the order in which damage is dealt to defending enemies. Resolve the attack normally (determining attack power, defense power, etc.) on one enemy before proceeding with the next one if there is still damage left to be dealt.",
            'skills_attack_precision_strike_title': "Precision strike",
            'skills_attack_precision_strike_text': "When a character with this skill performs a Melee Attack, they automatically reduce the defender’s defense power by 1.",
            'skills_attack_attack_from_beyond_title': "Attack from Beyond",
            'skills_attack_attack_from_beyond_text': "When his character dies, before the model is removed from the board, the character may perform a free unarmed Melee Attack, rolling {dice_red}{dice_red}{dice_red} instead of their normal dice (the character ignores penalties from unarmed attacks and cannot benefit from Melee Attack bonuses from weapons).",
            'skills_attack_counterattack_title': "Counterattack",
            'skills_attack_counterattack_text': "When a character attacks this character with a Melee Attack, after the attack is resolved (whether damage was dealt or not), this character (if still alive) may immediately counterattack that character with a free unarmed Melee Attack, rolling {dice_red} instead of their normal die (the character ignores penalties from unarmed attacks and cannot benefit from Melee Attack bonuses from weapons).",
            'skills_attack_elite_shooter_title': "Elite Shooter",
            'skills_attack_elite_shooter_text': "This character’s Ranged Attacks are not affected by hindering and ignore Protected.",
            'skills_attack_precision_shot_title': "Precision Shot",
            'skills_attack_precision_shot_text': "When this character performs a Ranged Attack, the defender’s armor value is reduced by 1 for that attack.",

            'skills_movement': "Movement",
            'skills_movement_blocking_title': "Blocking",
            'skills_movement_blocking_text': "Enemy characters without Evasive cannot move out of this character's area.",
            'skills_movement_wall_wrecker_title': "Wall Wrecker",
            'skills_movement_wall_wrecker_text': "This character can spend 2 movement points to move across a wooden wall or door from one area to an adjacent area, and place a \"Wall Wrecker\" token on that obstacle. Then they immediately move to the other side of the wall they just wrecked. From now on, the two areas are adjacent, there is no penalty for moving from one to the other, and they have line of sight on each other.",
            'skills_movement_evasive_title': "Evasive",
            'skills_movement_evasive_text': "This character can move as if there were no enemy characters in the character's area.",
            'skills_movement_swimming_title': "Swimming",
            'skills_movement_swimming_text': "This character can move into water areas. Moving out of a water area cost 1 extra movement point.",
            'skills_movement_intangible_title': "Intangible",
            'skills_movement_intangible_text': "This character can spend 1 movement point to move across an obstacle from 1 area to an adjacent area. This character's movement is not affected by hindering.",
            'skills_movement_web_projection_title': "Web Projection",
            'skills_movement_web_projection_text': "Instead of their normal attack, this character can perform a Ranged Attack, rolling {dice_orange}{dice_orange}{dice_orange} instead of their normal die. If the attack power is higher than the defense power, the defender places a web token on their model and suffers no damage. A character with a web token cannot move, but can spend 4 movement points to discard the token.",
            'skills_movement_leap_title': "Leap",
            'skills_movement_leap_text': "This character can leap over areas defined by the scenario. The character rolls {dice_red}, the leap is successful if the die shows symbols equal to or higher than the leap area's difficulty. Leaping costs 1 movement point per crossed area border. For example, when leaping from one ship to another, a character must spend 2 movement points to leap. Leaping is not affected by hindering.",
            'skills_movement_feline_grace_title': "Feline Grace",
            'skills_movement_feline_grace_text': "Moving cost this character 1 fewer movement point if the movement is affected by hindering.",
            'skills_movement_flying_title': "Flying",
            'skills_movement_flying_text': "This character can fly over the elements of the scenery. Flight ignores the movement contraints and penalties of the terrain, and is not affected by hindering.",
            'skills_movement_climb_title': "Climb",
            'skills_movement_climb_text': "This character can move across borders of areas that require this skill, paying the extra movement cost defined by the scenario.",
            
            'skills_miscellaneous': "Miscellaneous",
            'skills_miscellaneous_alchemy_title': "Alchemy",
            'skills_miscellaneous_alchemy_text': "This skill's effect is defined by the scenario.",
            'skills_miscellaneous_leadership_title': "Leadership",
            'skills_miscellaneous_leadership_text': "This hero can move 1 gem from their Reserve zone to their Fatigue zone to activate an ally. Activated allies move and attack like units. Each ally can be activated only once per turn.",
            'skills_miscellaneous_concentration_title': "Concentration",
            'skills_miscellaneous_concentration_text': "This character's dice rolls are not affected by hindering.",
            'skills_miscellaneous_lock_picking_title': "Lock-picking",
            'skills_miscellaneous_lock_picking_text': "This character can rolls an extra {dice_red} when picking a lock.",
            'skills_miscellaneous_fascination_title': "Fascination",
            'skills_miscellaneous_fascination_text': "A character with this skill cannot be attacked by another character unless that character has been previously attacked by the character with Fascination.",
            'skills_miscellaneous_horror_title': "Horror",
            'skills_miscellaneous_horror_text': "The exertion limit of Melee Attack, Ranged Attack, Move and Manipulation actions of enemy characters in this character's area is 2.",
            'skills_miscellaneous_jinx_title': "Jinx",
            'skills_miscellaneous_jinx_text': "Reroll actions and free rerolls are not allowed in the area occupied by an enemy with this skill.",
            'skills_miscellaneous_poison_title': "Poison",
            'skills_miscellaneous_poison_text': "This skill's effect is defined by the scenario.",
            'skills_miscellaneous_support_title': "Support",
            'skills_miscellaneous_support_text': "This skill allows friendly characters in the same zone as this character to reroll a single die for free, each time they perform an action, even if that die has already been rerolled (exception to the rule on page 22).",
            
            'skills_defense': "Defense",
            'skills_defense_sacrifice_title': "Sacrifice",
            'skills_defense_sacrifice_text': "When a friendly character in this character's area is attacked, before the die are rolled, this character may choose to be attacked instead. This character cannot Guard for that defense and can only use their Armor. That character suffers any damage from the attack to prevent the character who was initially attacked from suffering damage.",
            'skills_defense_untouchable_title': "Untouchable",
            'skills_defense_untouchable_text': "A character with this skill ignores the first rolled symbol when defending against a Ranged Attack.",
            'skills_defense_bodyguard_title': "Bodyguard",
            'skills_defense_bodyguard_text': "When a friendly character in this character's area defends, this character can parry (i.e. use an equipment card to defend against that attack, like a shield) instead of that character's Guard action, adding the symbols shown on the dice to the character defense power. They cannot dodge (see page 11) to defend a friendly character. Any damage is dealt to the character who was initially attacked, not the character using Bodyguard.",
            'skills_defense_protected_title': "Protected",
            'skills_defense_protected_text': "This character can be attacked only with area attacks if there is a friendly character without Protected in their area. Two or more characters with this skill cannot protect each other.",
            
            'skills_magic': "Magic",
            'skills_magic_spell_caster_title': "Spell Caster",
            'skills_magic_spell_caster_text': "This character can have and cast spells. Whenever the character loses the skill (because of encumbrance for example), any active spell remain active for their specified duration.",
            'skills_magic_teleportation_title': "Teleportation",
            'skills_magic_teleportation_text': "(Clarification of the spell) A character who casts this spell is not affected by hindering or by Blocking to move.",
            
            'copyright': "The proposed rules are based upon the official rules and their complements but were partially rewriten.",
            
            'heroes': "Heroes's book",
            'overlord': "Overlord's book"
        }
    },
    
    init: function()
    {
        Nav.addIcon(ConanRules._i18n[Language].menu, "rules-icon", "rules");
        
        Nav.createTabs('rules', [
            {label: ConanRules._i18n[Language].skills, id: "skills"},
            {label: ConanRules._i18n[Language].heroes, id: "heroes"},
            {label: ConanRules._i18n[Language].overlord, id: "overlord"}
        ]);
        
        ConanRules._initSkills();

        $("#heroes").html("In construction");
        $("#overlord").html("In construction");

        ConanAbout.addCopyright(ConanRules._i18n[Language].menu, ConanRules._i18n[Language].copyright);
    },
    
    _initSkills: function()
    {
        $("#skills").html("<div></div>");
        ConanRules._addAttackSkills();
        ConanRules._addMovementSkills();
        ConanRules._addMiscellaneousSkills();
        ConanRules._addDefenseSkills();
        ConanRules._addMagicSkills();
    },
    
    _addAttackSkills: function()
    {
        $('#skills > div').append("<div id='skills_attack' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_attack + "</h2></div>");
        
        ConanRules._addSkill('attack', 'reach');
        ConanRules._addSkill('attack', 'ambidextrous');
        ConanRules._addSkill('attack', 'constriction');
        ConanRules._addSkill('attack', 'circular_strike');
        ConanRules._addSkill('attack', 'precision_strike');
        ConanRules._addSkill('attack', 'attack_from_beyond');
        ConanRules._addSkill('attack', 'counterattack');
        ConanRules._addSkill('attack', 'elite_shooter');
        ConanRules._addSkill('attack', 'precision_shot');
    },
    
    _addMovementSkills: function()
    {
        $('#skills > div').append("<div id='skills_movement' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_movement + "</h2></div>");
        
        ConanRules._addSkill('movement', 'blocking');
        ConanRules._addSkill('movement', 'evasive');
        ConanRules._addSkill('movement', 'swimming');
        ConanRules._addSkill('movement', 'intangible');
        ConanRules._addSkill('movement', 'wall_wrecker');
        ConanRules._addSkill('movement', 'web_projection');
        ConanRules._addSkill('movement', 'leap');
        ConanRules._addSkill('movement', 'feline_grace');
        ConanRules._addSkill('movement', 'flying');
        ConanRules._addSkill('movement', 'climb');
    },
    
    _addMiscellaneousSkills: function()
    {
        $('#skills > div').append("<div id='skills_miscellaneous' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_miscellaneous + "</h2></div>");
        
        ConanRules._addSkill('miscellaneous', 'alchemy');
        ConanRules._addSkill('miscellaneous', 'concentration');
        ConanRules._addSkill('miscellaneous', 'lock_picking');
        ConanRules._addSkill('miscellaneous', 'fascination');
        ConanRules._addSkill('miscellaneous', 'leadership');
        ConanRules._addSkill('miscellaneous', 'horror');
        ConanRules._addSkill('miscellaneous', 'jinx');
        ConanRules._addSkill('miscellaneous', 'poison');
        ConanRules._addSkill('miscellaneous', 'support');
    },
    
    _addDefenseSkills: function()
    {
        $('#skills > div').append("<div id='skills_defense' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_defense + "</h2></div>");
        
        ConanRules._addSkill('defense', 'sacrifice');
        ConanRules._addSkill('defense', 'bodyguard');
        ConanRules._addSkill('defense', 'untouchable');
        ConanRules._addSkill('defense', 'protected');
    },
    
    _addMagicSkills: function()
    {
        $('#skills > div').append("<div id='skills_magic' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_magic + "</h2></div>");
        
        ConanRules._addSkill('magic', 'spell_caster');
        ConanRules._addSkill('magic', 'teleportation');
    },
    
    _addSkill: function(type, id)
    {
        $('#skills_' + type).append("<div class='skills-skill'>"
            +   "<img src='resources/img/skills/" + type + "/" + id + ".png'/>"
            +   "<div class='skills-title'>" + ConanRules._i18n[Language]['skills_' + type + '_' + id + '_title'] + "</div>"
            +   "<div class='skills-text'>" + ConanRules._replace(ConanRules._i18n[Language]['skills_' + type + '_' + id + '_text']) + "</div>"
            +   "<div class='clear'></div>"
            + "</div>");
    },
    
    _replace: function(text)
    {
        text = text.replace(/\{(.*?)\}/g, "<img src='resources/img/$1.png' class='rules-character'/>");
        return text;
    }
}
