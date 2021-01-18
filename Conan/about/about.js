About = mergeObject(About, {
    _i18n: {
        'fr': {
            'smallName': "Conan",
            'name': "Compagnon<br/>de Conan",
            'title': "Le compagnon de Conan",
            'text': "'Compagnion de Conan' est une application indépendante pour accompagner les joueurs dans le jeu 'Conan'.<h1>Important</h1>Cette application n'a aucun lien avec l'édteur du jeu Conan : Monolith.<br/>Elle a été réalisée par <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a> en s'appuyant sur l'aide de la communauté de <a href='https://the-overlord.com'>The Overlord</a> et divers outils et ressources existantes.",
            'copyright-text': "'Conan' est un jeu de plateau de figurines édité par <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "Le logo Conan et les polices de caractères utilisées sont la propriété de Monolith.<br/>"
                    + "L'image du 'Compagnion de Conan' a été créée à partir du logo Conan.<br/>",
            'tolink': "https://the-overlord.com/index.php?/topic/3095-application-de-compagnon-de-jeu/",
            
            'contribute_hof_dataIT': "(traduction italienne)",
            'contribute_hof_dataCorinthia': "(données Corinthia)"
        },
        'en': {
            'smallName': "Conan",
            'name': "Companion<br/>to Conan",
            'title': "The companion to Conan",
            'text': "'Companion to Conan' is an independant application to help the players in the game 'Conan'.<h1>Disclamer</h1>This application has no link with the producer of the game Conan: Monolith.<br/>It was realized by <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a> relying the community of <a href='https://the-overlord.com'>The Overlord</a> and several existing tools or resources.",
            'copyright-text': "'Conan' is a board game published by <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "The Conan logo and the fonts used are the property of Monolith.<br/>"
                    + "The image of 'Companion to Conan' was created by adapting the Conan logo.<br/>",
            'tolink': "https://the-overlord.net/index.php?/topic/756-companion-application-for-conan/",
            
            'contribute_hof_dataIT': "(italian translation)",
            'contribute_hof_dataCorinthia': "(Corinthia data)"
        },
        'it': {
            'smallName': "Conan",
            'name': "Conan<br/>Companion",
            'title': "Conan Companion",
            'text': "'Conan Companion' è un'applicazione indipendente di supporto per i giocatori del gioco 'Conan'.<h1>Importante</h1>Questa applicazione non ha nessun legame con il gioco Conan: Monolith.",
            'copyright-text': "'Conan' è un gioco da tavolo della <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "Il logo di Conan e i fonts usati sono proprietà della Monolith.<br/>"
                    + "Le immagini di 'Conan Companion' sono state create adattando il logo di Conan.<br/>",
            'tolink': "https://the-overlord.net/index.php?/topic/756-companion-application-for-conan/",
            
            'contribute_hof_dataIT': "(traduzione italiana)",
            'contribute_hof_dataCorinthia': "TODO_TRANSLATE"
        }
    },
    
    _haf: function() {
        return {
            'coders' : "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\" target='_blank'>@cochon</a></div>",
            'data': "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\" target='_blank'>@cochon</a></div>"
                    + "<div><a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\" target='_blank'>@pensareadaltro</a> " + About._i18n[Language].contribute_hof_dataIT + "</div>"
                    + "<div><a href=\"https://the-overlord.com/index.php?/profile/107-corwin/\" target='_blank'>@Corwin</a> " + About._i18n[Language].contribute_hof_dataCorinthia + "</div>",
            'tests': "<div><a href=\"https://the-overlord.com/index.php?/profile/5567-madcollector/\" target='_blank'>@madcollector</a></div>"
                     + "<div><a href=\"https://the-overlord.com/index.php?/profile/13-roolz/\" target='_blank'>@Roolz</a></div>"
                     + "<div><a href=\"https://the-overlord.com/index.php?/profile/5236-renand/\" target='_blank'>@Renand</a></div>"
        }
    }
});
