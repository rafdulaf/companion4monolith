var ConanRules = {
    _i18n: {
        'fr': {
            'menu': "Règles",
            'skills': "Compétences",
            
            'skills_attack': "Attaque",
            'skills_attack_reach_title': "Allonge",
            'skills_attack_reach_text': "Le personnage peut attaquer au corps-à-corps sur une zone adjacente avec ligne de vue et s’il n’y a pas d’obstacle (mur, porte, barreaux, tentures…) entre sa cible et lui.",
            'skills_attack_ambidextrous_title': "Ambidextrie",
            'skills_attack_ambidextrous_text': "S’il dispose de deux armes à une main, le personnage peut cumuler leur bonus lors de chacune de ses attaques au corps-à-corps (ne fonctionne pas en défense).",
            'skills_attack_constriction_title': "Constriction",
            'skills_attack_constriction_text': "Si, lors de son attaque, la créature obtient au moins une face avec 2 symboles sur l’un de ses dés, sa cible est « saisie », en plus des blessures éventuelles. La figurine du personnage saisi est ramenée au contact de la figurine de la créature et est considérée comme bloquée. Un personnage ayant la compétence Insaisissable ignore le blocage dû à Constriction, pas les dégâts associés à l’attaque.",
            'skills_attack_circular_strike_title': "Coup circulaire",
            'skills_attack_circular_strike_text': "Avec toute arme de corps-à-corps à deux main (dont l’encombrement est supérieur ou égal à 3), le personnage peut donner un coup circulaire. Si l’attaque, résolue normalement, tue le premier adversaire désigné, le reliquat de dégâts est reporté sur le suivant (choisit par l'attaquant) et ainsi de suite jusqu’à ce qu’il n’y ait plus de reliquat.",
            'skills_attack_precision_strike_title': "Coup précis",
            'skills_attack_precision_strike_text': "Lorsqu’il réalise une attaque au corps-à-corps, le personnage ignore systématiquement le premier point de défense de sa cible.",
            'skills_attack_attack_from_beyond_title': "Retour de l’Au-delà",
            'skills_attack_attack_from_beyond_text': "Juste après sa mort, le personnage peut porter une ultime attaque au corps-à-corps d’une puissance de {dice_red}{dice_red}{dice_red}, sans bonus d’arme et sans malus d’attaque à mains nues.",
            'skills_attack_counterattack_title': "Riposte",
            'skills_attack_counterattack_text': "Chaque fois que le personnage est attaqué au corps-à-corps (que l’attaque ait causé des dégâts ou non), il peut gratuitement riposter (s’il survit à l’attaque) de {dice_red}, sans bonus d’arme et sans malus d’attaque à mains nues.",
            'skills_attack_elite_shooter_title': "Tireur d’élite",
            'skills_attack_elite_shooter_text': "Le personnage ignore les effets du phénomène de gêne lorsqu’il réalise une attaque à distance. De plus, il ignore la compétence Sous protection de sa cible.",
            'skills_attack_precision_shot_title': "Tir précis",
            'skills_attack_precision_shot_text': "Lorsqu’il réalise une attaque à distance, le personnage ignore systématiquement le premier point de défense passive de sa cible.",
            
            'skills_movement': "Mouvement",
            'skills_movement_blocking_title': "Bloqueur",
            'skills_movement_blocking_text': "Le personnage bloque tout mouvement des adversaires présents sur sa zone, à l'exception de ceux possédant la compétence Insaisissable.",
            'skills_movement_wall_wrecker_title': "Défoncer les cloisons",
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
            'skills_movement_feline_grace_title': "Souplesse féline",
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
            
            'skills_defense': "Défense",
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
            'skills_magic_teleportation_title': "Téléportation",
            'skills_magic_teleportation_text': "(Clarification du sort) Le lanceur de sort n'est pas soumis au phénomène de gêne ni à la compétence Bloqueur.",
            
            'skillsPDF': "http://www.monolithedition.com/download/rules/Aides-de-jeu-FR.pdf",
            
            'viewer-search': "Recherche dans le document",
            'viewer-download': "Télécharger le document",
            'viewer-zoomin': "Zoomer",
            'viewer-zoomout': "Dézoomer",
            
            'search': "Rechercher",
            'search-input': "Mot clé",
            'search-inputPh': "Entrez un mot clé à chercher (3 caractères minimum)",
            'search-loose': "Aucun résultat ne correspond au mot clé saisi",
            
            'copyright': "Les règles proposés sont basées sur les règles officielles et leurs compléments mais ont été en partie reformulées.",
            
            'heroes': "Livre des héros",
            'heroesPDF': "http://www.monolithedition.com/download/rules/CONAN_Heroesrulebook_V2_FR_SD.pdf",
            'overlord': "Livre de l'Overlord",
            'overlordPDF': "http://www.monolithedition.com/download/rules/CONAN_King_Overlordbook_V2_FR_SD.pdf"
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
            'skills_magic_teleportation_text': "(Spell clarification) A character who casts this spell is not affected by hindering or by Blocking to move.",
            
            'skillsPDF': "http://www.monolithedition.com/download/rules/Game-aids-EN.pdf",
            
            'viewer-search': "Search in the document",
            'viewer-download': "Download the document",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Search",
            'search-input': "Keyword",
            'search-inputPh': "Enter the keyword to search (3 characters minimum)",
            'search-loose': "No result is matching the entered keyword",
            
            'copyright': "The proposed rules are based upon the official rules and their complements but were partially rewriten.",
            
            'heroes': "Heroes's book",
            'heroesPDF': "http://www.monolithedition.com/download/rules/CONAN_Heroesrulebook_V2_US_SD.pdf",
            'overlord': "Overlord's book",
            'overlordPDF': "http://www.monolithedition.com/download/rules/CONAN_King_Overlordbook_V2_US_SD.pdf"
        }
    },
    
    _allSkills: {
        'attack' : ['reach', 'ambidextrous', 'constriction', 'circular_strike', 'precision_strike', 'attack_from_beyond', 'counterattack', 'elite_shooter', 'precision_shot'],
        'movement': ['blocking', 'evasive', 'swimming', 'intangible', 'wall_wrecker', 'web_projection', 'leap', 'feline_grace', 'flying', 'climb'],
        'miscellaneous': ['alchemy', 'concentration', 'lock_picking', 'fascination', 'leadership', 'horror', 'jinx', 'poison', 'support'],
        'defense': ['sacrifice', 'bodyguard', 'untouchable', 'protected'],
        'magic': ['spell_caster', 'teleportation']
    },
    
    init: function()
    {
        ConanRules._lastSearch = "";
        
        Nav.addIcon(ConanRules._i18n[Language].menu, "rules-icon", "rules");
        
        Nav.createTabs('rules', [
            {label: ConanRules._i18n[Language].skills, id: "skills"},
            {label: ConanRules._i18n[Language].heroes, id: "heroes"},
            {label: ConanRules._i18n[Language].overlord, id: "overlord"}
        ], ConanRules._onChange);
        
        ConanRules._initSkills();

        $("#heroes").addClass("zoom0 rules-viewer").html("<div>" + this._createViewer("rules/heroes/" + Language + "/book", 24) + "</div>");
        ConanRules._attachEvents("#heroes");
        $("#overlord").addClass("zoom0 rules-viewer").html("<div>" + this._createViewer("rules/overlord/" + Language + "/book", 14) + "</div>");
        ConanRules._attachEvents("#overlord");
        
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-zoomin'], "rules-zoomin-icon", "zoomin", ConanRules._zoomIn);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-zoomout'], "rules-zoomout-icon", "zoomout", ConanRules._zoomOut);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-search'], "rules-search-icon", "search", ConanRules._search);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-download'], "rules-download-icon", "download", ConanRules._download);
        ConanRules._onChange();

        ConanAbout.addCopyright(ConanRules._i18n[Language].menu, ConanRules._i18n[Language].copyright);
    },
    
    _download: function()
    {
        switch (ConanRules._currentSlide)
        {
            case 0:
                window.open(ConanRules._i18n[Language].skillsPDF);
                break;
            case 1:
                window.open(ConanRules._i18n[Language].heroesPDF);
                break;
            case 2:
                window.open(ConanRules._i18n[Language].overlordPDF);
                break;
        }
    },
    
    _search: function()
    {
        Nav.dialog(ConanRules._i18n[Language].search,
            "<div id='rulessearch' class='rulessearch'>"
            +   "<div class='form'>"
            +       "<label for='rulessearch'>" + ConanRules._i18n[Language]['search-input'] + "</label>"
            +       "<input type='text' id='rulessearch' onkeyup='ConanRules._doSearch()' onchange='ConanRules._doSearch()' placeholder='" + ConanRules._i18n[Language]['search-inputPh'] + "'/>"
            +   "</div>"
            +   "<div class='results'>"
            +   "</div>"
            + "</div>"
        );
        $("#rulessearch input").focus()[0].value = ConanRules._lastSearch;
        
        // loading keywords
        if (!ConanRules.keywords || !ConanRules.keywords[ConanRules._currentSlide])
        {
            $("#rulessearch input").prop('disabled', true);
            ConanRules.keywords = ConanRules.keywords || {};
            $.getJSON("rules/" + (ConanRules._currentSlide == 1 ? "heroes" : "overlord") + "/" + Language + "/book/search.json", null, function(data) { ConanRules.keywords[ConanRules._currentSlide] = data; $("#rulessearch input").prop('disabled', false).focus(); ConanRules._doSearch(true); });
        }
        else
        {
            ConanRules._doSearch(true);
        }
    },
    
    _doSearch: function(force)
    {
        var searchTerm = $("#rulessearch input")[0].value;
        if (ConanRules._lastSearch == searchTerm && force !== true)
        {
            return;
        }
        
        ConanRules._lastSearch = searchTerm;
        searchTerm = searchTerm.toUpperCase();

        $("#rulessearch input").attr('data-last-search', searchTerm);
        if ((searchTerm || '').length < 3)
        {
            $("#rulessearch .results").html("");
            return;
        }
        
        var textContent = ConanRules.keywords[ConanRules._currentSlide];
        
        var results = "";
        for (var i = 0; i < textContent.length; i++) 
        {
            var pageContent = textContent[i].toUpperCase();
            var index = -1;
            var pageHasResults = false;

            do 
            {
                index = pageContent.indexOf(searchTerm, index + 1);
                if (index >= 0) 
                {
                    var foundExact = textContent[i].substring(index, index + searchTerm.length); 
                    
                    var SNIPPET_LENGTH = 120;
                    var snippetStart = index >= SNIPPET_LENGTH ? index - SNIPPET_LENGTH : 0;
                    var snippetEnd = index + searchTerm.length < textContent[i].length - SNIPPET_LENGTH ? index + searchTerm.length + SNIPPET_LENGTH : textContent[i].length;
                    
                    var prefix = snippetStart > 0 ? "..." : "";
                    var suffix = snippetEnd < pageContent.length ? "..." : "";
                    
                    var guessRatioY = (index / pageContent.length) * 0.8 + 0.1;

                    if (!pageHasResults) results += "<li><a href='#' onclick='ConanRules._endPageSearch(this, arguments[0], " + (i+1) + ")'><img src='rules/" + (ConanRules._currentSlide == 1 ? "heroes" : "overlord") + "/" + Language + "/book/thumbnails/" + (i+1) + ".jpg'/><br/>Page " + (i+1) + "</a><ul>";
                    results += "<li>" 
                                    + "<a href='#' onclick='ConanRules._endSearch(" + (i+1) +", 0, " + guessRatioY + ")'>" 
                                        + prefix + textContent[i].substr(snippetStart, snippetEnd - snippetStart).replace(foundExact, '<em>' + foundExact + '</em>') + suffix 
                                    + "</a>" 
                             + "</li>";
                    pageHasResults = true;
                }
            } while (index !== -1);
            
            if (pageHasResults) results += "</ul></li>";
        }
        
        if (results)
        {
            $("#rulessearch .results").html("<ul>" + results + "</ul>");
        }
        else
        {
            $("#rulessearch .results").html(ConanRules._i18n[Language]['search-loose'])
        }
    },
    
    _endPageSearch: function(me, e, page)
    {
        var imgLocation = $(me).offset(); 
        var ratioX = (e.pageX - imgLocation.left) / $(me).width();
        var ratioY = (e.pageY - imgLocation.top) / $(me).height();

        ConanRules._endSearch(page, ratioX, ratioY)
    },
    
    _endSearch: function(page, ratioX, ratioY)
    {
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);
        if (!div.is("zoom3") && !div.is("zoom2"))
        {
            div.removeClass("zoom1").removeClass("zoom0").addClass("zoom2");
        }
        
        ConanRules._scrollTo(page, ratioX, ratioY);
        
        Nav.closeDialog(); 
    },
    
    _attachEvents: function(selector)
    {
        // Attach thumbnails events
        $(selector + " .thumbnails img").on('click', function(e) { 
            var imgLocation = $(this).offset(); 
            var ratioX = (e.pageX - imgLocation.left) / $(this).width();
            var ratioY = (e.pageY - imgLocation.top) / $(this).height();
            ConanRules._zoom(1, $(this).attr('data-page'), ratioX, ratioY); 
        });
            
       // Attach iframe events
       $(selector + " iframe").on('load', function() {
            var iframe = this;
            var page = $(iframe).attr('data-page');
            $(iframe.contentDocument).on('click', function(e) {
                var body = $(e.target.ownerDocument.body);
                var zoom = body.css('zoom') || 1.0;
                var ratioX = e.pageX / zoom / body.width();
                var ratioY = e.pageY / zoom / body.height();
                
                ConanRules._zoom(1, page, ratioX, ratioY);
            });
       });
    },
    
    _onChange: function(event, slick)
    {
        var slide = slick && slick.currentSlide || 0;
        ConanRules._currentSlide = slide;
        
        if (slide == 0)
        {
            Nav.hideAction("rules", "zoomin");
            Nav.hideAction("rules", "zoomout");
            Nav.hideAction("rules", "search");
        }
        else
        {
            Nav.showAction("rules", "zoomin");
            Nav.showAction("rules", "zoomout");
            Nav.showAction("rules", "search");
        }
    },
    
    _createViewer: function(url, size)
    {
        var s = "";
        
        // thumbnails
        s += "<div class='thumbnails'>"
        for (var i = 0; i <= size; i+=2)
        {
            s += "<div>"
            if (i > 0) s += "<img data-page='" + i + "' src='" + url + "/thumbnails/" + i + ".jpg'/>"
            if (i < size) s += "<img data-page='" + (i+1) + "' src='" + url + "/thumbnails/" + (i+1) + ".jpg'/>"
            s += "</div>"
        }
        s += "</div>"
        
        // pages
        for (var i = 1; i <= size; i++)
        {
            s += "<iframe data-page='" + i + "' src=\"" + url + "/" + i + ".html\"></iframe>";
        }
        
        return s;
    },
    
    _zoomIn: function()
    {
        ConanRules._zoom(1);
    },
    
    _zoomOut: function()
    {
        ConanRules._zoom(-1);
    },

    _scrollTo: function(specificPage, ratioX, ratioY)
    {
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);
        
        ratioX = ratioX || 0;
        ratioY = ratioY || 0;
        
        var iframe = div.find("iframe[data-page=" + specificPage + "]");
        
        var top = div.scrollTop()
                  + iframe.offset().top
                  - div.offset().top
                  + ratioY * iframe.height()
                  - 0.5 * div.height();

        var left = div.scrollLeft()
                  + iframe.offset().left
                  - div.offset().left
                  + ratioX * iframe.width()
                  - 0.5* div.width();

        div.scrollTop(top);
        div.scrollLeft(left);
    },
    
    _zoom: function(direction, specificPage, ratioX, ratioY)
    {
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);
        
        var top = div.scrollTop();
        var height = div.height();
        
        var fullHeight = div.children("div").height();
        
        var cursor = (top + height/2) / fullHeight;
        
        if (div.hasClass("zoom0"))
            div.removeClass("zoom0").addClass(direction == 1 ? "zoom1" : "zoom0")
        else if (div.hasClass("zoom1"))
            div.removeClass("zoom1").addClass(direction == 1 ? "zoom2" : "zoom0")
        else if (div.hasClass("zoom2"))
            div.removeClass("zoom2").addClass(direction == 1 ? "zoom3" : "zoom1")
        else if (div.hasClass("zoom3"))
            div.removeClass("zoom3").addClass(direction == 1 ? "zoom3" : "zoom2")
            
        var newFullHeight = div.children("div").height();
        
        if (specificPage)
        {
            ConanRules._scrollTo(specificPage, ratioX, ratioY);
        }
        else
        {
            // Try to auto stay at the same place
            div.scrollTop(cursor * newFullHeight - height / 2);
        }
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
        
        for (var i=0; i < ConanRules._allSkills.attack.length; i++)
        {
            ConanRules._addSkill('attack', ConanRules._allSkills.attack[i]);
        }
    },
    
    _addMovementSkills: function()
    {
        $('#skills > div').append("<div id='skills_movement' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_movement + "</h2></div>");
        
        for (var i=0; i < ConanRules._allSkills.movement.length; i++)
        {
            ConanRules._addSkill('movement', ConanRules._allSkills.movement[i]);
        }
    },
    
    _addMiscellaneousSkills: function()
    {
        $('#skills > div').append("<div id='skills_miscellaneous' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_miscellaneous + "</h2></div>");
        
        for (var i=0; i < ConanRules._allSkills.miscellaneous.length; i++)
        {
            ConanRules._addSkill('miscellaneous', ConanRules._allSkills.miscellaneous[i]);
        }
    },
    
    _addDefenseSkills: function()
    {
        $('#skills > div').append("<div id='skills_defense' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_defense + "</h2></div>");
        
        for (var i=0; i < ConanRules._allSkills.defense.length; i++)
        {
            ConanRules._addSkill('defense', ConanRules._allSkills.defense[i]);
        }
    },
    
    _addMagicSkills: function()
    {
        $('#skills > div').append("<div id='skills_magic' class='skill-tab'><h2>" + ConanRules._i18n[Language].skills_magic + "</h2></div>");
        
        for (var i=0; i < ConanRules._allSkills.magic.length; i++)
        {
            ConanRules._addSkill('magic', ConanRules._allSkills.magic[i]);
        }
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
